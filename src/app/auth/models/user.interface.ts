export interface User {
  id?: string;
  fullName: string;
  email: string;
  phone?: string;
  address?: string;
  country?: string;
  role?: Role;
  create_at?: Date;
  update_at?: Date;
  password: String;
}

enum Role {
  USER,
  ADMIN
}
