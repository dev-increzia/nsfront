import {Pipe, PipeTransform} from "@angular/core";
import * as Autolinker from "autolinker";

/**
 * Generated class for the LinkreplacePipe pipe.
 *
 * See https://angular.io/docs/ts/latest/guide/pipes.html for more info on
 * Angular Pipes.
 */
@Pipe({
    name: 'linkreplace',
})
export class LinkreplacePipe implements PipeTransform {
    /**
     * Takes a value and makes it lowercase.
     */
    transform(value: string, options?: any): string {
        return Autolinker.link(value, options);
    }
}
