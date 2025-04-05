import Api from "@/infra/http/Api";

export const findAllAdresByUserId = async (userId:string) =>{

  const response = await Api(`address/${userId}`,{method:"GET"});
    return response.json();
}