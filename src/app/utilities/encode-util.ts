import { DateUtil } from './date-util';

export class EncodeUtil {
    constructor() {
    }

    static encodeData(data, prefix) {
        return Object.keys(data).map(function (key) {
            if (data[key] instanceof Date)
                return prefix + [key, DateUtil.dbFormat(data[key])].map(encodeURIComponent).join("=");
            return prefix + [key, data[key]].map(encodeURIComponent).join("=");
        }).join("&");
    }
}
