import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"
import type { Group } from "@types"
import { groupService } from "@service"

export const useGroup = () => {
    const queryClient = useQueryClient()
    const {data} = useQuery({
        queryKey: ['groups'],
        queryFn: async () => groupService.getGroups(),
    })

    const useGroupCreate = () => {
        return useMutation({
            mutationFn: async (data: Group) => groupService.createGroup(data),
            onSuccess: () => {
                queryClient.invalidateQueries({queryKey: ['groups']})
            }
        })
    }

    const useGroupUpdate = () => {
        return useMutation({
            mutationFn: async (data: Group) => groupService.updateGroup(data),
            onSuccess: () => {
                queryClient.invalidateQueries({queryKey: ['groups']})
            }
        })
    }

    return {
        data,
        useGroupCreate,
        useGroupUpdate
    }
}