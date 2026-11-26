import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { createRecord, getRecords, updateRecord } from '../lib/records';
import { useAuth } from '../context/AuthContext';
import { toast } from 'react-toastify';
import RecordForm from '../components/RecordForm';

export default function RecordEditor(){const {id}=useParams();const editing=Boolean(id);const {user}=useAuth();const navigate=useNavigate();const [record,setRecord]=useState(null);const [loading,setLoading]=useState(editing);useEffect(()=>{if(!editing)return;getRecords(user.uid).then(items=>setRecord(items.find(r=>r.id===id)||null)).catch(()=>toast.error('Evidencija nije učitana.')).finally(()=>setLoading(false));},[id,user.uid,editing]);async function save(data){try{if(editing)await updateRecord(user.uid,id,data);else await createRecord(user.uid,data);toast.success(editing?'Evidencija je izmenjena.':'Evidencija je sačuvana.');navigate('/records');}catch(error){console.error(error);toast.error('Čuvanje nije uspelo.');}}if(loading)return <p>Učitavanje...</p>;return <><div className="topbar"><div><h1>{editing?'Izmeni evidenciju':'Nova evidencija'}</h1><p className="muted">Unesite zdravstvene informacije.</p></div></div><RecordForm initialData={record} onSubmit={save} submitLabel={editing?'Sačuvaj izmene':'Sačuvaj evidenciju'}/></>}
