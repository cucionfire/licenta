import {Component, OnInit, Input} from '@angular/core';
import {BaseComponent} from "../base/base.component";
import { ExportService } from '../../modules/services/export.service';
declare var $: any;
@Component({
    selector: 'export-modal',
    templateUrl: './export-modal.component.html',
    styleUrls: ['./export-modal.component.scss'],
    providers: [ExportService]
})
export class ExportModalComponent extends BaseComponent implements OnInit {
    @Input() private views;
    @Input() private config;
    private formats: Array<Object>;
    private layouts: Array<Object>;

    constructor(private exportService: ExportService) {
        super();
        this.formats = exportService.formats;
        this.layouts = exportService.layouts;
    }

    ngOnInit() {
        this.exportService.config=this.config;
        $('#exportModal').modal();
    }

    open() {
        $('#exportModal').modal('open');
    }

    close() {
        $('#exportModal').modal('close');
    }

    export(values) {
        values.title = this.config.title;
        values.entityName = this.config.entityName;
        values.controller = this.config.controller;
        if (this.config.noGridViews) {
            values.columns = this.views;
        }
        else {
            if (values.columns == "visible")
                values.columns = this.views.selectedView.colConfig;
            else
                values.columns = this.views.views[0].colConfig;
        }
        this.exportService.export(values);
    }
}
