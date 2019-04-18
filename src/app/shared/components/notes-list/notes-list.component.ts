import { BaseComponent } from './../base/base.component';
import {Component, OnInit} from "@angular/core";
import {NotesListService} from "./notes-list.service";
import {Input} from "@angular/core/src/metadata/directives";

@Component({
    selector: 'notes-list',
    templateUrl: './notes-list.component.html',
    styleUrls: ['./notes-list.component.scss'],
    providers: [NotesListService]
})
export class NotesListComponent extends BaseComponent implements OnInit {
    notes: Array<any> = [];
    @Input() entity;
    showForm: Boolean = false;
    selectedNote: Object = {};
    notesClasses: Array<String>=["Contract", "General", "Quality Specification", "Terms and conditions"];

    constructor(private notesService: NotesListService) {
        super();
    }

    ngOnInit() {
        this.notesService.setEntity(this.entity);
        this.notesService.getNotes().then(notes=>this.notes = notes);
        this.emptyNote();
    }
    addNote(){
        this.showForm=!this.showForm;
        this.emptyNote();
    }
    deleteNote(){
        this.notesService.deleteNotes(this.selectedNote).then(data=>this.notesService.getNotes().then(notes=>this.notes = notes));
        this.addNote();
    }
    updateNote(){
        this.notesService.updateNote(this.selectedNote);
        this.addNote();
    }
    emptyNote() {
        this.selectedNote = {
            eType: 'notes-' + this.entity,
            profile: 1,
            _id:false,
            noteDetails: {
                note_class_cd: "",
                text: "",
                link_url: "",
                user_shortname: "",
                mod_dt: new Date()
            }
        };
    }

    selectNote(note) {
        this.selectedNote = note;
        this.showForm=true;
    }

    addNewNote(noteDetails) {
        this.notesService.addNote(noteDetails).then(data=>this.notes.unshift(data));
        this.showForm=false;
        
    }
   

}
