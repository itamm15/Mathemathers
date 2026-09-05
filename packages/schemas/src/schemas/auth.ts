import { z } from 'zod';

// TODO: Move roles to a separate file
export const USER_ROLES = ['student', 'parent', 'tutor'] as const;
export type UserRole = (typeof USER_ROLES)[number];

export const registerSchema = z.object({
  email: z.email({ error: 'INVALID_EMAIL' }),
  password: z
    .string()
    .min(8, 'PASSWORD_TOO_SHORT')
    .regex(/[A-Za-z]/, 'PASSWORD_MISSING_LETTER')
    .regex(/[0-9]/, 'PASSWORD_MISSING_NUMBER'),
  role: z.enum(USER_ROLES, { error: 'INVALID_ROLE' }),
});

export type RegisterDto = z.infer<typeof registerSchema>;
