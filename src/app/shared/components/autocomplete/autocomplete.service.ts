import {Injectable} from "@angular/core";
import { BaseHttpService } from 'src/app/services/common/base-http.service';

@Injectable()
export class AutocompleteService {
    private entity: string;

    constructor(private http: BaseHttpService) {
    }

    search(searchText) {
        return this.http.doGet('json/data/dummy.json', 'local', {
            text: searchText,
            entity: this.entity
        }).then(record=> {
            return record[0].result.records;
        });
        ;
    }

    setEntity(entity) {
        this.entity = entity;
    }

    getFields() {
        return this.http.doGet("json/autocomplete/" + this.entity + ".json", "local", {});
    }

    save(obj) {
        return this.http.doGet("json/autocomplete/" + this.entity + ".json", "local", {}).then(data=> {
            return obj;
        });

    }

}
