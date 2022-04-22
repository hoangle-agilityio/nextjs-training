import { API_BASE_URL } from "../core/constants/api-url";
import User from "../core/interfaces/user";

const API_URL = `${API_BASE_URL}/users`;

/**
   * Send a request with the params passed and return a promise response
   * 
   * @param url api url
   * @param value value to handle
   * @param method method to handle
   * @returns promise response
   */
function remoteFetchByUrl(url: string, value: Partial<User>, method: string): Promise<Response> {
  return fetch(url, {
    method: method,
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(value),
  })
}

export async function getAllUsers(): Promise<User[]> {
  const response: Response = await fetch(API_URL);

  return response.json();
}

export async function addUser(data: Partial<User>): Promise<User> {
  const response: Response = await remoteFetchByUrl(API_URL, data, "POST");

  return response.json();
}

export async function getUserById(id?: string | string[]): Promise<User> {
  const response: Response = await fetch(`${API_URL}/${id}`);

  return response.json();
}

export async function updateUser(data: Partial<User>): Promise<User> {
  const url: string = `${API_URL}/${data.id}`;
  const response: Response = await remoteFetchByUrl(url, data, "PUT");

  return response.json();
}

export async function deleteUser(id: number): Promise<void> {
  const url: string = `${API_URL}/${id}`;

  await remoteFetchByUrl(url, {}, "DELETE");
}
