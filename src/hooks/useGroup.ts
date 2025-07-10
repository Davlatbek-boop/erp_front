import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import type { GetGroups } from "@types";
import { groupService } from "@service";


type UpdateGroupInput = {
  id: number;
  data: GetGroups;
};

export const useGroup = () => {
  const queryClient = useQueryClient();
  const { data } = useQuery({
    queryKey: ["groups"],
    queryFn: async () => await groupService.getGroups(),
  });

  const useGroupCreate = () => {
    return useMutation({
      mutationFn: async (data: GetGroups) => groupService.createGroup(data),
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: ["groups"] });
      },
    });
  };

  const useGroupUpdate = () => {
    return useMutation({
      mutationFn: async ({id, data}:UpdateGroupInput) => groupService.updateGroup(data, id),
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: ["groups"] });
      },
    });
  };

  const useGroupDelete = () => {
      return useMutation({
        mutationFn: async (id: number) => groupService.deleteOneGroup(id),
        onSuccess: () => {
          queryClient.invalidateQueries({ queryKey: ["groups"] });
        },
      });
    };

  return {
    data,
    useGroupCreate,
    useGroupUpdate,
    useGroupDelete
  };
};
