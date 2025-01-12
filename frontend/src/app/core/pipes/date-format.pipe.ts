import { DatePipe } from '@angular/common';
import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
    name: 'dateFormat',
    standalone: true
})
export class DateFormatPipe implements PipeTransform {

    constructor(private datePipe: DatePipe) { }

    transform(value: string): string | null {
        if (!isNaN(Date.parse(value))) {
            const date = new Date(value);
            return this.datePipe.transform(date, 'M/d/yy, h:mm:ss a');
        }
        return null;
    }
}
