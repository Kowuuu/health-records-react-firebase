import {Navigate, Route, Routes} from 'react-router-dom';
import Layout from './components/Layout';
import ProtectedRoute from './components/ProtectedRoute';
import Login from './pages/Login';
import Register from './pages/Register';
import Dashboard from './pages/Dashboard';
import Records from './pages/Records';
import RecordEditor from './pages/RecordEditor';
import Reminders from './pages/Reminders';
import Statistics from './pages/Statistics';

export default function App() {
    return <Routes>
        <Route path="/login" element={<Login/>}/>
        <Route path="/register" element={<Register/>}/>
        <Route element={<ProtectedRoute/>}>
            <Route element={<Layout/>}>
                <Route path="/" element={<Dashboard/>}/>
                <Route path="/records" element={<Records/>}/>
                <Route path="/records/new" element={<RecordEditor/>}/>
                <Route path="/records/:id/edit" element={<RecordEditor/>}/>
                <Route path="/reminders" element={<Reminders/>}/>
                <Route path="/statistics" element={<Statistics/>}/>
            </Route>
        </Route>
        <Route path="*" element={<Navigate to="/" replace/>}/>
    </Routes>
}
