import {Injectable, EventEmitter, OnChanges} from "@angular/core";
import {BaseHttpService} from "./base-http.service";

@Injectable()
export class FormChangesService {
    public config: Object = {
        key: "",
        form: [],
        model: []
    };
    addingNewElement: EventEmitter<Object> = new EventEmitter();

    constructor(private http: BaseHttpService) {
    }

    setGridConfig(cfg) {
        for (let x in cfg) {
            this.config[x] = cfg[x];
        }
    }
    updateModel(model){
        this.config["model"]=model;
    }

    checkDirtyInputs() {
        let dirtyInputs = [];
        let inputs = this.config['form'].form.controls;
        for (let x in inputs) {
            if (inputs[x].dirty) {
                dirtyInputs.push({
                    field: x,
                    value: inputs[x].value,
                    oldValue: this.config['model'][x]
                });
                inputs[x].markAsPristine();
            }
        }
        if (dirtyInputs.length > 0)
           this.saveDirtyInputs(dirtyInputs);
    }

    saveDirtyInputs(dirtyInputs: Array<any>) {
        let changeObj = {
            eType: "form-changes-" + this.config['key'],
            date: new Date(),
            changes: dirtyInputs
        }
        this.http.doPost('formChanges/save', 'node', changeObj).then(data => {
            this.addingNewElement.emit(data);
        });
    }

    clearChanges() {
        let changeObj = {
            eType: "form-changes-" + this.config['key']
        }
        this.http.doPost('formChanges/delete', 'node', changeObj);
    }

    getChanges() {
        return this.http.doGet('formChanges/get', 'node', {
            eType: "form-changes-" + this.config['key']
        });
    }

}
