import { apiConfig } from "@api/config"
import { ApiUrls } from "@api/api-urls"
import { type GetGroups } from "@types"


export const groupService = {
    async getGroups(){
        const res = await apiConfig().getRequest(ApiUrls.GROUPS)
        return res
    },

    async createGroup(model: GetGroups):Promise<any>{
        const res = await apiConfig().postRequest(ApiUrls.GROUPS, model)
        return res
    },

    async getOneGroup(id:string){
        // console.log(id, "getonegroup");
        const res = await apiConfig().getRequest(`${ApiUrls.GROUPS}/${id}`)
        return res
    },

    async deleteOneGroup(id:number){
        console.log(id, "getonegroup");
        const res = await apiConfig().deleteRequest(`${ApiUrls.GROUPS}/${id}`)
        return res
    },

    async updateGroup(model: GetGroups, id: number){
        console.log(model);
        const res = await apiConfig().patchRequest(`${ApiUrls.GROUPS}/${id}`, model)
        return res
    },
}