export class ServerError {
    constructor(error: any){
        this.clazz = error.clazz;
        this.message = error.message;
        this.stackTrace = error.stackTrace;
    }
    public clazz: string;
    public stackTrace: string;
    public message: string;
}