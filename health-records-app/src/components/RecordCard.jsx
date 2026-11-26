import { Link } from 'react-router-dom';
import { deleteRecord } from '../lib/records';
import { useAuth } from '../context/AuthContext';
import { toast } from 'react-toastify';

const labels = { checkup: 'Lekarski pregled', vaccination: 'Vakcinacija', medication: 'Lek' };

export default function RecordCard({ record, onDeleted }) {
  const { user } = useAuth();
  async function handleDelete() {
    if (!window.confirm('Obrisati ovu evidenciju?')) return;
    try {
      await deleteRecord(user.uid, record.id);
      toast.success('Evidencija je obrisana.');
      onDeleted(record.id);
    } catch (error) {
      toast.error('Brisanje nije uspelo.');
      console.error(error);
    }
  }

  return (
    <article className="record-card">
      <div className={`record-icon ${record.type}`}>{record.type === 'medication' ? '💊' : record.type === 'vaccination' ? '💉' : '🩺'}</div>
      <div className="record-main">
        <div className="record-title-row"><h3>{record.title}</h3><span className={`tag ${record.type}`}>{labels[record.type]}</span></div>
        <p className="muted">{record.date}{record.doctor ? ` · ${record.doctor}` : ''}</p>
        {record.notes && <p>{record.notes}</p>}
        {record.type === 'medication' && <p><strong>Doza:</strong> {record.dosage || 'Nije navedeno'} {record.frequency ? ` · ${record.frequency}` : ''}</p>}
      </div>
      <div className="record-actions"><Link className="small-button" to={`/records/${record.id}/edit`}>Izmeni</Link><button className="danger-button" onClick={handleDelete}>Obriši</button></div>
    </article>
  );
}
