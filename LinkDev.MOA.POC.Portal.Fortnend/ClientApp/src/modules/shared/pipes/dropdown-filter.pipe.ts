import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'dropdownFilter'
})
export class DropdownFilterPipe implements PipeTransform {

  transform(value: any, args?: any): any {
    return null;
  }

}
