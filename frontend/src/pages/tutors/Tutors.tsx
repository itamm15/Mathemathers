import { useEffect, useState } from 'react';
import { GraduationCap, Inbox } from 'lucide-react';
import { toast } from 'sonner';
import { Button } from '@/components/ui/button';
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
    title: 'Oczekujące zaproszenia',
    description: 'Korepetytorzy czekający na Twoją decyzję',
    empty: 'Brak oczekujących zaproszeń',
    icon: Inbox,
  },
  {
    key: 'active' as const,
    title: 'Aktywni korepetytorzy',
    description: 'Korepetytorzy, z którymi jesteś powiązany',
    empty: 'Brak powiązanych korepetytorów',
    icon: GraduationCap,
  },
];

function Tutors() {
  const { token } = useAuth();
  const [rows, setRows] = useState({ pending: [] as Row[], active: [] as Row[] });
  const [loading, setLoading] = useState(true);
  const [pendingActionId, setPendingActionId] = useState<string | null>(null);

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

  const handleAccept = async (id: string) => {
    if (!token) return;

    setPendingActionId(id);
    try {
      const res = await fetch(`${API_BASE_URL}/supervisions/${id}/accept`, {
        method: 'POST',
        headers: { Authorization: `Bearer ${token}` },
      });
      const body = await res.json();
      if (!res.ok) {
        toast.error(getErrorMessage(body.errors || []));
        return;
      }

      setRows((prev) => ({
        pending: prev.pending.filter((row) => row.id !== id),
        active: [body, ...prev.active],
      }));
      toast.success('Zaproszenie przyjęte');
    } finally {
      setPendingActionId(null);
    }
  };

  const handleDecline = async (id: string) => {
    if (!token) return;

    setPendingActionId(id);
    try {
      const res = await fetch(`${API_BASE_URL}/supervisions/${id}/decline`, {
        method: 'POST',
        headers: { Authorization: `Bearer ${token}` },
      });
      const body = await res.json();
      if (!res.ok) {
        toast.error(getErrorMessage(body.errors || []));
        return;
      }

      setRows((prev) => ({
        ...prev,
        pending: prev.pending.filter((row) => row.id !== id),
      }));
      toast.success('Zaproszenie odrzucone');
    } finally {
      setPendingActionId(null);
    }
  };

  return (
    <div className="mx-auto max-w-4xl space-y-8">
      <div className="space-y-1">
        <h1 className="text-2xl font-bold tracking-tight">Korepetytorzy</h1>
        <p className="text-muted-foreground">
          Twoi korepetytorzy i oczekujące zaproszenia
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
                <p className="text-sm text-muted-foreground">Ładowanie…</p>
              )}
              {!loading && items.length === 0 && (
                <p className="text-sm text-muted-foreground">{empty}</p>
              )}
              {!loading && items.length > 0 && (
                <ul className="divide-y rounded-md border">
                  {items.map((item) => (
                    <li
                      key={item.id}
                      className="flex items-center justify-between gap-4 px-4 py-3"
                    >
                      <p className="text-sm font-medium">
                        {item.supervisor.email}
                      </p>
                      {key === 'pending' && (
                        <div className="flex shrink-0 gap-2">
                          <Button
                            size="sm"
                            disabled={pendingActionId === item.id}
                            onClick={() => handleAccept(item.id)}
                          >
                            Akceptuj
                          </Button>
                          <Button
                            size="sm"
                            variant="outline"
                            disabled={pendingActionId === item.id}
                            onClick={() => handleDecline(item.id)}
                          >
                            Odrzuć
                          </Button>
                        </div>
                      )}
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
