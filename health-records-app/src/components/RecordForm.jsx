import { useEffect, useState } from 'react';

const initial = { type: 'checkup', title: '', date: new Date().toISOString().slice(0, 10), doctor: '', dosage: '', frequency: '', notes: '' };

export default function RecordForm({ initialData, onSubmit, submitLabel = 'Sačuvaj' }) {
  const [form, setForm] = useState(initialData || initial);
  const [saving, setSaving] = useState(false);

  useEffect(() => setForm(initialData || initial), [initialData]);
  const update = (e) => setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));

  async function submit(e) {
    e.preventDefault();
    setSaving(true);
    try { await onSubmit(form); } finally { setSaving(false); }
  }

  return (
    <form className="form-card" onSubmit={submit}>
      <div className="form-grid">
        <label>Tip evidencije<select name="type" value={form.type} onChange={update}><option value="checkup">Lekarski pregled</option><option value="vaccination">Vakcinacija</option><option value="medication">Lek</option></select></label>
        <label>Naziv / naslov<input name="title" value={form.title} onChange={update} required placeholder="npr. Sistematski pregled" /></label>
        <label>Datum<input type="date" name="date" value={form.date} onChange={update} required /></label>
        <label>Lekar / ustanova<input name="doctor" value={form.doctor} onChange={update} placeholder="npr. Dom zdravlja" /></label>
        {form.type === 'medication' && <><label>Doza<input name="dosage" value={form.dosage} onChange={update} placeholder="npr. 500 mg" /></label><label>Učestalost<input name="frequency" value={form.frequency} onChange={update} placeholder="npr. 2x dnevno" /></label></>}
      </div>
      <label>Napomena<textarea name="notes" value={form.notes} onChange={update} rows="5" placeholder="Dodatne informacije..." /></label>
      <button className="primary-button" disabled={saving}>{saving ? 'Čuvanje...' : submitLabel}</button>
    </form>
  );
}
