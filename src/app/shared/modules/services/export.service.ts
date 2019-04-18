import {Injectable} from '@angular/core';
import {BaseHttpService} from "./base-http.service";

@Injectable()
export class ExportService {
    private _formats: Array<Object>;
    private _layouts: Array<Object>;
    private _config:Object;
    private exportObj = {
        "title": "",
        "exportFormat": "",
        "layoutType": "",
        "method": "doExport",
        "sectionRequestList": [
            {
                "title": "",
                "layoutType": "",
                "hideQueryParameters": false,
                "columns": [],
                "sorters": [],
                "filters": [],
                "params": [],
                "entityName": "",
                "controller": ""
            }
        ]
    };

    constructor(private http: BaseHttpService) {
        this._layouts = [
            {id: 'landscape', code: 'landscape', name: 'LANDSCAPE', description: 'LANDSCAPE'},
            {id: 'portrait', code: 'portrait', name: 'PORTRAIT', description: 'PORTRAIT'}
        ];
        this._formats = [
            {id: 'pdf', code: 'pdf', name: 'PDF', description: 'PDF'},
            {id: 'xls', code: 'xls', name: 'XLS', description: 'XLS'},
            {id: 'doc', code: 'doc', name: 'DOC', description: 'DOC'},
            {id: 'csv', code: 'csv', name: 'CSV', description: 'CSV'},
            {id: 'html', code: 'html', name: 'HTML', description: 'HTML'}
        ];

    }

    get formats(): Array<Object> {
        return this._formats;
    }

    get layouts(): Array<Object> {
        return this._layouts;
    }
    set config(value: Object) {
        this._config = value;
    }

    export(values) {
        this.exportObj.title = this.exportObj.sectionRequestList[0].title = values.title;
        this.exportObj.exportFormat = values.format;
        this.exportObj.layoutType = this.exportObj.sectionRequestList[0].layoutType = values.layout;
        this.exportObj.sectionRequestList[0].entityName = values.entityName;
        this.exportObj.sectionRequestList[0].controller = values.controller;
        this.exportObj.sectionRequestList[0].columns = this.prepareColumnsExport(values.columns);
        this.exportObj.method = "doExport";
     return this.send_report();
    }

    send_report() {
        return this.http.doPost(this._config['requestUrl'], 'java', this.exportObj.sectionRequestList[0]);
    }

    prepareColumnsExport(columns) {

        let newColumns = [];
        columns.forEach(data => {
            let temp = {
                "name": data.field,
                "label": data.headerName,
                "align": "left",
                "width": data.width,
                "type": "string",
                "format": "null"
            }
            newColumns.push(temp);

        });
        return newColumns;
    }
}
