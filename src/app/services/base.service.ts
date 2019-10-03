import { HttpClient } from '@angular/common/http';

export abstract class BaseService{
    protected base_api_url: string;
    constructor(protected http:HttpClient,api_path:string){
        this.base_api_url = api_path;
    }
}