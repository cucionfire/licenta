import { Pipe, PipeTransform } from '@angular/core';
import { Dictio } from '../texts/texts';

@Pipe({
  name: 'i18n'
})
export class I18nPipe implements PipeTransform {
  private wordArray: any;
  transform(value: any, args?: any): any {
    //return value;
    var lang = sessionStorage.getItem("lang") || "en";
    if (!Dictio.keys['de'][value]) {
      this.addToSession(value);
    }else{

    }
    if (args === "en") {
      return value;
    }

    if (Dictio.keys[args][value])
      return Dictio.keys[args][value];
    else {
      //   this.addToSession(value);
      return value;
    }
  }

  addToSession(word) {
    if (!sessionStorage.getItem('translates')) {
      sessionStorage.setItem('translates', JSON.stringify({}));
    }
    if (!this.wordArray) {
      this.wordArray = JSON.parse(sessionStorage.getItem('translates'));
    }
    if (!this.wordArray[word]) {
      this.wordArray[word] = "";
      sessionStorage.setItem('translates', JSON.stringify(this.wordArray));
    }


  }



}
