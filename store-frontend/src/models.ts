export interface Product {
    id: string;
    name: string;
    description: string;
    image_url: string;
    slug: string;
    price: number;
    created_at: string;
}

export interface CreditCard {
    number: string;
    name: string;
    expiration_month: number;
    expiration_year: number;
    cvv: string;
}

export enum OrderStatus {
    Approved = "approved",
    Pending = "pending",
  }
  
  export interface OrderItem {
    product: Product;
    quantity: number;
    price: number;
  }
  
  export interface Order {
    id: string;
    credit_card: Omit<CreditCard, "cvv" | "name">;
    items: OrderItem[];
    status: OrderStatus;
  }

export const products: Product[] = [
    {
        id: 'uuid',
        name: 'Product testing',
        description: 'description to play',
        price: 50.50,
        image_url: 'https://source.unsplash.com/random?product,' + Math.random(),
        slug: 'product-testing1',
        created_at: '2022-06-06T00:00:00'
    },
    {
        id: 'uuid',
        name: 'Product testing 1',
        description: 'description to play 11',
        price: 100.50,
        image_url: 'https://source.unsplash.com/random?product,' + Math.random(),
        slug: 'product-testing2',
        created_at: '2022-06-06T00:00:00'
    }
]
