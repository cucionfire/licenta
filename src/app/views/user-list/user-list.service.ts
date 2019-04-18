import { Injectable } from '@angular/core';
import { BaseHttpService } from 'src/app/services/common/base-http.service';

@Injectable()
export class UserListService {

  constructor(private http: BaseHttpService) { }

  getAll(params) {
    return this.http.doPost("users/all", "java", params);
  }
  save(client) {
    return this.http.doPost("users/save", "java", client);
  }
  load(id) {
    return this.http.doGet("users/load/" + id, "java", {});
  }

}
