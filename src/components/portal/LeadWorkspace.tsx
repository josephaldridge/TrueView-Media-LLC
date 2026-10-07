'use client';

import { FormEvent, useState } from 'react';
import { useRouter } from 'next/navigation';
import {
  Check,
  Loader2,
  Play,
  Plus,
  Save,
  Trash2,
} from 'lucide-react';
import type { Lead, LeadNote, LeadTask } from '@/lib/admin/db';
import type { Workflow } from '@/lib/portal/workflows';

const STATUSES = ['new', 'contacted', 'interested', 'won', 'lost'];

interface Props {
  lead: Lead;
  initialNotes: LeadNote[];
  initialTasks: LeadTask[];
  workflows: Workflow[];
}

export default function LeadWorkspace({
  lead,
  initialNotes,
  initialTasks,
  workflows,
}: Props) {
  const router = useRouter();
  const [profile, setProfile] = useState(lead);
  const [notes, setNotes] = useState(initialNotes);
  const [tasks, setTasks] = useState(initialTasks);
  const [saving, setSaving] = useState(false);
  const [savedAt, setSavedAt] = useState<string | null>(null);
  const [error, setError] = useState('');
  const [noteDraft, setNoteDraft] = useState('');
  const [taskDraft, setTaskDraft] = useState('');
  const [runningWorkflow, setRunningWorkflow] = useState('');

  const field = (key: keyof Lead) =>
    (profile[key] as string | number | null) ?? '';

  const setField = (key: keyof Lead, value: string) =>
    setProfile((p) => ({ ...p, [key]: value }) as Lead);

  const saveProfile = async (event: FormEvent) => {
    event.preventDefault();
    setSaving(true);
    setError('');
    try {
      const response = await fetch(`/api/portal/leads/${lead.id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          business_name: profile.business_name,
          contact_name: profile.contact_name,
          phone: profile.phone,
          email: profile.email,
          website: profile.website,
          address: profile.address,
          city: profile.city,
          category: profile.category,
          status: profile.status,
          assigned_to: profile.assigned_to,
          deal_value: profile.deal_value,
          next_action: profile.next_action,
        }),
      });
      const data = await response.json().catch(() => ({}));
      if (!response.ok) {
        setError(data.message ?? 'Could not save.');
        return;
      }
      setProfile(data.lead);
      setSavedAt(new Date().toLocaleTimeString());
      router.refresh();
    } catch {
      setError('Network error.');
    } finally {
      setSaving(false);
    }
  };

  const addNote = async (event: FormEvent) => {
    event.preventDefault();
    if (!noteDraft.trim()) return;
    setError('');
    try {
      const response = await fetch(`/api/portal/leads/${lead.id}/notes`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ body: noteDraft }),
      });
      const data = await response.json().catch(() => ({}));
      if (!response.ok) {
        setError(data.message ?? 'Could not save the note.');
        return;
      }
      setNotes((n) => [data.note, ...n]);
      setNoteDraft('');
    } catch {
      setError('Network error.');
    }
  };

  const runWorkflow = async (id: string) => {
    setRunningWorkflow(id);
    setError('');
    try {
      const response = await fetch(`/api/portal/leads/${lead.id}/workflow`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ workflow: id }),
      });
      const data = await response.json().catch(() => ({}));
      if (!response.ok) {
        setError(data.message ?? 'Could not start the workflow.');
        return;
      }
      // Tasks and the timeline note both changed; reload from the server.
      await reload();
      router.refresh();
    } catch {
      setError('Network error.');
    } finally {
      setRunningWorkflow('');
    }
  };

  const reload = async () => {
    const [t, n] = await Promise.all([
      fetch(`/api/portal/leads/${lead.id}/tasks`, { cache: 'no-store' }).then((r) =>
        r.ok ? r.json() : { tasks }
      ),
      fetch(`/api/portal/leads/${lead.id}/notes`, { cache: 'no-store' }).then((r) =>
        r.ok ? r.json() : { notes }
      ),
    ]);
    if (Array.isArray(t.tasks)) setTasks(t.tasks);
    if (Array.isArray(n.notes)) setNotes(n.notes);
  };

  const toggleTask = async (task: LeadTask) => {
    setTasks((list) =>
      list.map((t) => (t.id === task.id ? { ...t, done: !t.done } : t))
    );
    try {
      await fetch(`/api/portal/tasks/${task.id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ done: !task.done }),
      });
      router.refresh();
    } catch {
      // Put it back if the server never got it.
      setTasks((list) =>
        list.map((t) => (t.id === task.id ? { ...t, done: task.done } : t))
      );
    }
  };

  const removeTask = async (id: number) => {
    const previous = tasks;
    setTasks((list) => list.filter((t) => t.id !== id));
    try {
      await fetch(`/api/portal/tasks/${id}`, { method: 'DELETE' });
      router.refresh();
    } catch {
      setTasks(previous);
    }
  };

  const addTask = async (event: FormEvent) => {
    event.preventDefault();
    if (!taskDraft.trim()) return;
    try {
      const response = await fetch(`/api/portal/leads/${lead.id}/tasks`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ label: taskDraft }),
      });
      const data = await response.json().catch(() => ({}));
      if (response.ok && data.task) {
        setTasks((list) => [...list, data.task]);
        setTaskDraft('');
        router.refresh();
      }
    } catch {
      setError('Network error.');
    }
  };

  const inputClass = 'input-field text-sm';
  const labelClass = 'block text-xs uppercase tracking-wider text-gray-500 mb-1.5';

  return (
    <div className="grid grid-cols-1 lg:grid-cols-[minmax(0,1fr)_380px] gap-8">
      {/* Left: profile + timeline */}
      <div className="space-y-8 min-w-0">
        <form
          onSubmit={saveProfile}
          className="bg-dark-500/50 border border-white/10 rounded-xl p-6"
        >
          <div className="flex items-center justify-between mb-5">
            <h2 className="text-white font-light tracking-wide">
              Company profile
            </h2>
            <div className="flex items-center gap-3">
              {savedAt && (
                <span className="text-xs text-green-400">Saved {savedAt}</span>
              )}
              <button
                type="submit"
                disabled={saving}
                className="btn-primary text-sm px-4 py-2 disabled:opacity-50"
              >
                {saving ? (
                  <>
                    <Loader2 className="w-4 h-4 mr-1.5 animate-spin" />
                    Saving
                  </>
                ) : (
                  <>
                    <Save className="w-4 h-4 mr-1.5" />
                    Save
                  </>
                )}
              </button>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="sm:col-span-2">
              <label className={labelClass} htmlFor="f-name">Company name</label>
              <input id="f-name" className={inputClass} value={field('business_name')}
                onChange={(e) => setField('business_name', e.target.value)} />
            </div>
            <div>
              <label className={labelClass} htmlFor="f-contact">Contact name</label>
              <input id="f-contact" className={inputClass} value={field('contact_name')}
                onChange={(e) => setField('contact_name', e.target.value)} />
            </div>
            <div>
              <label className={labelClass} htmlFor="f-phone">Phone</label>
              <input id="f-phone" className={inputClass} value={field('phone')}
                onChange={(e) => setField('phone', e.target.value)} />
            </div>
            <div>
              <label className={labelClass} htmlFor="f-email">Email</label>
              <input id="f-email" type="email" className={inputClass} value={field('email')}
                onChange={(e) => setField('email', e.target.value)} />
            </div>
            <div>
              <label className={labelClass} htmlFor="f-website">Website</label>
              <input id="f-website" className={inputClass} placeholder="None yet"
                value={field('website')}
                onChange={(e) => setField('website', e.target.value)} />
            </div>
            <div>
              <label className={labelClass} htmlFor="f-industry">Industry</label>
              <input id="f-industry" className={inputClass} value={field('category')}
                onChange={(e) => setField('category', e.target.value)} />
            </div>
            <div>
              <label className={labelClass} htmlFor="f-city">City</label>
              <input id="f-city" className={inputClass} value={field('city')}
                onChange={(e) => setField('city', e.target.value)} />
            </div>
            <div className="sm:col-span-2">
              <label className={labelClass} htmlFor="f-address">Address</label>
              <input id="f-address" className={inputClass} value={field('address')}
                onChange={(e) => setField('address', e.target.value)} />
            </div>
            <div>
              <label className={labelClass} htmlFor="f-status">Status</label>
              <select id="f-status" className={inputClass} value={profile.status}
                onChange={(e) => setField('status', e.target.value)}>
                {STATUSES.map((s) => (
                  <option key={s} value={s} className="bg-dark-600 capitalize">{s}</option>
                ))}
              </select>
            </div>
            <div>
              <label className={labelClass} htmlFor="f-value">Deal value ($)</label>
              <input id="f-value" type="number" className={inputClass} value={field('deal_value')}
                onChange={(e) => setField('deal_value', e.target.value)} />
            </div>
            <div>
              <label className={labelClass} htmlFor="f-owner">Assigned to</label>
              <input id="f-owner" className={inputClass} value={field('assigned_to')}
                onChange={(e) => setField('assigned_to', e.target.value)} />
            </div>
            <div>
              <label className={labelClass} htmlFor="f-next">Next action</label>
              <input id="f-next" className={inputClass} value={field('next_action')}
                onChange={(e) => setField('next_action', e.target.value)} />
            </div>
          </div>

          {error && <p className="text-sm text-red-400 mt-4">{error}</p>}
        </form>

        {/* Notes */}
        <section className="bg-dark-500/50 border border-white/10 rounded-xl p-6">
          <h2 className="text-white font-light tracking-wide mb-4">Notes</h2>

          <form onSubmit={addNote} className="mb-6">
            <textarea
              value={noteDraft}
              onChange={(e) => setNoteDraft(e.target.value)}
              rows={3}
              placeholder="What happened on the call?"
              className="input-field text-sm"
            />
            <button
              type="submit"
              disabled={!noteDraft.trim()}
              className="btn-primary text-sm px-4 py-2 mt-3 disabled:opacity-40"
            >
              <Plus className="w-4 h-4 mr-1.5" />
              Add note
            </button>
          </form>

          {notes.length === 0 ? (
            <p className="text-gray-500 text-sm">No notes yet.</p>
          ) : (
            <ul className="space-y-4">
              {notes.map((note) => (
                <li
                  key={note.id}
                  className="border-l-2 border-rose-gold/40 pl-4 py-1"
                >
                  <p className="text-sm text-gray-300 whitespace-pre-wrap">
                    {note.body}
                  </p>
                  <p className="text-xs text-gray-600 mt-1.5">
                    {note.author} ·{' '}
                    {new Date(note.created_at).toLocaleString('en-US', {
                      dateStyle: 'medium',
                      timeStyle: 'short',
                    })}
                  </p>
                </li>
              ))}
            </ul>
          )}
        </section>
      </div>

      {/* Right: workflows + tasks */}
      <div className="space-y-8">
        <section className="bg-dark-500/50 border border-white/10 rounded-xl p-6">
          <h2 className="text-white font-light tracking-wide mb-1">Workflows</h2>
          <p className="text-xs text-gray-500 mb-5">
            Running one adds its steps as dated tasks below.
          </p>
          <div className="space-y-3">
            {workflows.map((workflow) => (
              <div
                key={workflow.id}
                className="border border-white/10 rounded-lg p-4"
              >
                <p className="text-sm text-white mb-1">{workflow.name}</p>
                <p className="text-xs text-gray-500 leading-relaxed mb-3">
                  {workflow.description}
                </p>
                <button
                  type="button"
                  onClick={() => runWorkflow(workflow.id)}
                  disabled={runningWorkflow === workflow.id}
                  className="btn-outline text-xs px-3 py-1.5 disabled:opacity-50"
                >
                  {runningWorkflow === workflow.id ? (
                    <>
                      <Loader2 className="w-3 h-3 mr-1.5 animate-spin" />
                      Starting
                    </>
                  ) : (
                    <>
                      <Play className="w-3 h-3 mr-1.5" />
                      Run ({workflow.steps.length} steps)
                    </>
                  )}
                </button>
              </div>
            ))}
          </div>
        </section>

        <section className="bg-dark-500/50 border border-white/10 rounded-xl p-6">
          <h2 className="text-white font-light tracking-wide mb-4">Tasks</h2>

          <form onSubmit={addTask} className="flex gap-2 mb-5">
            <input
              value={taskDraft}
              onChange={(e) => setTaskDraft(e.target.value)}
              placeholder="Add a one-off task"
              className="input-field text-sm"
            />
            <button
              type="submit"
              disabled={!taskDraft.trim()}
              className="btn-icon-glass px-3 rounded-lg text-gray-300 disabled:opacity-40"
              aria-label="Add task"
            >
              <Plus className="w-4 h-4" />
            </button>
          </form>

          {tasks.length === 0 ? (
            <p className="text-gray-500 text-sm">
              No tasks. Run a workflow to create some.
            </p>
          ) : (
            <ul className="space-y-2">
              {tasks.map((task) => (
                <li
                  key={task.id}
                  className="flex items-start gap-3 group rounded-lg p-2 -mx-2 hover:bg-white/[0.03]"
                >
                  <button
                    type="button"
                    onClick={() => toggleTask(task)}
                    aria-label={task.done ? 'Mark not done' : 'Mark done'}
                    className={`mt-0.5 w-4 h-4 rounded border flex items-center justify-center flex-shrink-0 transition-colors ${
                      task.done
                        ? 'bg-rose-gold border-rose-gold'
                        : 'border-white/25 hover:border-rose-gold'
                    }`}
                  >
                    {task.done && <Check className="w-3 h-3 text-white" />}
                  </button>
                  <span className="min-w-0 flex-1">
                    <span
                      className={`block text-sm ${
                        task.done
                          ? 'text-gray-600 line-through'
                          : 'text-gray-300'
                      }`}
                    >
                      {task.label}
                    </span>
                    {task.due_at && (
                      <span className="block text-xs text-gray-600 mt-0.5">
                        Due{' '}
                        {new Date(task.due_at).toLocaleDateString('en-US', {
                          month: 'short',
                          day: 'numeric',
                        })}
                      </span>
                    )}
                  </span>
                  <button
                    type="button"
                    onClick={() => removeTask(task.id)}
                    aria-label="Delete task"
                    className="opacity-0 group-hover:opacity-100 text-gray-600 hover:text-red-400 transition-all flex-shrink-0"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </li>
              ))}
            </ul>
          )}
        </section>
      </div>
    </div>
  );
}
