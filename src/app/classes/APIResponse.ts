export class APIResponse<T>
{
    isValid:boolean=false;
    errorMessage: string="";

}

export class APIResponseModel<T> extends APIResponse<T>
{
 public model : T | null=null
    
}
export class APIResponseModelList<T> extends APIResponse<T>
{
    public modelList : T[] |null = null
}