import { BaseComponent } from './../base/base.component';
import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'page-header',
  templateUrl: './page-header.component.html',
  styleUrls: ['./page-header.component.scss']
})
export class PageHeaderComponent extends BaseComponent implements OnInit {
  @Input('pageTitle') pageTitle;
  constructor() {
    super();
  }

  ngOnInit() {
  }

}
