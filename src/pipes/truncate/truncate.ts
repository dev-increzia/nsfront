import {Pipe, PipeTransform} from "@angular/core";

/**
 * Generated class for the TruncatePipe pipe.
 *
 * See https://angular.io/docs/ts/latest/guide/pipes.html for more info on
 * Angular Pipes.
 */
@Pipe({
    name: 'truncate',
})
export class truncate implements PipeTransform {

    transform(value: string): string {
        let newStr: string = "";
        if (value) {
            if (value.length > 125) {
                newStr = value.substring(0, 125) + '...';
            } else {
                newStr = value;
            }
        }
        return newStr;
    }
}
