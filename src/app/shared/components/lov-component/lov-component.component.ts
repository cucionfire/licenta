import { Component, OnInit, Input, forwardRef, OnChanges, Output, EventEmitter } from '@angular/core';
import { FormControl, NG_VALUE_ACCESSOR, ControlValueAccessor, Validator, Validators } from "@angular/forms";
import { AutocompleteComponent } from "../autocomplete/autocomplete.component";
import { BaseHttpService } from 'src/app/services/common/base-http.service';
import { debounceTime } from 'rxjs/operators';

export const CUSTOM_INPUT_CONTROL_VALUE_ACCESSOR: any = {
    provide: NG_VALUE_ACCESSOR,
    useExisting: forwardRef(() => LovComponent),
    multi: true
};
@Component({
    selector: 'lov-component',
    templateUrl: './lov-component.component.html',
    styleUrls: ['./lov-component.component.scss'],
    providers: [CUSTOM_INPUT_CONTROL_VALUE_ACCESSOR]
})
export class LovComponent implements OnInit, ControlValueAccessor, OnChanges {
    @Input() private identifier;
    @Input() private returnValue;
    @Input() private displayedValue;
    @Input() private label;
    @Input() private size;
    @Input() private local;
    @Input() private params;
    @Input() private required;
    @Output() onSelectItem = new EventEmitter();
    private term: FormControl;
    private preventInputWatch = true;
    private onTouchedCallback: () => {};
    private onChangeCallback: (_: any) => {};
    private results: Array<any> = [];
    private selectedItem;

    constructor(private http: BaseHttpService) {

    }

    writeValue(v) {
        //console.log(v,'vv');
        if (v !== null) {
            this.selectedItem = v;
            this.preventInputWatch = true;
            this.term.setValue(v);
            this.onChangeCallback(v);
        }


    }

    getDisplayKeysArray() {
        return this.displayedValue.split(',');
    }

    display(item) {
        let displayedValue = this.getDisplayKeysArray();
        let stringArray = [];
        displayedValue.forEach(data => {
            stringArray.push(item[data]);
        });
        return stringArray.join(', ');
    }

    search(term) {
        if (this.local) {
            this.http.doGet('json/domains/' + this.identifier + ".json", 'local', {}, true).then(data => {
                data = eval(data);
                return data.filter(item => {
                    var found = false;
                    var displayedKeys = this.getDisplayKeysArray();
                    for (let i = 0; i < displayedKeys.length; i++) {
                        if (item[displayedKeys[i]].toLocaleLowerCase().indexOf(term.toLocaleLowerCase()) !== -1) {
                            found = true;
                            break;
                        }
                    }
                    return found;
                })
            }).then(data => {
                this.results = data;
            });
        } else {
            let sendParams = {
                identifier: this.identifier,
                query: this.term.value,
            };
            if (this.params) {
                for (var x in this.params) {
                    sendParams[x] = this.params[x];
                }
            }
            this.http.doPost('common/getLov', "java", {
                startRow: 0,
                endRow: 1000,
                filterModel: {
                    params: sendParams
                }
            }).then(data => {
                this.results = data.records;
            });
        }
    }

    get value(): any {
        return this.selectedItem;
    };

    selectItem(value, obj = null) {
        this.preventInputWatch = true;
        this.selectedItem = value;
        this.term.setValue(value);
        this.writeValue(value);
        this.results = [];
        this.onSelectItem.emit(obj);
    }

    registerOnChange(fn: any) {
        this.onChangeCallback = fn;
    }

    //From ControlValueAccessor interface
    registerOnTouched(fn: any) {
        this.onTouchedCallback = fn;
    }

    ngOnInit() {
        if (!this.required) {
            this.term = new FormControl();
        } else {
            this.term = new FormControl('', Validators.required);
            //console.log(this.term);
        }
        if (!this.size) {
            this.size = "6";
        }
        if (!this.local) {
            this.local = false;
        }
        this.term.valueChanges.pipe(
            debounceTime(400))
            .subscribe(term => {
                if (!this.preventInputWatch) {
                    if (term) {
                        this.search(term);
                    } else {
                        this.results = [];
                    }

                }
                else {
                    this.preventInputWatch = false;
                }
            });
        //this.term.asyncValidator = Validators.required;
        //console.log(this.term);
    }

    ngOnChanges(changes) {
    }

}
