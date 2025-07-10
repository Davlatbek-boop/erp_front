import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import type { Branch } from "../types";
import { branchService } from "../service/branches.service";

interface props {
    id: number,
    data: Branch
}

export const useBranch = () => {
  const queryClient = useQueryClient();
  const { data } = useQuery({
    queryKey: ["branch"],
    queryFn: async () => branchService.getBranches(),
  });

  const useBranchCreate = () => {
    return useMutation({
      mutationFn: async (data: Branch) => {
        branchService.createBranch(data);
      },
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: ["branch"] });
      },
    });
  };

  const useBranchUpdate = () => {
    return useMutation({
      mutationFn: async ({id, data}: props) => branchService.updateBranch(data, id),
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: ["branch"] });
      },
    });
  };

  const useBranchDelete = () => {
    return useMutation({
      mutationFn: async (id: number) => branchService.deleteBranch(id),
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: ["branch"] });
      },
    });
  };

  return {
    data,
    useBranchCreate,
    useBranchUpdate,
    useBranchDelete,
  };
};
