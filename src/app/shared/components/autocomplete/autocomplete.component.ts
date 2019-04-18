import {Component, OnInit, Input, forwardRef} from "@angular/core";
import {AutocompleteService} from "./autocomplete.service";
import {NG_VALUE_ACCESSOR, ControlValueAccessor, FormControl} from "@angular/forms";
import { debounceTime } from 'rxjs/operators';
import "rxjs";
const noop = () => {
};
export const CUSTOM_INPUT_CONTROL_VALUE_ACCESSOR: any = {
    provide: NG_VALUE_ACCESSOR,
    useExisting: forwardRef(() => AutocompleteComponent),
    multi: true
};
@Component({
    selector: 'autocomplete',
    templateUrl: './autocomplete.component.html',
    styleUrls: ['./autocomplete.component.scss'],
    providers: [AutocompleteService, CUSTOM_INPUT_CONTROL_VALUE_ACCESSOR]
})
export class AutocompleteComponent implements OnInit,ControlValueAccessor {
    @Input() entity;
    @Input() private selectedItem;
    @Input() private label;
    term = new FormControl();
    private onTouchedCallback: () => void = noop;
    private onChangeCallback: (_: any) => void = noop;
    private results: Array<any> = [];
    private searchText: any;
    private showManager = false;
    private autoCompleteObj: Object = {};
    private entityAllItems: Array<any> = [];
    private showDropdownSearch = false;
    public newItem = {};
    private preventInputWatch = false;


    constructor(private autoServ: AutocompleteService) {
        this.term.valueChanges.pipe(
            debounceTime(400))
            .subscribe(term => {
                if (!this.preventInputWatch) {
                    if (term != this.searchText && term != '') {
                        this.search(term);
                    }
                } else {
                    this.preventInputWatch = false;
                }
            });
    }

    writeValue(value: any) {
        let v;
        this.showDropdownSearch = false;
        this.preventInputWatch = true;
        if ((value !== this.searchText) && value && Object.keys(this.autoCompleteObj).length > 0) {
            if (value == "") {
                value = {};
            }
            this.searchText = value;
            if (this.autoCompleteObj["return"] == '*' || this.autoCompleteObj["return"] == '') {
                v = value;
            } else {
                var splitted = this.autoCompleteObj["return"].split('.');
                splitted.filter(function (item) {
                    v = value[item];
                });
            }
            this.onChangeCallback(v);
        }
    }

    get value(): any {
        //return this.searchText;
        if (this.searchText && Object.keys(this.autoCompleteObj).length != 0) {
            if (this.searchText[this.autoCompleteObj["select"]["label"]]) {
                return this.searchText[this.autoCompleteObj["select"]["label"]];
            }
        }
        return this.searchText;
    };

    registerOnChange(fn: any) {
        this.onChangeCallback = fn;
    }

    //From ControlValueAccessor interface
    registerOnTouched(fn: any) {
        this.onTouchedCallback = fn;
    }

    ngOnInit() {
        this.autoServ.setEntity(this.entity);
        ////@todo  move on manage() and execute just if results=[]
        this.autoServ.getFields().then(fields=> {
            this.autoCompleteObj = fields;
            if (this.selectedItem) {
                this.loadEntity();
            }
        });
    }

    loadEntity() {
        this.autoServ.search(this.selectedItem).then(results=> {
            this.writeValue(results[5]);
        });

    }

    cancel() {
        this.showManager = false;
        this.newItem = {};
    }

    saveItem() {
        this.showManager = !this.showManager;
        this.autoServ.save(this.newItem).then(it=> {
            this.results.push(it);
            this.newItem = {};
            this.showDropdownSearch = true;
        });
    }

    search(searchText?) {
        this.showDropdownSearch = true;
        this.autoServ.search(searchText).then(results=> {
            if (searchText)
                this.results = results;
            else
                this.entityAllItems = results;
        });

    }

    manage() {
        this.showManager = !this.showManager;
    }


}
