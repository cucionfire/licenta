import { BaseComponent } from './../base/base.component';
import { Input } from '@angular/core';
import { Component, OnInit } from '@angular/core';
import { CustomFieldsManagerService } from '../custom-fields-manager/custom-fields-manager.service';

@Component({
  selector: 'custom-fields-form',
  templateUrl: './custom-fields-form.component.html',
  styleUrls: ['./custom-fields-form.component.scss'],
  providers: [CustomFieldsManagerService]
})
export class CustomFieldsFormComponent extends BaseComponent implements OnInit {
  @Input() private entity;
  @Input() private entityKey;
  private inputs: Array<any>;
  private form = {};
  private booleanValues: Array<Object> = [{
    value: "Yes",
    name: "Yes"
  }, {
    value: "No",
    name: "No"
  }]
  constructor(private customFieldSrv: CustomFieldsManagerService) {
    super();
  }
  ngOnInit() {
    this.customFieldSrv.loadColumns(this.entity).then(data => {
      this.inputs = data;
      this.customFieldSrv.loadCustomData(this.entity, this.entityKey).then(values => {
        if (values.length > 0)
          this.form = values[0].fields;
      });
    });
  }
  save() {
    this.customFieldSrv.saveData(this.form, this.entity, this.entityKey);
  }

}
