export interface CurrentBudget {
  name: string;
  phone: number;
  email: string;
  services: string[];
  totalPrice: number;
  pages?: number | null;
  languages?: number | null;
}
