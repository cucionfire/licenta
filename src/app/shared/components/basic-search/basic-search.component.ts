import {Component, OnInit, Input, EventEmitter, OnChanges} from '@angular/core';
import {Output} from "@angular/core/src/metadata/directives";
import {BaseComponent} from "../base/base.component";

@Component({
  selector: 'basic-search',
  templateUrl: './basic-search.component.html',
  styleUrls: ['./basic-search.component.scss']
})
export class BasicSearchComponent extends BaseComponent implements OnInit,OnChanges {
  @Input() columns ;
  @Output() basicComponentFilter = new EventEmitter();
  filters={};
  constructor() {
      super()
  }
  ngOnInit() {}
  ngOnChanges(changes){
      if(changes.columns.currentValue){
          let columns = changes.columns.currentValue;
          columns.forEach(function(value,key){
              if(value.showInFilter===false){
                  columns.splice(key,1);
              }

          })

      }
  }
  filter(){
    this.basicComponentFilter.emit(this.filters);
  }
  reset(){
      this.basicComponentFilter.emit({});
  }

}
