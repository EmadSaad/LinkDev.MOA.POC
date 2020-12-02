import { Pipe, PipeTransform, Renderer2 } from "@angular/core";

@Pipe({ name: "truncate" })
export class TruncatePipe implements PipeTransform {

    constructor(private renderer: Renderer2) {

    }

    transform(value: string, positionTruncateChar: number): string {

        let tempPosition = positionTruncateChar;
        if(value){
            if (positionTruncateChar < 0) {
                return value;
            }
            else {

                if (value.length < positionTruncateChar) {
                    return value;
                }
                else {
                    while (value.charAt(positionTruncateChar) != ' ' && positionTruncateChar > 0) {
                        positionTruncateChar--;
                    }
                    if (positionTruncateChar == 0) {
                        //const span = this.renderer.createElement('span');
                        //const text = this.renderer.createText('Read More');
                        //this.renderer.appendChild(span, text);
                        return value.substring(0, tempPosition) + "...." ;
                    }
                    else {
                        return value.substring(0, positionTruncateChar) + "...";
                    }
                }
            }
        }
        else
        {
            return value;
        }
    }
}
