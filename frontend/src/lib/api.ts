import type { CreateUserDto } from '@/types/user';

// TODO: settle this to the env variable
const API_BASE_URL = 'http://localhost:3000';

export async function register(data: CreateUserDto) {
  const response = await fetch(`${API_BASE_URL}/auth/register`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  });

  const body = await response.json();
  return { ok: response.ok, ...body };
}
