export interface CreditCard {
    number: string;
    name: string;
    expiration_month: number;
    expiration_year: number;
    cvv: string;
}

export interface Invoice {
  id: string;
  amount: number;
  payment_date: string;
  store: string;
  description: string;
  created_at: string;
}