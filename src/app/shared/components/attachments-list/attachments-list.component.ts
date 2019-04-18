import { BaseComponent } from './../base/base.component';
import {Component, OnInit} from "@angular/core";
import {AttachmentsService} from "./attachments.service";
@Component({
    selector: 'attachments-list',
    templateUrl: './attachments-list.component.html',
    styleUrls: ['./attachments-list.component.scss'],
    providers: [AttachmentsService]
})
export class AttachmentsListComponent extends BaseComponent implements OnInit {
    // @Input() objID;
    // @Input() objType;
    attach: Array<any>;
    showForm:Boolean=false;

    constructor(private attachService: AttachmentsService) {
        super();
    }

    ngOnInit() {
        this.attachService.getAttachs().then(at=>this.attach = at[0].result.records);
    }
    addAttach(){
        this.showForm = !this.showForm;
    }
    save(e){
        this.attachService.save(e);
    }
    remove(id,index){
        this.attachService.remove(id);
        this.attach.splice(index,1);
    }
}
