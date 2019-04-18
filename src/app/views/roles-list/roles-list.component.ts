import { RoleService } from './../../services/role.service';
import { Component, OnInit } from '@angular/core';
declare var $: any;

@Component({
  selector: 'roles-list',
  templateUrl: './roles-list.component.html',
  styleUrls: ['./roles-list.component.scss'],
  providers :[RoleService]
})
export class RolesListComponent implements OnInit {



  private columns = [];

  private messages: any = {
    emptyMessage: 'Nu exista date'
  };

  private selectedClientID = 0;

  public rows = [{
    RolName: 'Manager'
  },{
    RolName: 'Manichiurist'
  },{
    RolName: 'Stilist'
  }];

  private loadingIndicator: boolean = false;

  private filter = {
    type: "",
    search: ""
  };

  private newMode: boolean = false;

  constructor(private clientService: RoleService) { }


  ngOnInit() {


  }
}
