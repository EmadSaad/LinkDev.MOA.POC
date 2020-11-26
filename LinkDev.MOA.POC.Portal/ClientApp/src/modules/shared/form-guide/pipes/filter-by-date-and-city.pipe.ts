import { Pipe, PipeTransform } from "@angular/core";
import { Moment } from "moment";
@Pipe({
  name: "filterByDateAndCity"
})
export class FilterByDateAndCityPipe implements PipeTransform {
  transform(
    items: any[],
    date: any,
    cityKey: any,
    city: any,
    permitTypeKey: any,
    args?: any[]
  ): any {
    if (
      !cityKey ||
      date == undefined ||
      date == null ||
      city == undefined ||
      city == null
    ) {
      return items;
    } else {
      if (items) {
        let typeOfDate = typeof date;
        if (typeOfDate === "string") {
          return items.filter(item => {
            let incidenttDate = new Date(date.toString());
            let startDate = new Date(item["StartDate"]);
            let endDate = new Date(item["EndDate"]);

            this.rebaseDate(incidenttDate);
            this.rebaseDate(startDate);
            this.rebaseDate(endDate);

            if (
              endDate >= new Date(date.toString()) &&
              incidenttDate >= startDate &&
              item[cityKey] == city
            )
              return true;
          });
        } else {
          return items.filter(item => {
            let incidenttDate = date.toDate();
            let startDate = new Date(item["StartDate"]);
            let endDate = new Date(item["EndDate"]);

            this.rebaseDate(incidenttDate);
            this.rebaseDate(startDate);
            this.rebaseDate(endDate);

            if (
              endDate >= new Date(date.toString()) &&
              incidenttDate >= startDate &&
              item[cityKey] == city
            )
              return true;
          });
        }
      } else {
        return [];
      }
    }
  }

  rebaseDate(date: Date) {
    date.setMinutes(0);
    date.setSeconds(0);
    date.setHours(0);
  }
}
