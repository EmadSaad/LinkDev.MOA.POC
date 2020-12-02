import { Pipe, PipeTransform } from "@angular/core";
import { DateModel } from '../models/date-model';


let ARABIC_MONTHS = ['محرم', 'صفر', 'ربيع الأول', 'ربيع الآخر', 'جمادى الأولى', 'جمادى الآخرة', 'رجب', 'شعبان', 'رمضان', 'شوال',
    'ذو القعدة', 'ذو الحجة'];

const ENGLISH_MONTHS = ['Muharram', 'Safar', 'Rabi I', 'Rabi II', 'Jumada I', 'Jumada II', 'Rajab',
    'Shaaban', 'Ramadan', 'Shawwal', 'Dhu al-Qidah', 'Dhu al-Hijjah'];

declare var _spPageContextInfo;

@Pipe({ name: 'hijriDate' })
export class HijriDatePipe implements PipeTransform {
    constructor() { }

    transform(date: DateModel) {
        if (date == null || date == undefined)
            return;

        let result: string = '';

        if (_spPageContextInfo.currentLanguage == 1033 || _spPageContextInfo.currentLanguage == 1036) {

            result = date.day.toString() + ' ' + ENGLISH_MONTHS[date.month - 1] + ' ' + date.year;

        } else {
            result = date.day.toString() + ' ' + ARABIC_MONTHS[date.month - 1] + ' ' + date.year;
        }

        return result;

    }
}
