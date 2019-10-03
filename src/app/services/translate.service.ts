import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { BehaviorSubject, Observable } from 'rxjs';
import { map, skipWhile } from 'rxjs/operators';
import { isNullOrUndefined } from 'util';
import { BaseService } from './base.service';

@Injectable()
export class TranslateService extends BaseService {
    private bs:BehaviorSubject<Object> = new BehaviorSubject(null);
    private observer:Observable<Object> = this.bs.asObservable().pipe(skipWhile(val=> val === null));

    constructor(protected http: HttpClient) {
        super(http, '');
        this.fetchTranslations()
    }
    private fetchTranslations():void{
        this.http.get(this.base_api_url).subscribe(response=> {
            let locale  = JSON.parse(response.toString());
            this.bs.next(locale);
        });
    }
    /**
     * 
     * @param key 
     * @param args 
     * @param strict non existing translations returns undefined default: false 
     */
    private _translate(key: string,args: Array<any>,strict:boolean): Observable<string> {
        return this.observer.pipe(map(translations=>{
            let message = translations[key];
            if (isNullOrUndefined(message)){
                return strict ? message:  key;
            }
            if(isNullOrUndefined(args)){
                return message
            }
            
            args.forEach((arg, ind) => {
                if (typeof arg === 'string') {
                    arg = isNullOrUndefined(translations[arg]) ? arg : translations[arg];
                } else if (isNullOrUndefined(arg)) {
                    arg = '';
                }
                message = message.replace('{' + ind + '}', arg.toString());
            });
            return message;
        }))
    }
    public translate(key: string, args?: Array<any>){
        const strict = true
        return this._translate(key,args,!strict)
    }
    /**
     * 
     * @param key
     * @param args Arguments to the translation 
     * @returns The translated value, undefined if the key does not exist
     */
    public translateStrict(key: string, args?:Array<any>){
        const strict = true
        return this._translate(key,args,strict)
    }

    /**
     * 
     * @param keys 
     * @param strict non existing translations returns undefined default: false 
     */
    private _massTranslate(keys: Array<string>,strict?:boolean): Observable<Array<string>> {
        return this.observer.pipe(map(translations=>{
            const values: Array<string> = new Array();
            const allKeys = Object.keys(translations)
            keys.forEach(key=>{
                const value = allKeys.indexOf(key) >=0 || strict ? translations[key] :key
                values.push(value)
            })
            return values
        }))
    }
    public massTranslate(keys: Array<string>){
        return this._massTranslate(keys,false)
    }
    /**
     * 
     * @param keys 
     * @returns List of translations, keys that are not found are undefined
     */
    public massTranslateStrict(keys:Array<string>){
        return this._massTranslate(keys,true)
    }
}
