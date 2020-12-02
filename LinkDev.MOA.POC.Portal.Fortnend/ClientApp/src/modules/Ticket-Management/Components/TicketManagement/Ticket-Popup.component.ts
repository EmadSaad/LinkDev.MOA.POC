import { Component, Input } from "@angular/core";
import { NgbModal } from "@ng-bootstrap/ng-bootstrap";
import { TranslateService } from "@ngx-translate/core";

@Component({
    selector: 'app-ticket-popup',
    templateUrl: './Ticket-Popup.component.html'
})
export class TicketPopUpComponent{

    @Input() ticketNumber: string;
    @Input() model: any;

    constructor(
        public modalService: NgbModal,
        protected translateService: TranslateService
    )
    
    {

    }
    ngOnInit() {
         // Languages
         this.translateService.get('SELECT').subscribe(
            sel => {
              this.translateService.get('NO_RESULT_FOUND').subscribe(
                no => {
                  this.translateService.get('SEARCH').subscribe(
                    search => {
                      this.translateService.get('moreValues').subscribe(
                        moreValues =>{
                          this.config['placeholder'] = sel;
                          this.config['noResultsFound'] = no;
                          this.config['searchPlaceholder'] = search;
                          this.config['moreText'] = moreValues;
                        }
                      )
                    });
                }); 
          });
        }

        config = {
            displayKey: "Text", //if objects array passed which key to be displayed defaults to description
            search: true, //true/false for the search functionlity defaults to false,
            placeholder: "ServicesCommon.Select", // text to be displayed when no item is selected defaults to Select,
            noResultsFound: "No results found!", // text to be displayed when no items are found while searching
            searchPlaceholder: "Search", // label thats displayed in search input,
            searchOnKey: 'Text' ,// key on which search should be performed this will be selective search. if undefined this will be extensive search on all keys
            moreText: 'More Values',
            height: '250px'
          };
}
