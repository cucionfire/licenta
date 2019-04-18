import { Injectable } from '@angular/core';
import { BaseHttpService } from './common/base-http.service';

@Injectable()
export class ClientService {

    constructor(private http: BaseHttpService) {
    }

    getAll(params) {
        return this.http.doPost("clients/all", "java", params);
    }

    getColumns() {
        return this.http.doGet("json/columns/clients.json", "local", {});
    }

    save(client) {
        return this.http.doPost("clients/save", "java", client);
    }
    load(id) {
        return this.http.doGet("clients/load/" + id, "java", {});
    }

}
