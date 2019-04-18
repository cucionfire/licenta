import { Component, EventEmitter, OnInit, OnChanges, Input, Output } from '@angular/core';


import { ClientService } from 'src/app/services/client.service';

@Component({
  selector: 'client-detail',
  templateUrl: './client-detail.component.html',
  styleUrls: ['./client-detail.component.scss']
})
export class ClientDetailComponent implements OnInit, OnChanges {

  @Input() private ClientID;

  @Output()  afterSave: EventEmitter<String> = new EventEmitter<String>();

  private client = {
    ClientID: 0,
    FirstName: '',
    Email: '',
    Phone: '',
    Gender: ''
  };

  private msg: string = "Pentru a adauga un client nou, completati campurile formularului";

  constructor(private clientService: ClientService) { }

  initClient() {
    this.client = {
      ClientID: 0,
      FirstName: '',
      Email: '',
      Phone: '',
      Gender: ''
    };
  }

  onSave() {
    this.client.ClientID = this.ClientID;
    console.log(this.client, this.ClientID);
    this.clientService.save(this.client).then(d => {
      if (isNaN(parseInt(d.result))) {
        this.msg = d.result;
      } else {
        this.client.ClientID = d.result;
        this.msg = "Datele au fost salvate.";
      }
      // this.initClient();
      this.afterSave.emit('complete');
    });
  }
  loadClient(id) {
    this.clientService.load(id).then(data => {
      if (data.result) {
        this.client = data.result;
      }
    });

  }
  ngOnChanges(changes) {
    if (changes['ClientID']) {
      if (changes['ClientID'].currentValue > 0)
        this.loadClient(changes['ClientID'].currentValue);
    }
  }
  ngOnInit() {
  }

}
