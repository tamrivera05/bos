export type User = {
  user: {
    id: number;
    name: string;
    username: string;
    email: string;
    street_address: string;
    city: string;
    province: string;
    birth_date: string;
    contact_number: string;
    gender: 'male' | 'female';
    role: 'admin' | 'user';
    created_at: string;
    updated_at: string;
  };
};
