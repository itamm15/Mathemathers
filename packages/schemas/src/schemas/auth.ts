import { z } from 'zod';

// TODO: Move roles to a separate file
export const USER_ROLES = ['student', 'parent', 'tutor'] as const;
export type UserRole = (typeof USER_ROLES)[number];

export const registerSchema = z.object({
  email: z.email(),
  password: z
    .string()
    // TODO: Add gettext
    .min(8, 'Password must be at least 8 characters')
    .regex(/[A-Za-z]/, 'Password must contain a letter')
    .regex(/[0-9]/, 'Password must contain a number'),
  role: z.enum(USER_ROLES),
});

export type RegisterDto = z.infer<typeof registerSchema>;
