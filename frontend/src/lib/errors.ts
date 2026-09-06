const ERROR_MESSAGES: Record<string, string> = {
  EMAIL_TAKEN: 'This email is already taken',
  INVALID_CREDENTIALS: 'Invalid email or password',
  INVALID_EMAIL: 'Enter a valid email',
  INVALID_ROLE: 'Select a role',
  PASSWORD_TOO_SHORT: 'Password must be at least 8 characters',
  PASSWORD_MISSING_LETTER: 'Password must contain a letter',
  PASSWORD_MISSING_NUMBER: 'Password must contain a number',
  SUPERVISOR_NOT_TUTOR: 'Only tutors can invite students',
  STUDENT_NOT_FOUND: 'No student found with this email',
  INVITE_PENDING: 'An invite is already pending',
  ALREADY_LINKED: 'This student is already linked to you',
};

export function getErrorMessage(errors: string[]): string {
  return errors.map((code) => ERROR_MESSAGES[code] ?? code).join('. ');
}
