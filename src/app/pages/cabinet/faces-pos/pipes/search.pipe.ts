import { Pipe, PipeTransform } from '@angular/core';
import {IFaceInterface} from "../../interfaces/face.interface";

@Pipe({
  name: 'search'
})
export class SearchPipe implements PipeTransform {

  transform(items: IFaceInterface[], searchTxt: string): any[] {
    if(!items || !items.length) {
      return items;
    }
    if(!searchTxt || !searchTxt.length) {
      return items;
    }
    return items.filter(item => {
      return item.fullName.toString().toLowerCase().indexOf(searchTxt.toLowerCase()) > -1
        || item.institute.toString().toLowerCase().indexOf(searchTxt.toLowerCase()) > -1
        || item.birthday.toString().toLowerCase().indexOf(searchTxt.toLowerCase()) > -1
    });
  }
}
