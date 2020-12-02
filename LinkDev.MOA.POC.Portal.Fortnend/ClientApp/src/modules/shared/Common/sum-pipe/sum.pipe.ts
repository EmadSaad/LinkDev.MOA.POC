import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'sum'
})
export class SumPipe implements PipeTransform {

  transform(items: number[]): number {
    return items.reduce((a, b) => (a ? Number(a) : 0) + (b ? Number(b): 0), 0);
  }

}
