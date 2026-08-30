const ERROR_MESSAGES: Record<string, string> = {
  EMAIL_TAKEN: 'This email is already taken',
  INVALID_CREDENTIALS: 'Invalid email or password',
  INVALID_EMAIL: 'Enter a valid email',
  INVALID_ROLE: 'Select a role',
  PASSWORD_TOO_SHORT: 'Password must be at least 8 characters',
  PASSWORD_MISSING_LETTER: 'Password must contain a letter',
  PASSWORD_MISSING_NUMBER: 'Password must contain a number',
};

export function getErrorMessage(errors: string[]): string {
  return errors.map((code) => ERROR_MESSAGES[code] ?? code).join('. ');
}
