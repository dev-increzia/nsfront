import {Pipe, PipeTransform} from "@angular/core";

/**
 * Generated class for the capitalize pipe.
 *
 * See https://angular.io/docs/ts/latest/guide/pipes.html for more info on
 * Angular Pipes.
 */
@Pipe({
    name: 'capitalize',
})
export class Capitalize implements PipeTransform {

    transform(value: any) {

        if (value) {
                return value.charAt(0).toUpperCase() + value.slice(1);
        }

        return value;
    }
}