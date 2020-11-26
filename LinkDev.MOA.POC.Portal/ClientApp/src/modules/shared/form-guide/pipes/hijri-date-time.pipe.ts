import { Pipe, PipeTransform } from "@angular/core";
import { DateModel } from '../models/date-model';
import { DateTime } from '../models/date-time';


let ARABIC_MONTHS = ['محرم', 'صفر', 'ربيع الأول', 'ربيع الآخر', 'جمادى الأولى', 'جمادى الآخرة', 'رجب', 'شعبان', 'رمضان', 'شوال',
    'ذو القعدة', 'ذو الحجة'];

const ENGLISH_MONTHS = ['Muharram', 'Safar', 'Rabi I', 'Rabi II', 'Jumada I', 'Jumada II', 'Rajab',
    'Shaaban', 'Ramadan', 'Shawwal', 'Dhu al-Qidah', 'Dhu al-Hijjah'];

declare var _spPageContextInfo;


@Pipe({ name: 'hijriDateTime' })
export class HijriDateTimePipe implements PipeTransform {
    constructor() { }

    transform(dateTime: DateTime) {
        if (dateTime.date == null || dateTime.date == undefined)
            return;

        let result: string = '';

        if (_spPageContextInfo.currentLanguage == 1033 || _spPageContextInfo.currentLanguage == 1036) {

            result = dateTime.date.day.toString() + ' ' + ENGLISH_MONTHS[dateTime.date.month - 1] + ' ' + dateTime.date.year + ' ';

        } else {
            result = dateTime.date.day.toString() + ' ' + ARABIC_MONTHS[dateTime.date.month - 1] + ' ' + dateTime.date.year + ' ';
        }

        if (dateTime.time.hour < 10) {
            result += "0";
            result += dateTime.time.hour.toString();
        } else {
            result += dateTime.time.hour.toString();
        }

        result += ':';

        if (dateTime.time.minute < 10) {
            result += "0";
            result += dateTime.time.minute.toString();
        } else {
            result += dateTime.time.minute.toString();
        }

        return result;

    }
}
