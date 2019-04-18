import { Component, OnInit } from '@angular/core';

import { ClientService } from '../../services/client.service';
declare var $: any;
@Component({
  selector: 'client-list',
  templateUrl: './client-list.component.html',
  providers: [ClientService],
  styleUrls: ['./client-list.component.scss']
})
export class ClientListComponent implements OnInit {

  private columns = [];

  private messages: any = {
    emptyMessage: 'Nu exista date'
  };

  private selectedClientID = 0;

  public rows = [{
    ClientID:1,
    FirstName: 'Client Test 1',
    Email: 'test@test.com',
    Phone: 1240000123,
    Gender: 'Masculin'
  },{
    ClientID:2,
    FirstName: 'Client Test 2',
    Email: 'test@test22.com',
    Phone: 1245621635,
    Gender: 'Feminin'
  }];

  private loadingIndicator: boolean = false;

  private filter = {
    type: "",
    search: ""
  };

  private newMode: boolean = false;

  constructor(private clientService: ClientService) { }

  onSelect(ev) {
    this.selectedClientID = ev.selected[0].ClientID;
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
    this.clientService.getColumns().then(d => {
      this.columns = d.colConfig;
      console.log(this.columns);
    });
    //this.loadClients();

$('#data_2 .input-group.date').datepicker({
                startView: 1,
                todayBtn: "linked",
                keyboardNavigation: false,
                forceParse: false,
                autoclose: true,
                format: "dd/mm/yyyy"
            });

  }

}
