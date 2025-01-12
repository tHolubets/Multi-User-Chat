import { DatePipe } from '@angular/common';
import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
    name: 'dateFormat',
    standalone: true
})
export class DateFormatPipe implements PipeTransform {

    constructor(private datePipe: DatePipe) { }

    transform(value: number[]): string | null {
        if (Array.isArray(value) && value.length === 7) {
            const date = new Date(Date.UTC(value[0], value[1] - 1, value[2], value[3], value[4], value[5], value[6] / 1000));
            return this.datePipe.transform(date, 'short');
        }
        return null;
    }
}
