import { z } from 'zod';

export const inviteSupervisionSchema = z.object({
  studentEmail: z.email({ error: 'INVALID_EMAIL' }),
});

export type InviteSupervisionDto = z.infer<typeof inviteSupervisionSchema>;
