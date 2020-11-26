import { PipeTransform, Pipe } from '@angular/core';
@Pipe({
  name: 'filterBy',
  pure: false
})
export class FilterByPipe implements PipeTransform {
  transform(items: any[], key: any, value: any, args?: any[]): any {
    if (!key || value == undefined || value == null || value == 'null') {
      return items;
    }
    else {
      if (items) {
        return items.filter(item => item[key] == value);
      }
      else {
        return [];
      }
    }
  }

}
