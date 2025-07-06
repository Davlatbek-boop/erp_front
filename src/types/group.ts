export interface Group {
    id: number,
    name: string,
    course_id: number,
    status: string,
    start_date: string,
    end_date: string
}

export type Course = {
    id: number
  title: string;
  description: string;
  duration: string;
  lesson_duration: string;
  price: number;
};

export type GetGroups = {
  id: number;
  name: string;
  status: string;
  start_date: string;
  end_date: string;
  course?: Course;
  students?: any[];
  teachers?: any[];
};