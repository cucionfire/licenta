import {Component, OnInit, Input, EventEmitter, Output} from '@angular/core';
import {NgForm} from "@angular/forms";

@Component({
    selector: 'basic-search-inputs',
    templateUrl: './basic-search-inputs.component.html',
    styleUrls: ['./basic-search-inputs.component.scss']
})
export class BasicSearchInputsComponent implements OnInit {
    @Input() form: NgForm;
    @Output() public onfilteremit = new EventEmitter<Boolean>();

    constructor() {
    }

    run_filter() {
        this.onfilteremit.emit(true);
    }

    ngOnInit() {
        console.log(this.form);
    }

    reset() {
        this.form.reset();
    }

}
