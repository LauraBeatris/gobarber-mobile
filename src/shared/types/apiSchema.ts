export interface User {
  id: number;
  name: string;
  avatar_url?: string;
}

export interface DayAvailability {
  hour: number;
  available: boolean;
}
