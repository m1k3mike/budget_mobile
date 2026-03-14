export interface Employee {
  id: string;
  name: string;
  title: string;
  department: string;
  email: string;
  avatar: string;
  children?: Employee[];
}
