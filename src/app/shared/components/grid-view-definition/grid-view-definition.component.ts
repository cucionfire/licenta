import {Component, OnInit, Output, EventEmitter} from "@angular/core";
import {Input} from "@angular/core/src/metadata/directives";
import {GridViewDefinitionService} from "./grid-view-definition.service";

@Component({
    selector: 'grid-view-definition',
    templateUrl: './grid-view-definition.component.html',
    styleUrls: ['./grid-view-definition.component.scss'],
    providers: [GridViewDefinitionService]
})
export class GridViewDefinitionComponent implements OnInit {
    @Input() entity;
    @Input() configuration;
    @Output() onChangeView = new EventEmitter();
    @Output() onGetColumns = new EventEmitter();
    views: Array<any>;
    selectedView: Object = {};
    canBeSaved: Boolean = false;
    viewForSave = {
        name: "",
        colConfig: [],
        eType: "",
        profile_id: 1
    };

    constructor(private gridViewService: GridViewDefinitionService) {
    }

    onGetViewsFinish(data) {
        this.views = data;
        this.addStandardView();
    }

    addStandardView() {
        this.gridViewService.getStandardView().then(data=>this.onAddStandardViewFinish(data));
    }

    onAddStandardViewFinish(data) {
        this.views.unshift(data);
        this.selectedView = this.views[0];
    }

    changeView(item) {
        console.log(item);
        this.selectedView = item;
        this.onChangeView.emit(item);
    }

    saveView(viewName) {
        this.viewForSave.name = viewName;
        this.viewForSave.eType = this.entity + "-list-view";
        this.onGetColumns.emit();
    }

    public onSave(columns) {
        this.viewForSave.colConfig = columns;
        this.gridViewService.save(this.viewForSave).then(data=>this.views.push(data));
    }

    ngOnInit() {
        this.gridViewService.setEntity(this.entity);
        this.gridViewService.getViews().then(viewsResults=>this.onGetViewsFinish(viewsResults));
    }

}
