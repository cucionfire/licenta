/* import {Component, OnInit, ViewContainerRef, ComponentFactoryResolver} from "@angular/core";
import {Input} from "@angular/core/src/metadata/directives";
import {ViewChild} from "@angular/core/src/metadata/di";

@Component({
  selector: 'dynamic-template',
  template: `<div #dynamicTemplateContainer></div>`
})
export class DynamicTemplateComponent implements OnInit {
    @Input() component:any;
    @Input() collection:any;
    @Input() params:any;
    private componentRegistry = {
    'CardWidgetComponent':CardWidgetComponent,
        'BarChartWidgetComponent':BarChartWidgetComponent,
        'PieChartComponent':PieChartComponent,
        'LineChartComponent':LineChartComponent
    }
    @ViewChild("dynamicTemplateContainer", {read: ViewContainerRef}) dynamicTemplateContainer:ViewContainerRef;
    constructor(private componentFactoryResolver: ComponentFactoryResolver) {

    }
  ngOnInit() {
      const factory = this.componentFactoryResolver.resolveComponentFactory(this.componentRegistry[this.component]);
      const ref = this.dynamicTemplateContainer.createComponent(factory);
      ref['_hostElement']['component'].params=this.params;
      ref.changeDetectorRef.detectChanges();

  }

}
 */
