import { Injectable } from '@angular/core';
import { BaseHttpService } from '../shared/modules/services/base-http.service';

@Injectable()
export class ReportsService {

    constructor(private http: BaseHttpService) {
    }

    getAll(params) {
        return this.http.doPost("report/all", "java", params);
    }

    getColumns() {
        return this.http.doGet("json/columns/report.json", "local", {});
    }

    save(client) {
        return this.http.doPost("report/save", "java", client);
    }
    load(id) {
        return this.http.doGet("report/load/" + id, "java", {});
    }

}
