import { Pipe, PipeTransform } from '@angular/core';
import { Moment } from 'moment';

@Pipe({
  name: 'filterByPermitDate'
})
export class FilterByPermitDatePipe implements PipeTransform {

  transform(items: any[], key: any, value: Moment, args?: any[]): any {
    if (!key || value == undefined || value == null) {
      return items;
    }
    else {
      if (items) {
        let typeOfDate = typeof(value);
        if (typeOfDate === "string")
          return items.filter(item => (new Date(item["EndDate"]) >=  new Date(value.toString())) && (new Date(value.toString())>= new Date(item["StartDate"])))
        else
          return items.filter(item => (new Date(item["EndDate"]) >=  value.toDate()) && (value.toDate() >= new Date(item["StartDate"])))

      }
      else {
        return [];
      }
    }
  }

}


