import { Routes, Route } from 'react-router-dom';
import Layout from './components/layout/layout';
import Home from './pages/home';
import Login from './pages/login';
import Register from './pages/register';

type Route = {
  path: string;
  element: React.ReactNode;
}

const LAYOUT_ROUTES: Route[] = [
  { path: '/', element: <Home /> },
]

function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        {LAYOUT_ROUTES.map((route, index) => (
          <Route key={index} path={route.path} element={route.element} />
        ))}      
      </Route>
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
    </Routes>
  );
}

export default App;
