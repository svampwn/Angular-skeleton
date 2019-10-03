import { PipeTransform, Pipe } from '@angular/core';
import { TranslateService } from '../services/translate.service';
import { isNullOrUndefined } from 'util';

@Pipe({name:'translate'})
export class TranslatePipe implements PipeTransform{
    constructor(private translateService:TranslateService){}
    transform(key:string,args: Array<any> | any, strict: boolean){
        if(!isNullOrUndefined(args) && !Array.isArray(args)){
            return strict ? this.translateService.translateStrict(key,[args]) : this.translateService.translate(key,[args])
        }
        return strict ? this.translateService.translateStrict(key,args) : this.translateService.translate(key,args)
    }
}