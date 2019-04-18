import { Injectable } from '@angular/core';
import { BaseHttpService } from './common/base-http.service';

@Injectable()
export class RoleService {

    constructor(private http: BaseHttpService) {
    }

    getAll(params) {
        return this.http.doPost("role/all", "java", params);
    }

    getColumns() {
        return this.http.doGet("json/columns/role.json", "local", {});
    }

    save(client) {
        return this.http.doPost("role/save", "java", client);
    }
    load(id) {
        return this.http.doGet("role/load/" + id, "java", {});
    }

}
