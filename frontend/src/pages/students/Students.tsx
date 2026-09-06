import { useState } from 'react';
import { UserPlus, Users } from 'lucide-react';
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

function Students() {
  const { token } = useAuth();
  const [email, setEmail] = useState('');
  const [submitting, setSubmitting] = useState(false);

  const handleInvite = async (e: React.FormEvent) => {
    e.preventDefault();

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
      if (response.ok) {
        toast.success('Invite sent');
        setEmail('');
      } else {
        toast.error(getErrorMessage(data.errors ?? []));
      }
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="mx-auto max-w-4xl space-y-8">
      <div className="space-y-1">
        <h1 className="text-2xl font-bold tracking-tight">Students</h1>
        <p className="text-muted-foreground">
          Invite students and manage who is linked to you
        </p>
      </div>

      <Card>
        <CardHeader>
          <div className="flex items-center gap-2">
            <UserPlus className="size-5 text-primary" />
            <CardTitle>Invite student</CardTitle>
          </div>
          <CardDescription>
            Send an invite by email. They will need to accept it before showing
            up below.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form
            onSubmit={handleInvite}
            className="flex flex-col gap-4 sm:flex-row sm:items-end"
          >
            <div className="flex-1 space-y-2">
              <Label htmlFor="studentEmail">Student email</Label>
              <Input
                id="studentEmail"
                name="studentEmail"
                type="email"
                placeholder="student@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
            <Button type="submit" disabled={submitting}>
              {submitting ? 'Sending…' : 'Send invite'}
            </Button>
          </form>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <div className="flex items-center gap-2">
            <Users className="size-5 text-primary" />
            <CardTitle>Linked students</CardTitle>
          </div>
          <CardDescription>Students who accepted your invite</CardDescription>
        </CardHeader>
        <CardContent>
          <p className="text-sm text-muted-foreground">
            No linked students yet. Invites you send will appear here after they
            are accepted.
          </p>
        </CardContent>
      </Card>
    </div>
  );
}

export default Students;
