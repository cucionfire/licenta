import { ServicesService } from './../../services/services.service';
import { Component, OnInit } from '@angular/core';
declare var $: any;

@Component({
  selector: 'services-list',
  templateUrl: './services-list.component.html',
  providers: [ServicesService],
  styleUrls: ['./services-list.component.scss']
})
export class ServicesListComponent  implements OnInit {

 private columns = [];

  private messages: any = {
    emptyMessage: 'Nu exista date'
  };

  private selectedservicesID = 0;

  public rows = [{
   ServiceName:"Tuns scurt",
   EstPrice: "25 RON",
   Duration: "45 min"
  },{
   ServiceName:"Tuns lung",
   EstPrice: "50 RON",
   Duration: "1h 30 min"
  },{
   ServiceName:"Vopsit si aranjat",
   EstPrice: "125 RON",
   Duration: "2h 30 min"
  }];

  private loadingIndicator: boolean = false;

  private filter = {
    type: "",
    search: ""
  };

  private newMode: boolean = false;

  constructor(private servicesService: ServicesService) { }


  ngOnInit() {
    this.servicesService.getColumns().then(d => {
      this.columns = d.colConfig;
      console.log(this.columns);
    });
    //this.loadservicess();

  }

}
