import {Pipe, PipeTransform} from "@angular/core";

@Pipe({
    name: 'navigationFilter'
})
export class NavigationFilterPipe implements PipeTransform {
    transform(value: any, args?: any): any {
        var self = this;
        if (args == "") {
            return value;
        }
        return value ? value.filter(function (item) {
            return self.searchParentItem(item, args)
        }) : value;
    }

    searchParentItem(item, args) {
        var parentFlag = item.name.toLocaleLowerCase().indexOf(args.toLocaleLowerCase()) !== -1;
        if (item.items) {
            var childSearch = item.items.filter(function (child) {
                return child.name.toLocaleLowerCase().indexOf(args.toLocaleLowerCase()) !== -1;
            });
            if (!parentFlag && childSearch.length > 0) {
                parentFlag = true;
            }
        }
        return parentFlag;

    }


}
