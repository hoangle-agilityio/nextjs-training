import User from "../interfaces/user";

export function searching(data: User, searchInput: string) {
  return data.name.toLowerCase().includes(searchInput.toLowerCase());
}
