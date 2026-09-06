import { Bell, Users, BookOpen, TrendingUp } from 'lucide-react';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { useAuth } from '@/context/AuthContext';

const SUMMARY = [
  { label: 'Students', value: '3', hint: 'linked to you', icon: Users },
  { label: 'Active quizzes', value: '5', hint: 'assigned this week', icon: BookOpen },
  { label: 'Avg. score', value: '78%', hint: 'across all students', icon: TrendingUp },
];

const NOTIFICATIONS = [
  {
    id: '1',
    title: 'Anna Kowalska finished Algebra quiz',
    time: '2 hours ago',
  },
  {
    id: '2',
    title: 'Jakub Nowak started Geometry practice',
    time: 'Yesterday',
  },
  {
    id: '3',
    title: 'New student invite accepted — Maja Wiśniewska',
    time: '3 days ago',
  },
];

function Home() {
  const { user } = useAuth();

  return (
    <div className="mx-auto max-w-4xl space-y-8">
      <div className="space-y-1">
        <h1 className="text-2xl font-bold tracking-tight">Dashboard</h1>
        <p className="text-muted-foreground">
          Overview of your tutoring activity
          {user?.email ? ` · ${user.email}` : ''}
        </p>
      </div>

      <div className="grid gap-4 sm:grid-cols-3">
        {SUMMARY.map(({ label, value, hint, icon: Icon }) => (
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
            <CardTitle>Notifications</CardTitle>
          </div>
          <CardDescription>Recent activity from your students</CardDescription>
        </CardHeader>
        <CardContent className="p-0">
          <ul className="divide-y">
            {NOTIFICATIONS.map((item) => (
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
    </div>
  );
}

export default Home;
