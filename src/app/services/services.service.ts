import { Injectable } from '@angular/core';
import { BaseHttpService } from './common/base-http.service';

@Injectable()
export class ServicesService {

    constructor(private http: BaseHttpService) {
    }

    getAll(params) {
        return this.http.doPost("services/all", "java", params);
    }

    getColumns() {
        return this.http.doGet("json/columns/services.json", "local", {});
    }

    save(services) {
        return this.http.doPost("services/save", "java", services);
    }
    load(id) {
        return this.http.doGet("services/load/" + id, "java", {});
    }

}
