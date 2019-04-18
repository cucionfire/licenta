import {Injectable} from "@angular/core";
import { BaseHttpService } from '../../modules/services/base-http.service';

declare var $:any;

@Injectable()
export class AttachmentsService {
    private type: String = "";
    private objID: Number;

    constructor(private http: BaseHttpService) {
    }

    getAttachs() {
        return this.http.doGet("json/data/attachements.json", 'local', {});
    }

    remove(id) {
        return this.http.doPost('documents/remove', 'java', {ext_doc_id: id});
    }

    save(el) {
        var form = el.target.closest("form");
        var formData = new FormData(form);
        $.ajax({
            url: 'rest/documents/save',
            type: 'POST',
            data: formData,
            async: true,
            success: function (data) {

            },
            cache: false,
            contentType: false,
            processData: false
        });
        return false;
    }
}
