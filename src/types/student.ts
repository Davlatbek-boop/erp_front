export interface Students {
  id: number;
  first_name: string;
  last_name: string;
  email: string;
  phone: string;
  password_hash: string;
  gender: 'male' | 'female' | string; 
  date_of_birth: string; 
  groupsId: number;
  lidId: number;
  eventsId: number
}
