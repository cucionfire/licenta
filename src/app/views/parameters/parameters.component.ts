import { OnChanges } from '@angular/core';
import { ParametersService } from './parameters.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'parameters',
  templateUrl: './parameters.component.html',
  styleUrls: ['./parameters.component.scss'],
  providers: [ParametersService]
})
export class ParametersComponent implements OnInit {
  private params = {};
  private paramsKey;
  private hasChange: Boolean = false;
  constructor(private paramSrv: ParametersService) { }
  onSave() {
    this.paramSrv.save(this.params).then(data => {
      this.onLoad();
    })
  }
  ngOnInit() {
    this.onLoad();
  }
  onChange() {
    this.hasChange = true;
  }
  onLoad() {
    this.paramSrv.loadParams().then(data => {
      data.result.Value = JSON.parse(data.result.Value);
      this.params = data.result;
      this.paramsKey = Object.keys(this.params['Value']);
    })

  }
}
