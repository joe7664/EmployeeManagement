import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'dateFormatter'
})
export class DateFormatterPipe implements PipeTransform {

  transform(value: unknown, ...args: unknown[]): unknown {
    let dat = new Date(value as string)
    return dat.toDateString();
  }

}
