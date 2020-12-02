import { Pipe, PipeTransform } from "@angular/core";


@Pipe({ name: "split" })
export class SplitPipe implements PipeTransform {

    constructor() {

    }

    transform(value: string, charater:string): Array<string> {
        let array =new  Array<string>();
        let temp = new Array<string>();
        if(value!=null && value.trim()!="")
        {
            temp = value.split(charater);
            for(let i =0;i<temp.length;i++)
            {
                if(temp[i]!=null && temp[i].trim()!="")
                {
                   array.push(temp[i]);
                }
            }
        }
        else
        {
            array.push(value);
        }
        return array;

    }
}