import { NextRequest, NextResponse } from 'next/server';
import { getSession, isSameOrigin } from '@/lib/admin/guard';
import { addNote, addTask, getLead } from '@/lib/admin/db';
import { dueDateFor, getWorkflow } from '@/lib/portal/workflows';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

/** Runs a workflow against a company, creating one task per step. */
export async function POST(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  const session = await getSession();
  if (!session || !isSameOrigin()) {
    return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
  }

  const id = Number(params.id);
  if (!Number.isInteger(id) || id <= 0) {
    return NextResponse.json({ message: 'Bad request' }, { status: 400 });
  }

  let body: { workflow?: unknown };
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ message: 'Bad request' }, { status: 400 });
  }

  const workflow =
    typeof body.workflow === 'string' ? getWorkflow(body.workflow) : undefined;
  if (!workflow) {
    return NextResponse.json({ message: 'Unknown workflow' }, { status: 400 });
  }

  try {
    const lead = await getLead(id);
    if (!lead) {
      return NextResponse.json({ message: 'Not found' }, { status: 404 });
    }

    const now = new Date();
    const created = await Promise.all(
      workflow.steps.map((step, index) =>
        addTask(id, workflow.id, step.label, index, dueDateFor(step, now))
      )
    );

    // Leave a trace on the timeline so the history explains itself later.
    await addNote(
      id,
      session.email || session.role,
      `Started workflow: ${workflow.name} (${workflow.steps.length} steps).`
    );

    return NextResponse.json({ added: created.filter(Boolean).length });
  } catch (error) {
    console.error('Workflow run failed:', error);
    return NextResponse.json(
      { message: 'Could not start the workflow.' },
      { status: 503 }
    );
  }
}
