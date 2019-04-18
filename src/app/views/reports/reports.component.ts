import { ReportsService } from './../../services/reports.service';
import { Component, OnInit } from '@angular/core';
declare var $: any;

@Component({
  selector: 'reports',
  templateUrl: './reports.component.html',
  styleUrls: ['./reports.component.scss'],
  providers:[ReportsService]
})
export class ReportsComponent implements OnInit {


  private columns = [];

  private messages: any = {
    emptyMessage: 'Nu exista date'
  };

  private selectedClientID = 0;

  public rows = [{

  }];

  private loadingIndicator: boolean = false;

  private filter = {
    type: "",
    search: ""
  };

  private newMode: boolean = false;

  constructor(private clientService: ReportsService) { }

  ngOnInit() {

     $('#data_5 .input-daterange').datepicker({
                keyboardNavigation: false,
                forceParse: false,
                autoclose: true
            });
  }

}
