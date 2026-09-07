import { useEffect, useState } from 'react';
import { GraduationCap, Inbox } from 'lucide-react';
import { toast } from 'sonner';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { useAuth } from '@/context/AuthContext';
import { getErrorMessage } from '@/lib/errors';

// TODO: settle this to the env variable
const API_BASE_URL = 'http://localhost:3000';

type Row = { id: string; supervisor: { email: string } };

const SECTIONS = [
  {
    key: 'pending' as const,
    title: 'Pending invites',
    description: 'Tutors waiting for you to accept or decline',
    empty: 'No pending invites',
    icon: Inbox,
  },
  {
    key: 'active' as const,
    title: 'Active tutors',
    description: 'Tutors you are linked with',
    empty: 'No linked tutors yet',
    icon: GraduationCap,
  },
];

function Tutors() {
  const { token } = useAuth();
  const [rows, setRows] = useState({ pending: [] as Row[], active: [] as Row[] });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!token) return;

    fetch(`${API_BASE_URL}/supervisions/tutors`, {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then(async (res) => {
        const body = await res.json();
        if (!res.ok) {
          toast.error(getErrorMessage(body.errors));
          return;
        }
        setRows(body);
      })
      .finally(() => setLoading(false));
  }, [token]);

  return (
    <div className="mx-auto max-w-4xl space-y-8">
      <div className="space-y-1">
        <h1 className="text-2xl font-bold tracking-tight">Tutors</h1>
        <p className="text-muted-foreground">
          Your linked tutors and pending invites
        </p>
      </div>

      {SECTIONS.map(({ key, title, description, empty, icon: Icon }) => {
        const items = rows[key];

        return (
          <Card key={key}>
            <CardHeader>
              <div className="flex items-center gap-2">
                <Icon className="size-5 text-primary" />
                <CardTitle>{title}</CardTitle>
              </div>
              <CardDescription>{description}</CardDescription>
            </CardHeader>
            <CardContent>
              {loading && (
                <p className="text-sm text-muted-foreground">Loading…</p>
              )}
              {!loading && items.length === 0 && (
                <p className="text-sm text-muted-foreground">{empty}</p>
              )}
              {!loading && items.length > 0 && (
                <ul className="divide-y rounded-md border">
                  {items.map((item) => (
                    <li key={item.id} className="px-4 py-3 text-sm font-medium">
                      {item.supervisor.email}
                    </li>
                  ))}
                </ul>
              )}
            </CardContent>
          </Card>
        );
      })}
    </div>
  );
}

export default Tutors;
