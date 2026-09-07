import { NavLink, Outlet, useNavigate } from 'react-router-dom';
import {
  LayoutDashboard,
  Users,
  GraduationCap,
  BookOpen,
  Settings,
  LogOut,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useAuth } from '@/context/AuthContext';
import { cn } from '@/lib/utils';

const TUTOR_NAV = [
  { to: '/', label: 'Dashboard', icon: LayoutDashboard, end: true },
  { to: '/students', label: 'Students', icon: Users, end: false },
  { to: '/quizzes', label: 'Quizzes', icon: BookOpen, end: false },
  { to: '/settings', label: 'Settings', icon: Settings, end: false },
];

const STUDENT_NAV = [
  { to: '/', label: 'Dashboard', icon: LayoutDashboard, end: true },
  { to: '/tutors', label: 'Tutors', icon: GraduationCap, end: false },
  { to: '/settings', label: 'Settings', icon: Settings, end: false },
];

function Layout() {
  const { user, setToken } = useAuth();
  const navigate = useNavigate();

  const navItems = user?.role === 'student' ? STUDENT_NAV : TUTOR_NAV;

  const handleLogout = () => {
    setToken(null);
    navigate('/login');
  };

  return (
    <div className="flex min-h-screen bg-background">
      <aside className="flex w-56 shrink-0 flex-col border-r">
        <div className="flex h-14 items-center border-b px-4">
          <span className="text-lg font-bold tracking-tight">Mathemathers</span>
        </div>

        <nav className="flex flex-1 flex-col gap-1 p-3">
          {navItems.map(({ to, label, icon: Icon, end }) => (
            <NavLink
              key={to}
              to={to}
              end={end}
              className={({ isActive }) =>
                cn(
                  'flex items-center gap-2 rounded-md px-3 py-2 text-sm font-medium transition-colors',
                  isActive
                    ? 'bg-secondary text-secondary-foreground'
                    : 'text-muted-foreground hover:bg-muted hover:text-foreground',
                )
              }
            >
              <Icon className="size-4" />
              {label}
            </NavLink>
          ))}
        </nav>

        <div className="space-y-2 border-t p-3">
          <p className="truncate px-3 text-xs text-muted-foreground">
            {user?.email}
          </p>
          <Button
            variant="ghost"
            size="sm"
            className="w-full justify-start"
            onClick={handleLogout}
          >
            <LogOut className="size-4" />
            Log out
          </Button>
        </div>
      </aside>

      <main className="flex-1 overflow-auto p-8">
        <Outlet />
      </main>
    </div>
  );
}

export default Layout;
