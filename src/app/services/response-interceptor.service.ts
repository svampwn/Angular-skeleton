import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent, HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { tap, catchError } from 'rxjs/operators';
import { Injectable } from '@angular/core';

@Injectable()
export class ResponseInterceptor implements HttpInterceptor{
    constructor(){
    }
    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        return next.handle(req).pipe(catchError(this.handleError.bind(this)),tap(this.handleResponse.bind(this,req,next)))
    }
    protected handleError(errorResponse: HttpErrorResponse) {
        if (errorResponse.error instanceof ErrorEvent) {
          // A client-side or network error occurred.
          console.error("An error occurred:", errorResponse.error.message);
          
        } else {
          // The backend returned an unsuccessful response code.
          console.error(
            "Server returned code: "  + errorResponse.status,
            "error was: ",errorResponse.error);
        }
       
        return throwError(errorResponse);
    }
    protected handleResponse(req:HttpRequest<any>,next:HttpHandler,event:HttpEvent<any>){
        if(event instanceof HttpResponse){
        }
        return event
    }
}