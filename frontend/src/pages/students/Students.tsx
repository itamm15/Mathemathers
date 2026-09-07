import { useEffect, useState } from 'react';
import { Inbox, UserPlus, Users } from 'lucide-react';
import { toast } from 'sonner';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useAuth } from '@/context/AuthContext';
import { getErrorMessage } from '@/lib/errors';

// TODO: settle this to the env variable
const API_BASE_URL = 'http://localhost:3000';

type Row = { id: string; student: { email: string } };

const SECTIONS = [
  {
    key: 'active' as const,
    title: 'Powiązani uczniowie',
    description: 'Uczniowie, którzy przyjęli zaproszenie',
    empty: 'Brak powiązanych uczniów',
    icon: Users,
  },
  {
    key: 'pending' as const,
    title: 'Oczekujące zaproszenia',
    description: 'Czekają na akceptację ucznia',
    empty: 'Brak oczekujących zaproszeń',
    icon: Inbox,
  },
];

function Students() {
  const { token } = useAuth();
  const [email, setEmail] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [rows, setRows] = useState({ pending: [] as Row[], active: [] as Row[] });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!token) return;

    fetch(`${API_BASE_URL}/supervisions/students`, {
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

  const handleInvite = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!token) return;

    setSubmitting(true);
    try {
      const response = await fetch(`${API_BASE_URL}/supervisions/invite`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ studentEmail: email }),
      });

      const data = await response.json();
      if (!response.ok) {
        toast.error(getErrorMessage(data.errors || []));
        return;
      }

      const listRes = await fetch(`${API_BASE_URL}/supervisions/students`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      const listBody = await listRes.json();
      if (listRes.ok) setRows(listBody);

      toast.success('Zaproszenie wysłane');
      setEmail('');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="mx-auto max-w-4xl space-y-8">
      <div className="space-y-1">
        <h1 className="text-2xl font-bold tracking-tight">Uczniowie</h1>
        <p className="text-muted-foreground">
          Zapraszaj uczniów i zarządzaj powiązaniami
        </p>
      </div>

      <Card>
        <CardHeader>
          <div className="flex items-center gap-2">
            <UserPlus className="size-5 text-primary" />
            <CardTitle>Zaproś ucznia</CardTitle>
          </div>
          <CardDescription>
            Wyślij zaproszenie na e-mail. Uczeń musi je zaakceptować, zanim
            pojawi się poniżej.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form
            onSubmit={handleInvite}
            className="flex flex-col gap-4 sm:flex-row sm:items-end"
          >
            <div className="flex-1 space-y-2">
              <Label htmlFor="studentEmail">E-mail ucznia</Label>
              <Input
                id="studentEmail"
                name="studentEmail"
                type="email"
                placeholder="anna.nowak@email.pl"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
            <Button type="submit" disabled={submitting}>
              {submitting ? 'Wysyłanie…' : 'Wyślij zaproszenie'}
            </Button>
          </form>
        </CardContent>
      </Card>

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
                    <li key={item.id} className="px-4 py-3 text-sm font-medium">
                      {item.student.email}
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

export default Students;
