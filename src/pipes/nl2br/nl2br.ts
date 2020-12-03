import {Pipe, PipeTransform} from "@angular/core";

/**
 * Generated class for the nl2br pipe.
 *
 * See https://angular.io/docs/ts/latest/guide/pipes.html for more info on
 * Angular Pipes.
 */
@Pipe({
    name: 'nl2br',
})
export class nl2br implements PipeTransform {

    transform(value: string): string {
        return value.replace(/(?:\r\n|\r|\n)/g, '<br />');

    }
}
