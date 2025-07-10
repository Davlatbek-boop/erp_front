import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import type { Students } from "@types";
import { studentService } from "../service/student.service";

interface props {
  id: number;
  data: Students;
}

export const useStudents = () => {
  const queryClient = useQueryClient();
  const { data } = useQuery({
    queryKey: ["student"],
    queryFn: async () => studentService.getStudents(),
  });

  const useStudentCreate = () => {
    return useMutation({
      mutationFn: async (data: Students) => {
        studentService.createStudent(data);
      },
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: ["student"] });
      },
    });
  };

  const useStudentUpdate = () => {
    return useMutation({
      mutationFn: async ({ id, data }: props) =>
        studentService.updateStudent(data, id),
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: ["student"] });
      },
    });
  };

  const useStudentDelete = () => {
    return useMutation({
      mutationFn: async (id: number) => studentService.deleteStudent(id),
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: ["student"] });
      },
    });
  };

  return {
    data,
    useStudentCreate,
    useStudentUpdate,
    useStudentDelete,
  };
};
