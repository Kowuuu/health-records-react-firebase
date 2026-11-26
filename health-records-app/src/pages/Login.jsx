import { Link, useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { toast } from 'react-toastify';

export default function Login() {
  const { login } = useAuth(); const navigate = useNavigate(); const [email,setEmail]=useState(''); const [password,setPassword]=useState(''); const [busy,setBusy]=useState(false);
  async function submit(e){e.preventDefault();setBusy(true);try{await login(email,password);toast.success('Dobrodošli!');navigate('/');}catch(error){toast.error('Pogrešan email ili lozinka.');}finally{setBusy(false);}}
  return <div className="auth-layout"><div className="auth-panel"><div className="brand center"><span className="brand-icon">♥</span><div><strong>Zdravstveni</strong><span>Dnevnik</span></div></div><h1>Prijava</h1><p className="muted">Pristupi svojim zdravstvenim evidencijama.</p><form onSubmit={submit} className="auth-form"><label>Email<input type="email" value={email} onChange={e=>setEmail(e.target.value)} required /></label><label>Lozinka<input type="password" value={password} onChange={e=>setPassword(e.target.value)} required /></label><button className="primary-button" disabled={busy}>{busy?'Prijava...':'Prijavi se'}</button></form><p>Nemate nalog? <Link to="/register">Registrujte se</Link></p></div></div>;
}
