import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"
import { courseService } from "../service"
import type { Course } from "../types"

export const useCourses = () => {
    const queryClient = useQueryClient()
        const {data} = useQuery({
            queryKey: ['course'],
            queryFn: async () => courseService.getCourses(),
        })
    
        const useCourseCreate = () => {
            return useMutation({
                mutationFn: async (data: Course) => {
                    console.log(data);
                    courseService.createCourse(data)

                },
                onSuccess: () => {
                    queryClient.invalidateQueries({queryKey: ['course']})
                }
            })
        }
    
        const useCourseUpdate = () => {
            return useMutation({
                mutationFn: async (data: Course) => courseService.updateCourse(data),
                onSuccess: () => {
                    queryClient.invalidateQueries({queryKey: ['course']})
                }
            })
        }

        const useCourseDelete = () => {
            return useMutation({
                mutationFn: async (id: number) => courseService.deleteCourse(id),
                onSuccess: () => {
                    queryClient.invalidateQueries({queryKey: ['course']})
                }
            })
        }

    return {
        data,
        useCourseCreate,
        useCourseUpdate,
        useCourseDelete
    }
}