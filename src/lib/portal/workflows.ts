/**
 * Sales workflows.
 *
 * A workflow is a named sequence of steps. Running one against a company
 * creates a task per step, each due a set number of days out, so the
 * salesperson always has a concrete next action rather than a status label.
 */

export interface WorkflowStep {
  label: string;
  /** Days from the day the workflow is run. */
  dueInDays: number;
}

export interface Workflow {
  id: string;
  name: string;
  description: string;
  steps: WorkflowStep[];
}

export const WORKFLOWS: Workflow[] = [
  {
    id: 'cold-outreach',
    name: 'Cold Outreach',
    description:
      'First contact through to a booked call. Use on a lead pulled from the prospect finder.',
    steps: [
      { label: 'Research the business and check their current site', dueInDays: 0 },
      { label: 'First call — ask for the owner by name', dueInDays: 0 },
      { label: 'Send follow-up text or email with the preview link', dueInDays: 1 },
      { label: 'Second call if no reply', dueInDays: 3 },
      { label: 'Final check-in, then mark lost or park', dueInDays: 7 },
    ],
  },
  {
    id: 'preview-sent',
    name: 'Preview Sent',
    description:
      'After a live preview has gone out. Built around the 48-hour window.',
    steps: [
      { label: 'Confirm they opened the preview link', dueInDays: 1 },
      { label: 'Call to walk them through it', dueInDays: 1 },
      { label: 'Answer objections — price, timeline, ownership', dueInDays: 2 },
      { label: 'Ask for the decision', dueInDays: 3 },
    ],
  },
  {
    id: 'close-and-onboard',
    name: 'Close & Onboard',
    description: 'Verbal yes through to a site that can actually be built.',
    steps: [
      { label: 'Send the agreement and payment link', dueInDays: 0 },
      { label: 'Collect payment ($899 flat)', dueInDays: 1 },
      { label: 'Collect content — logo, photos, services, hours', dueInDays: 2 },
      { label: 'Confirm domain and hosting access', dueInDays: 2 },
      { label: 'Hand off to build', dueInDays: 3 },
    ],
  },
  {
    id: 'post-launch',
    name: 'Post-Launch Follow-Up',
    description: 'Keep the relationship warm and surface edit work.',
    steps: [
      { label: 'Check in one week after launch', dueInDays: 7 },
      { label: 'Ask for a Google review', dueInDays: 14 },
      { label: 'Ask for a referral', dueInDays: 30 },
      { label: 'Offer an edit-request refresh', dueInDays: 90 },
    ],
  },
];

export function getWorkflow(id: string): Workflow | undefined {
  return WORKFLOWS.find((w) => w.id === id);
}

/** Due date for a step, as an ISO string. */
export function dueDateFor(step: WorkflowStep, from = new Date()): string {
  const due = new Date(from);
  due.setDate(due.getDate() + step.dueInDays);
  due.setHours(17, 0, 0, 0);
  return due.toISOString();
}
