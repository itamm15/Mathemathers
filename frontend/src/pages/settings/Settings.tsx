import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { useAuth } from '@/context/AuthContext';

const ROLE_LABELS: Record<string, string> = {
  student: 'Uczeń',
  parent: 'Rodzic',
  tutor: 'Korepetytor',
};

function Settings() {
  const { user } = useAuth();

  if (!user) {
    return (
      <p className="text-sm text-muted-foreground">Ładowanie profilu…</p>
    );
  }

  const fields = [
    { label: 'Imię', value: user.firstName || '—' },
    { label: 'Nazwisko', value: user.lastName || '—' },
    { label: 'E-mail', value: user.email },
    { label: 'Rola', value: ROLE_LABELS[user.role] },
  ];

  return (
    <div className="mx-auto max-w-4xl space-y-8">
      <div className="space-y-1">
        <h1 className="text-2xl font-bold tracking-tight">Ustawienia</h1>
        <p className="text-muted-foreground">Twój profil w Mathemathers</p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Profil</CardTitle>
          <CardDescription>Podstawowe informacje o koncie</CardDescription>
        </CardHeader>
        <CardContent>
          <dl className="divide-y rounded-md border">
            {fields.map(({ label, value }) => (
              <div
                key={label}
                className="flex items-center justify-between gap-4 px-4 py-3"
              >
                <dt className="text-sm text-muted-foreground">{label}</dt>
                <dd className="text-sm font-medium">{value}</dd>
              </div>
            ))}
          </dl>
        </CardContent>
      </Card>
    </div>
  );
}

export default Settings;
