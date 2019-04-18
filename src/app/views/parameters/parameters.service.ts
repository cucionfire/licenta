import { Injectable } from '@angular/core';
import { BaseHttpService } from 'src/app/services/common/base-http.service';

@Injectable()
export class ParametersService {

  constructor(private http: BaseHttpService) {
  }
  loadParams() {
    return this.http.doGet("parameters/load", "java", {});
  }
  save(p) {
    return this.http.doPost("parameters/save", "java", {
      "ParameterID": p["ParameterID"],
      "Value": JSON.stringify(p['Value'])
    });
  }

}
