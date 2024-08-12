export interface User {
  id?: string;
  fullName: string;
  email: string;
  phone?: string;
  dni?: string;
  country?: string;
  genre: string;
  role?: Role;
  create_at?: Date;
  update_at?: Date;
  password: String;
}

enum Role {
  USER,
  ADMIN
}
