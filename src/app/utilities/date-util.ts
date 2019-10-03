import * as moment from 'moment';
import { isNullOrUndefined } from 'util';

export class DateUtil {
    constructor() {
    }

    static parseDate(datestring: string): Date {
        if (datestring) {
            const m = moment(datestring, 'YYYYMMDD', true);
            return m.isValid() ? m.toDate() : null;
        }
        return null;
    }
    static parseArmaSv(armastring: string): Date {
        return this.parseDateWithPattern(armastring, 'YYYY-MM');
    }
    static parseArmaEng(armastring: string): Date {
        return this.parseDateWithPattern(armastring, 'MM/YYYY');
    }
    static parseArma(armaString, language: string): Date {
        if (language === 'en') {
            return this.parseArmaEng(armaString);
        } else {
            return this.parseArmaSv(armaString);
        }
    }
    static parseDateLocale(datestring: string, language: string) {
        if (language === 'en') {
            return this.parseDateEng(datestring);
        } else {
            return this.parseDateSv(datestring);
        }

    }
    static parseDateSv(datestring): Date {
        return this.parseDateWithPattern(datestring, 'YYYY-MM-DD');
    }
    static parseDateEng(datestring): Date {
        return this.parseDateWithPattern(datestring, 'DD/MM/YYYY');
    }
    static parseAnyDateType(date: string | Date | number): Date {
        if (typeof date === 'number') {
            return new Date( date as number);
        } else if (typeof date === 'string') {
            return this.parseDate( date as string);
        } else {
            return date;
        }
    }
    static formatDateWithPattern(date: Date, pattern: string): string {
        if (!date) {
            return null;
        }
        const m = moment(date);
        return m.isValid() ? m.format(pattern) : null;
    }

    static formatArmaSv(date: Date): string {
        return this.formatDateWithPattern(date, 'YYYY-MM');
    }
    static formatArmaEng(date: Date): string {
        return this.formatDateWithPattern(date, 'MM/YYYY');
    }
    static parseDateWithPattern(dateString: string, pattern: string): Date {
        if (dateString) {
            const m = moment(dateString, pattern, true);
            return m.isValid() ? m.toDate() : null;
        }
        return null;

    }

    static parseDateTime(datestring: string): Date {
        if (datestring) {
            return moment(datestring, 'YYYYMMDDHHmmssSSS').toDate();
        }
        return null;
    }

    static parseDateTimeAsString(datestring: any): string {
        if (datestring) {
            return moment(datestring).format('YYYY-MM-DD HH:mm:ss');
        }
        return null;
    }

    static parseDateTimeAsStringEng(datestring: any): string {
        if (datestring) {
            return moment(datestring).format('DD/MM/YYYY HH:mm:ss');
        }
        return null;
    }
    // comparing dates,ignoring hours
    static isSameOrBefore(firstDate: Date, secondDate: Date) {

        return moment(firstDate).isSameOrBefore(secondDate, 'year')
            && moment(firstDate).isSameOrBefore(secondDate, 'month')
            && moment(firstDate).isSameOrBefore(secondDate, 'day');
    }
    // comparing dates,ignoring hours
    static isSameOrAfter(firstDate: Date, secondDate: Date) {
        return moment(firstDate).isSameOrAfter(secondDate, 'year')
            && moment(firstDate).isSameOrAfter(secondDate, 'month')
            && moment(firstDate).isSameOrAfter(secondDate, 'day');
    }

    static compareDateAsNumber(d1: number, d2: number): number {

        if (d1 === d2) { return 0; }

        if (d1 > d2) { return 1; }

        if (d1 < d2) { return -1; }
    }

    static dbFormat(date: any): string {
        if (date) {
            return moment(date).format('YYYYMMDD');
        }
        return null;
    }

    static displayFormat(datestring: any): string {
        if (datestring) {
            return moment(datestring).format('YYYY-MM-DD');
        }
        return null;
    }

    static displayFormatEng(datestring: any): string {
        if (datestring) {
            return moment(datestring).format('DD/MM/YYYY');
        }
        return null;
    }
    static displayFormatArma(armastring:string): string {
        if (armastring) {
            return armastring.substring(0,4) + "-" + armastring.substring(4,6);
        }
        return null;
    }
    static displayFormatArmaEng(armastring:string): string {
        if (armastring) {
            return armastring.substring(4,6) + "/" + armastring.substring(0,4);
        }
        return null;
    }

    static convertToSvFormat(datestring: any): string {
        if (datestring) {
            return moment(datestring, 'DD/MM/YYYY').format('YYYY-MM-DD');
        }
        return null;
    }

    static convertToEngFormat(datestring: any): string {
        if (datestring) {
            return moment(datestring, 'YYYY-MM-DD').format('DD/MM/YYYY');
        }
        return null;
    }

    static setInclusiveTimePart(date: any): Date {
        if (date) {
            return moment(date).hour(23).minute(59).second(59).millisecond(999).toDate();
        }
        return null;
    }
    static armaFormatter(arma: Date): string {
        const tmp = arma.toISOString();
        const year = tmp.substring(0, 4);
        const month = tmp.substring(5, 7);
        const armaString = year + month;
        return armaString;
    }
    static dateFormatter(date: Date, language: string, useSep: boolean): string {
        let sep = '';
        if (useSep) {
            if (language === 'en') {
                sep = '/';
            } else {
                sep = '-';
            }

        }
        const tmp = moment(date).format('YYYYMMDD');
        const year = tmp.substring(0, 4);
        const month = tmp.substring(4, 6);
        const day = tmp.substring(6, 8);
        let dateString = year + sep + month + sep + day;
        if (language === 'en') {
            dateString = day + sep + month + sep + year;
        }
        return dateString;
    }
    static areDatesEqual(a: Date, b: Date) {
        if (a instanceof Date && b instanceof Date) {
            return a.getTime() === b.getTime();
        } else {
            return a === b;
        }
    }
    static displayFormatLang(datestring: any, language: string, detail?: boolean) {
        if (detail) {
            return language === 'en' ? DateUtil.parseDateTimeAsStringEng(datestring) : DateUtil.parseDateTimeAsString(datestring);
        } else{
            return language === 'en' ? DateUtil.displayFormatEng(datestring) : DateUtil.displayFormat(datestring);
        }
    }
    // IE och Edge-workaround (problem vid UTC-offset vintertid)
    static formToFilter(date: Date) {
        let newDate: Date;
        if (isNullOrUndefined(date)) {
            return null;
        } else {
            newDate = new Date(date.getTime());
            newDate.setHours(date.getHours() + 1);
        }
        return newDate;
    }

    static isPnrDateValid(fullYear:number,month:number,day:number):boolean{
        //not accepting too early dates or definite invalid months or days
        if(!(fullYear >=1900  && month >=0 && month <=12 && day >=0 && day<=91)){
            return false
        }
        
        day = day % 60
        month -=1;
        const date:Date = new Date(fullYear,month,day)
        const today = new Date()
        //not accepting invalid dates
        if(date.getFullYear() != fullYear || date.getMonth()  != month || date.getDate() != day){
            return false;
        }
        //not accepting future dates
        if(!DateUtil.isSameOrBefore(date,today)){
            return false
        }
        return true
    }
    public static getDate(date: Date | moment.Moment | string | number ):Date{
        if(date || date ===0){
            if (moment.isMoment(date)){
                return date.toDate()
            }
            else{
                return new Date(date)
            }
        }
        return null
    }
}
