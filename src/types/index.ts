export type User = {
  id: number;
  email: string;
  first_name: string;
  last_name: string;
  avatar: string;
};

export type AuthState = {
  token: string | null;
  userId: number | null;
};
