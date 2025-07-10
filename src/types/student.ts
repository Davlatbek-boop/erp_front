export interface CreateStudent {
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


export interface StudentGroup {
  id: number;
  name: string;
  course_id: number;
  start_date: string;
  end_date: string;
  status: string;
  created_at: string;
  updated_at: string;
}

export interface GetStudents {
  id: number;
  first_name: string;
  last_name: string;
  email: string;
  phone: string;
  password_hash: string;
  is_active: boolean;
  gender: string;
  date_of_birth: string;
  avatar_url: string | null;
  refersh_token_hash: string | null;
  groups: StudentGroup[];
  lidId: number;
  events: any[];
  created_at: string;
  updated_at: string;
}