import {Component, OnInit, Input, OnChanges} from '@angular/core';
import {BaseComponent} from "../base/base.component";
import { FormChangesService } from '../../modules/services/form-changes.service';
declare var $: any;
@Component({
    selector: 'form-changes',
    templateUrl: './form-changes.component.html',
    styleUrls: ['./form-changes.component.scss'],
    providers: [FormChangesService]
})
export class FormChangesComponent extends BaseComponent implements OnInit,OnChanges {
    @Input() private form;
    @Input() private key;
    @Input() private model;
    public formChanges: Array<any> = [];

    constructor(private formCh: FormChangesService) {
        super();

    }

    checkDirty() {
        this.formCh.checkDirtyInputs();
    }

    getLabel(field) {
        let label = $("[name='" + field + "']").siblings('label').html();
        if(!label){
            label = $("[name='" + field + "'] label").html();
        }
        return label;
    }

    ngOnChanges(changes) {
        if (changes.model) {
            if (changes.model.currentValue)
                this.formCh.updateModel(changes.model.currentValue);
        }
        if (changes.key) {
            this.formCh.setGridConfig({
                key: this.key,
                form: this.form,
                model: this.model
            });
            this.formCh.getChanges().then(data => this.formChanges = data);
        }
    }

    ngOnInit() {
        this.formCh.addingNewElement.subscribe(data => {
            this.formChanges.unshift(data);
        })
        // this.formCh.clearChanges();
    }
}
