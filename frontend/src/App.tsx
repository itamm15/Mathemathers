import { Routes, Route } from 'react-router-dom';
import Layout from './components/layout/layout';
import ProtectedRoute from './components/ProtectedRoute';
import Home from './pages/home';
import Login from './pages/login';
import Register from './pages/register';

type AppRoute = {
  path: string;
  element: React.ReactNode;
};

const LAYOUT_ROUTES: AppRoute[] = [
  { path: '/', element: <Home /> },
];

function App() {
  return (
    <Routes>
      <Route element={<ProtectedRoute />}>
        <Route path="/" element={<Layout />}>
          {LAYOUT_ROUTES.map((route, index) => (
            <Route key={index} path={route.path} element={route.element} />
          ))}
        </Route>
      </Route>
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
    </Routes>
  );
}

export default App;
