import { Bell, Users, BookOpen, TrendingUp, GraduationCap, Inbox } from 'lucide-react';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { useAuth } from '@/context/AuthContext';

const TUTOR_SUMMARY = [
  { label: 'Uczniowie', value: '3', hint: 'powiązani z Tobą', icon: Users },
  { label: 'Aktywne quizy', value: '5', hint: 'przypisane w tym tygodniu', icon: BookOpen },
  { label: 'Śr. wynik', value: '78%', hint: 'u wszystkich uczniów', icon: TrendingUp },
];

const TUTOR_NOTIFICATIONS = [
  {
    id: '1',
    title: 'Anna Kowalska ukończyła quiz z algebry',
    time: '2 godz. temu',
  },
  {
    id: '2',
    title: 'Jakub Nowak zaczął ćwiczenia z geometrii',
    time: 'Wczoraj',
  },
  {
    id: '3',
    title: 'Nowe zaproszenie przyjęte — Maja Wiśniewska',
    time: '3 dni temu',
  },
];

const STUDENT_SUMMARY = [
  { label: 'Korepetytorzy', value: '—', hint: 'powiązani z Tobą', icon: GraduationCap },
  { label: 'Oczekujące zaproszenia', value: '—', hint: 'czekają na Twoją odpowiedź', icon: Inbox },
  { label: 'Quizy', value: '—', hint: 'przypisane do Ciebie', icon: BookOpen },
];

const STUDENT_NOTIFICATIONS = [
  {
    id: '1',
    title: 'Sprawdź Korepetytorów — masz oczekujące zaproszenia od nauczycieli',
    time: 'Przed chwilą',
  },
];

function TutorDashboard({ email }: { email?: string }) {
  return (
    <>
      <div className="space-y-1">
        <h1 className="text-2xl font-bold tracking-tight">Panel</h1>
        <p className="text-muted-foreground">
          Przegląd Twojej aktywności korepetytorskiej
          {email ? ` · ${email}` : ''}
        </p>
      </div>

      <div className="grid gap-4 sm:grid-cols-3">
        {TUTOR_SUMMARY.map(({ label, value, hint, icon: Icon }) => (
          <Card key={label}>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">{label}</CardTitle>
              <Icon className="size-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <p className="text-2xl font-bold">{value}</p>
              <p className="text-xs text-muted-foreground">{hint}</p>
            </CardContent>
          </Card>
        ))}
      </div>

      <Card>
        <CardHeader>
          <div className="flex items-center gap-2">
            <Bell className="size-5 text-primary" />
            <CardTitle>Powiadomienia</CardTitle>
          </div>
          <CardDescription>Ostatnia aktywność Twoich uczniów</CardDescription>
        </CardHeader>
        <CardContent className="p-0">
          <ul className="divide-y">
            {TUTOR_NOTIFICATIONS.map((item) => (
              <li
                key={item.id}
                className="flex items-start justify-between gap-4 px-6 py-4"
              >
                <p className="text-sm font-medium leading-snug">{item.title}</p>
                <span className="shrink-0 text-xs text-muted-foreground">
                  {item.time}
                </span>
              </li>
            ))}
          </ul>
        </CardContent>
      </Card>
    </>
  );
}

function StudentDashboard({ email }: { email?: string }) {
  return (
    <>
      <div className="space-y-1">
        <h1 className="text-2xl font-bold tracking-tight">Panel</h1>
        <p className="text-muted-foreground">
          Przegląd Twojej nauki
          {email ? ` · ${email}` : ''}
        </p>
      </div>

      <div className="grid gap-4 sm:grid-cols-3">
        {STUDENT_SUMMARY.map(({ label, value, hint, icon: Icon }) => (
          <Card key={label}>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">{label}</CardTitle>
              <Icon className="size-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <p className="text-2xl font-bold">{value}</p>
              <p className="text-xs text-muted-foreground">{hint}</p>
            </CardContent>
          </Card>
        ))}
      </div>

      <Card>
        <CardHeader>
          <div className="flex items-center gap-2">
            <Bell className="size-5 text-primary" />
            <CardTitle>Powiadomienia</CardTitle>
          </div>
          <CardDescription>
            Aktualizacje o korepetytorach i quizach
          </CardDescription>
        </CardHeader>
        <CardContent className="p-0">
          <ul className="divide-y">
            {STUDENT_NOTIFICATIONS.map((item) => (
              <li
                key={item.id}
                className="flex items-start justify-between gap-4 px-6 py-4"
              >
                <p className="text-sm font-medium leading-snug">{item.title}</p>
                <span className="shrink-0 text-xs text-muted-foreground">
                  {item.time}
                </span>
              </li>
            ))}
          </ul>
        </CardContent>
      </Card>
    </>
  );
}

function Home() {
  const { user } = useAuth();
  const isStudent = user?.role === 'student';

  return (
    <div className="mx-auto max-w-4xl space-y-8">
      {isStudent ? (
        <StudentDashboard email={user?.email} />
      ) : (
        <TutorDashboard email={user?.email} />
      )}
    </div>
  );
}

export default Home;
