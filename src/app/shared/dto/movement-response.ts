export interface MovementResponse {
  id: number;
  description: string;
  amount: number;
  currency: string;
  category: string;
  date: Date;
  user: string;
}
