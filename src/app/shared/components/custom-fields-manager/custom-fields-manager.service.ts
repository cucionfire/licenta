 import { Injectable } from '@angular/core';
import { BaseHttpService } from '../../modules/services/base-http.service';

@Injectable()
export class CustomFieldsManagerService {

  constructor(private http: BaseHttpService ) { }
  save(field) {
    return this.http.doPost('custom-fields/save', 'node', field);
  }
  loadColumns(entity) {
    return this.http.doGet('custom-fields/get', 'node', { eType: entity + "-customFields" });
  }
  loadCustomData(entity, entityKey) {
    return this.http.doGet('custom-fields-values/get', 'node', {
      eType: entity + "-customFields-values",
      eTypeKey: entityKey,
    });
  }
  saveData(data, entity, entityKey) {
    return this.http.doPost('custom-fields-values/save', 'node', {
      eType: entity + "-customFields-values",
      eTypeKey: entityKey,
      fields: data
    });

  }

}

