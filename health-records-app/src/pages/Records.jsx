// import { useEffect, useMemo, useState } from 'react';
// import { getRecords } from '../lib/records';
// import { useAuth } from '../context/AuthContext';
// import RecordCard from '../components/RecordCard';
// import { Link } from 'react-router-dom';
//
// export default function Records(){
//     const {user}=useAuth();
//     const [records,setRecords]=useState([]);
//     const [filter,setFilter]=useState('all');
//     const [loading,setLoading]=useState(true);
//     useEffect(()=>{
//         getRecords(user.uid).then(setRecords).catch(console.error).finally(
//             ()=>setLoading(false));},[user.uid]);
//     const filtered=useMemo(()=>filter==='all'?records:records.filter(r=>r.type===filter),[records,filter]);
//     return <><div className="topbar"><div>
//         <h1>Zdravstvene evidencije</h1>
//         <p className="muted">Svi vaši zapisi na jednom mestu.</p>
//     </div><Link className="primary-button" to="/records/new">+ Dodaj</Link></div>
//         <div className="filter-row">{[['all','Sve'],['checkup','Pregledi'],['vaccination','Vakcinacije'],['medication','Lekovi']]
//             .map(([v,l])=><button key={v} className={filter===v?'filter active':'filter'} onClick={()=>setFilter(v)}>{l}</button>)}
//         </div>
//         {loading?<p>Učitavanje...</p>:filtered.length?<div className="record-list">{filtered.map(r=><RecordCard key={r.id} record={r} onDeleted={id=>setRecords(x=>x.filter(r=>r.id!==id))}/>)}</div>:<div className="empty"><h3>Nema rezultata</h3><p>Nema evidencija za izabrani filter.</p></div>}</>}

import { useEffect, useMemo, useState } from 'react';
import { getRecords } from '../lib/records';
import { useAuth } from '../context/AuthContext';
import RecordCard from '../components/RecordCard';
import { Link } from 'react-router-dom';

export default function Records() {
    const { user, loading: authLoading } = useAuth();

    const [records, setRecords] = useState([]);
    const [filter, setFilter] = useState('all');
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        if (authLoading) return;

        if (!user) {
            setRecords([]);
            setLoading(false);
            return;
        }

        let cancelled = false;

        async function fetchRecords() {
            try {
                setLoading(true);
                setError(null);

                const data = await getRecords(user.uid);

                if (!cancelled) {
                    setRecords(data);
                }
            } catch (err) {
                console.error('Error fetching records:', err);

                if (!cancelled) {
                    setError(err.message);
                }
            } finally {
                if (!cancelled) {
                    setLoading(false);
                }
            }
        }

        fetchRecords();

        return () => {
            cancelled = true;
        };

    }, [user, authLoading]);

    const filtered = useMemo(
        () => filter === 'all'
            ? records
            : records.filter(r => r.type === filter),
        [records, filter]
    );

    if (authLoading || loading) {
        return <p>Učitavanje...</p>;
    }

    if (error) {
        return <p>Greška pri učitavanju evidencija: {error}</p>;
    }

    if (!user) {
        return <p>Morate biti prijavljeni da biste videli evidencije.</p>;
    }

    return (
        <>
            <div className="topbar">
                <div>
                    <h1>Zdravstvene evidencije</h1>
                    <p className="muted">
                        Svi vaši zapisi na jednom mestu.
                    </p>
                </div>

                <Link className="primary-button" to="/records/new">
                    + Dodaj
                </Link>
            </div>

            <div className="filter-row">
                {[
                    ['all', 'Sve'],
                    ['checkup', 'Pregledi'],
                    ['vaccination', 'Vakcinacije'],
                    ['medication', 'Lekovi']
                ].map(([v, l]) => (
                    <button
                        key={v}
                        className={filter === v ? 'filter active' : 'filter'}
                        onClick={() => setFilter(v)}
                    >
                        {l}
                    </button>
                ))}
            </div>

            {filtered.length ? (
                <div className="record-list">
                    {filtered.map(r => (
                        <RecordCard
                            key={r.id}
                            record={r}
                            onDeleted={id =>
                                setRecords(previous =>
                                    previous.filter(r => r.id !== id)
                                )
                            }
                        />
                    ))}
                </div>
            ) : (
                <div className="empty">
                    <h3>Nema rezultata</h3>
                    <p>Nema evidencija za izabrani filter.</p>
                </div>
            )}
        </>
    );
}
