import { UserListService } from './user-list.service';
import { Component, OnInit } from '@angular/core';
declare var $: any;
@Component({
  selector: 'user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.scss'],
  providers: [UserListService]
})
export class UserListComponent implements OnInit {


  private columns = [];

  private messages: any = {
    emptyMessage: 'Nu exista date'
  };

  private selectedClientID = 0;

  public rows = [{
    Name: 'User 1',
    Email: 'user1@test.com',
    UserType: 'De grup',
    Rol: 'Stilist'
  },{
    Name: 'User 2',
    Email: 'user2@test.com',
    UserType: 'De grup',
    Rol: 'Manager'
  },{
    Name: 'User 3',
    Email: 'user3@test.com',
    UserType: 'Individual',
    Rol: 'Manichiurist'
  }];

  private loadingIndicator: boolean = false;

  private filter = {
    type: "",
    search: ""
  };

  private newMode: boolean = false;

  constructor(private clientService: UserListService) { }

  onSelect(ev) {
    this.selectedClientID = ev.selected[0].UserID;
  }

  editClient(id) {
    console.log(id);
    $("#myModal6").modal();
  }

  loadClients() {
    this.loadingIndicator = true;
    this.clientService.getAll(this.filter).then(data => {
      this.rows = data.result;
      this.loadingIndicator = false;
    });
  }

  ngOnInit() {
    // this.loadClients();
(function($){
      $('#data_2 .input-group.date').datepicker({
                startView: 1,
                todayBtn: "linked",
                keyboardNavigation: false,
                forceParse: false,
                autoclose: true,
                format: "dd/mm/yyyy"
            })
  });
}

}
