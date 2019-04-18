import {Injectable} from "@angular/core";
import { BaseHttpService } from '../../modules/services/base-http.service';

@Injectable()
export class NotesListService {
    private entity: String = "";

    constructor(private http: BaseHttpService) {
    }

    setEntity(value) {
        this.entity =  'notes-' + value;
    }
    deleteNotes(note){
        return this.http.doDelete('notes/'+note._id, 'node', note);
    }
    updateNote(note){
        return this.http.doPut('notes', 'node', note);
    }
    getNotes() {
        let params = {
            entity: this.entity,
            profile: 1
        };
        return this.http.doGet('notes', 'node', params);
    }

    addNote(noteDetails) {
        noteDetails.mod_dt = new Date();
        noteDetails.user_shortname = "FISMGR";
        let note = {
            eType:this.entity,
            profile: 1,
            noteDetails: noteDetails
        };
        return this.http.doPost('notes', 'node', note);
    }
}
