import {Pipe, PipeTransform, Injectable} from '@angular/core';
import {DatePipe} from '@angular/common';

@Pipe({
  name: 'dateFilter'
})
@Injectable()
export class DateFilterPipe implements PipeTransform {

  constructor(private datePipe: DatePipe) {
  }

  transform(value: any, format?: string): any {
    if (!value) {
      return '';
    }
    format = format || 'short';
    return value && typeof(value) === 'object' ? this.datePipe.transform(value, format) : '';


  }

}
