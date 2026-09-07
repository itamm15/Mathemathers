import { Routes, Route } from 'react-router-dom';
import Layout from './components/layout/layout';
import ProtectedRoute from './components/ProtectedRoute';
import RoleRoute from './components/RoleRoute';
import GuestRoute from './components/GuestRoute';
import Home from './pages/home';
import Students from './pages/students';
import Tutors from './pages/tutors';
import Login from './pages/login';
import Register from './pages/register';

function App() {
  return (
    <Routes>
      <Route element={<ProtectedRoute />}>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />

          <Route element={<RoleRoute roles={['tutor']} />}>
            <Route path="students" element={<Students />} />
          </Route>

          <Route element={<RoleRoute roles={['student']} />}>
            <Route path="tutors" element={<Tutors />} />
          </Route>
        </Route>
      </Route>
      <Route element={<GuestRoute />}>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
      </Route>
    </Routes>
  );
}

export default App;
