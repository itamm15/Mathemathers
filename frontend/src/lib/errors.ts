const ERROR_MESSAGES: Record<string, string> = {
  EMAIL_TAKEN: 'Ten adres e-mail jest już zajęty',
  INVALID_CREDENTIALS: 'Nieprawidłowy e-mail lub hasło',
  INVALID_EMAIL: 'Podaj prawidłowy adres e-mail',
  INVALID_ROLE: 'Wybierz rolę',
  PASSWORD_TOO_SHORT: 'Hasło musi mieć co najmniej 8 znaków',
  PASSWORD_MISSING_LETTER: 'Hasło musi zawierać literę',
  PASSWORD_MISSING_NUMBER: 'Hasło musi zawierać cyfrę',
  SUPERVISOR_NOT_TUTOR: 'Tylko korepetytorzy mogą zapraszać uczniów',
  STUDENT_NOT_FOUND: 'Nie znaleziono ucznia z tym adresem e-mail',
  INVITE_PENDING: 'Zaproszenie już oczekuje na odpowiedź',
  ALREADY_LINKED: 'Ten uczeń jest już z Tobą powiązany',
  INVITE_NOT_FOUND: 'Nie znaleziono zaproszenia',
  INVITE_NOT_PENDING: 'To zaproszenie nie jest już oczekujące',
  FORBIDDEN: 'Nie masz uprawnień do tej akcji',
};

export function getErrorMessage(errors: string[]): string {
  return errors.map((code) => ERROR_MESSAGES[code] ?? code).join('. ');
}
