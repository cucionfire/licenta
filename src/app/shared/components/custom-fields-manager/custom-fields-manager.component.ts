import { Output } from '@angular/core';
import { EventEmitter } from '@angular/core';
import { BaseComponent } from './../base/base.component';
import { CustomFieldsManagerService } from './custom-fields-manager.service';
import { Input } from '@angular/core';
import { Component, OnInit } from '@angular/core';
declare var $: any;
@Component({
  selector: 'custom-fields-manager',
  templateUrl: './custom-fields-manager.component.html',
  styleUrls: ['./custom-fields-manager.component.scss'],
  providers: [CustomFieldsManagerService]
})
export class CustomFieldsManagerComponent extends BaseComponent implements OnInit {
  @Input() entity;
  @Output() private onNewColumn = new EventEmitter();
  private field: Object = {
    headerName: "",
    type: "",
    field: "",
    eType: ""
  }
  private columnTypes = [{
    value: "text",
    name: "Text"
  }, {
    value: "number",
    name: "Number"
  }, {
    value: "datepicker",
    name: "Datepicker"
  }, {
    value: "boolean",
    name: "Boolean"
  }];
  constructor(private custFieldsSrv: CustomFieldsManagerService) {
    super();
  }
  save() {
    this.field['field'] = this.makeUrl(this.field['headerName']);
    if (this.is_valid()) {
      this.field['eType'] = this.entity;
      this.custFieldsSrv.save(this.field).then(data => {
        $("#customFieldsManager").modal('close');
        this.onNewColumn.emit(true);
      });
    }
  }

  is_valid() {
    return true;
  }
  openModal() {
    $("#customFieldsManager").modal('open');
  }

  ngOnInit() {
    $("#customFieldsManager").modal();
    this.entity = this.entity + "-customFields";
  }
  makeUrl(url) {

    // make the url lowercase         
    var encodedUrl = url.toString().toLowerCase();
    // remove invalid characters 
    encodedUrl = encodedUrl.split(/[^a-z0-9]/).join("_");
    // remove duplicates 
    encodedUrl = encodedUrl.split(/-+/).join("_");
    // trim leading & trailing characters 
    encodedUrl = encodedUrl.trim('_');
    return encodedUrl;
  }
}
