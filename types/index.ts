// types/index.ts

// Định nghĩa kiểu cho user
export interface User {
  id: string | number;
  name: string;
  email: string | null;
  avatar: string | null;
}

// Định nghĩa kiểu cho props của Home
export interface HomeProps {
  initialUser: User | null;
  initialToken: string | null;
}
