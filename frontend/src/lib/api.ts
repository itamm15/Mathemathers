import type { CreateUserDto } from '@/types/user';

// TODO: settlte this to the env variable
const API_BASE_URL = 'http://localhost:3000';

export async function createUser(data: CreateUserDto) {
  const response = await fetch(`${API_BASE_URL}/users`, {
    method: 'POST',
    headers: {'Content-Type': 'application/json'},
    body: JSON.stringify(data),
  });

  return response.json();
}

