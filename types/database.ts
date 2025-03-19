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

export type WorkingHours = {
  start_time: string;
  end_time: string;
};

export type DocumentStatus = 'open' | 'delivered' | 'cancelled';

export type Document = {
  id: number;
  full_name: string;
  address: string;
  email: string;
  contact_number: string;
  date_of_birth: string;
  type: string;
  purpose: string;
  requester_id: number;
  status: DocumentStatus;
  created_at: string;
  updated_at: string;
  requester: {
    id: number;
    name: string;
    email: string;
  };
};

export type TicketStatus = 'open' | 'in_progress' | 'resolved';
export type TicketPriority = 'low' | 'medium' | 'high';

export type Ticket = {
  id: number;
  user_id: number;
  title: string;
  description: string;
  status: TicketStatus;
  priority: TicketPriority;
  created_at: string;
  updated_at: string;
  user: {
    id: number;
    name: string;
    email: string;
  };
};

export type Users = {
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
  is_admin: number;
};
