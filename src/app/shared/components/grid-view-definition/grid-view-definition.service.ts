import {Injectable} from "@angular/core";
import { BaseHttpService } from 'src/app/services/common/base-http.service';

@Injectable()
export class GridViewDefinitionService {
    entity: String = "";

    constructor(private http: BaseHttpService) {

    }

    setEntity(entity) {
        this.entity = entity + "-list";
    }

    getViews() {
        return this.http.doGet('getViews', 'node', {
            entity: this.entity,
            profile: 1
        });
    }
    getStandardView() {
        return this.http.doGet('json/standardViews/'+this.entity+".json", 'local', {});
    }
    save(view){
        return this.http.doPost('entity', 'node', view);
    }

}
