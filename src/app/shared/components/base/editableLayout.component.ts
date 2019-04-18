import {OnInit} from "@angular/core";
import { BaseHttpService } from '../../modules/services/base-http.service';
declare var $: any;
export class EditableLayout implements OnInit {
    private editing: Boolean = false;
    public layout = {
        config: []
    };
    private templates: Array<any>;
    private entity: string;
    public views: Array<any>;

    constructor(public http: BaseHttpService) {

    }
    setEntity(entity) {
        this.entity = entity;
        this.getTemplates();

    }
    getStandard() {
        this.http.doGet('json/layout/standard/' + this.entity + ".json", 'local', {}).then(standard=> {
            this.views.unshift(standard);
            this.layout = standard;
        });
    }
    getTemplates() {
        this.http.doGet('json/layout/templates/' + this.entity + ".json", 'local', {}).then(templates=> {
            this.templates = templates;
            this.getlayouts();
        });
    }

    setConfig(config: any) {
        console.log(config.config);
        this.layout = config.config;
        this.templates = config.availableTpls;
        this.entity = config.entity;
    }

    addWidget(widget, col, row) {
        this.layout.config[row].cols[col].widgets.push(widget);
    }
    getAvailableTpl() {
        if (!this.templates) {
            return [];
        }
        var available = [];
        for (var i = 0; i < this.templates.length; i++) {
            var template = this.templates[i];
            if (JSON.stringify(this.layout.config).includes(JSON.stringify(template))) {
            } else {
                available.push(template);
            }
        }
        return available;
    }

    getlayouts() {
        this.http.doGet('layout', 'node', {
            entity: this.entity + '-layout',
            profile_id: 1
        }).then(views=> {
            this.views = views;
            this.getStandard();
        });

    }

    changelayout(item) {
        this.layout = item;
    }

    deleteLayout(layout) {
        this.http.doDelete('layout/' + layout._id, 'node', {}).then(result=> {
            this.getlayouts();
        });
    }

    saveLayout(name) {
        var view = {
            entity: this.entity + '-layout',
            name: name,
            config: this.layout.config,
            profile_id: 1
        }
        this.http.doPost('entity', 'node', view).then(layout=>{
            this.views.push(layout);
            this.layout=layout;
            this.editing=false;
        });

    }

    addColumn(index) {
        this.layout.config[index].cols.push({widgets: []});
        setTimeout(function () {
            $('.dropdown-button').dropdown();
        }, 500);

    }

    deleteRow(index) {
        this.layout.config.splice(index, 1);
    }

    moveUp(index) {
        this.layout.config = this.arraymove(this.layout.config, index, index - 1);
    }

    moveDown(index) {
        this.layout.config = this.arraymove(this.layout.config, index, index + 1);
    }

    moveLeft(rowIndex, colIndex) {
        this.layout.config[rowIndex].cols = this.arraymove(this.layout.config[rowIndex].cols, colIndex, colIndex - 1);
    }

    moveRight(rowIndex, colIndex) {
        this.layout.config[rowIndex].cols = this.arraymove(this.layout.config[rowIndex].cols, colIndex, colIndex + 1);
    }

    deleteCol(rowIndex, colIndex) {
        this.layout.config[rowIndex].cols.splice(colIndex, 1);
        setTimeout(function () {
            $('.dropdown-button').dropdown();
        },500);
    }
    ngOnInit() {
    }
    arraymove(ar, fromIndex, toIndex) {
        var element = ar[fromIndex];
        ar.splice(fromIndex, 1);
        ar.splice(toIndex, 0, element);
        return ar;
    }
}
// var available = [];
// var found = false;
// for (var i = 1; i <= this.templates.length; i++) {
//     found=true;
//     var template = this.templates[i];
//     for (var j = 1; j <= this.layout.config.length; j++) {
//         var cols = this.layout.config[j];
//         console.log(cols,this.layout.config);
//         for (var k = 1; k <= cols.length; k++) {
//             var widgets = cols[k];
//             for (var m = 1; m <= widgets.length; m++) {
//                 var widget = widgets[m];
//                 if(JSON.stringify(widget)==JSON.stringify(template)){
//                     found=true;
//                     break
//                 }
//
//             }
//             if (found) {
//                 break;
//             }
//         }
//     }
//     if(!found){
//         available.push(template)
//     }
// }
// console.log(available);

