export type User = {
  id: number;
  name: string;
  email: string;
  avatar_url?: string;
}

export type DayAvailability = {
  hour: number;
  available: boolean;
}
