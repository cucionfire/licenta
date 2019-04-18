import { OnInit } from '@angular/core';
import { GlobalService } from '../../modules/services/global.service';
import { Dictio } from 'src/app/texts/texts';
declare var Materialize: any;
export class BaseComponent implements OnInit {

    static gs = null;

    private colorScheme = '';

    private colors: string[] = [
        'red', 'pink', 'purple', 'deep-purple', 'indigo', 'blue', 'light-blue', 'cyan', 'teal', 'green', 'light-green', 'lime', 'yellow', 'amber', 'orange', 'deep-orange', 'brown', 'grey', 'blue-grey'
    ];
    private userConfig = {
        dateFormat: "yyyy-mm-dd"
    }
    private languageList = ['en', 'de', 'fr'];

    private lang = '';

    constructor() {
        if (!BaseComponent.gs) {
            BaseComponent.gs = new GlobalService();
        }
        if (this.colorScheme === '') {
            this.colorScheme = sessionStorage.getItem('colorScheme') || 'blue-grey';
        }
        if (this.lang === '') {
            this.lang = sessionStorage.getItem('lang') || 'en';
        }
        // subscriptions
        BaseComponent.gs.colorScheme.subscribe(colorScheme => {
            this.colorScheme = colorScheme;
        });
        BaseComponent.gs.lang.subscribe(lang => {
            this.lang = lang;
        });

    }
    getBaseComponentService() {
        return BaseComponent.gs;
    }

    ngOnInit() {
    }

    switchScheme(color) {
        BaseComponent.gs.updateColorScheme(color);
        sessionStorage.setItem('colorScheme', color);
    }

    setLang(lang) {
        BaseComponent.gs.updateLang(lang);
        sessionStorage.setItem('lang', lang);
    }
    showModalError(message) {
        alert(message);
    }
    showMessage(message) {
        Materialize.toast('<i class="material-icons">done</i>' + message, 4000)
    }
    setFieldStatuses(form, fieldStatuses) {
        for (var formIndex in form.controls) {
            if (fieldStatuses[formIndex]) {
                if (!fieldStatuses[formIndex]) {
                    form.controls[formIndex].disable();
                } else {
                    form.controls[formIndex].enable();
                }
            } else {
                if (fieldStatuses['_ALL_'] == false) {
                    form.controls[formIndex].disable();
                } else {
                    form.controls[formIndex].enable();
                }
            }
        }

    }
    updateLabels() {
        setTimeout(function () {
            Materialize.updateTextFields();
        }, 200);
    }
    getColsTranslates(cols) {
        cols.forEach(col => {
            if (this.lang != 'en') {
                if (Dictio.keys[this.lang][col.headerName]) {
                    col.headerName = Dictio.keys[this.lang][col.headerName];
                }
            }

        });
        return cols;
    }

}
