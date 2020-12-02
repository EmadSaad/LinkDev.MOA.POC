import { Component, OnInit, Input } from '@angular/core';
import { QuoteWithRelatedQuoteLines } from 'src/modules/Contract-Submission/interfaces/PriceOffer/QuoteWithRelatedQuoteLines';
import { APIService } from 'src/modules/shared/Services/API-Service/api-service.service';
import { TranslateService } from '@ngx-translate/core';
import { GridColumn, ColumnFieldType } from 'src/modules/shared/form-guide/grid/models/GridColumn';
import { ApiGenericResponse, ResponseCode } from 'src/modules/shared/Models/api-generic-response';


@Component({
  selector: 'app-request-quote',
  templateUrl: './request-quote.component.html',
  styleUrls: ['./request-quote.component.css']
})
export class RequestQuoteComponent implements OnInit {

  @Input() requestId: string;
  
  MODONText: string = 'Modon'
  priceOfferDate: "";

  Items: QuoteWithRelatedQuoteLines={};
  constructor(public api: APIService,public translate: TranslateService) { }

  ItemsGridcols: GridColumn[] = [
    {header:"ContractSubmission.Clause",field:"ProductName",typeConfig: {type:ColumnFieldType.Text}},
    {header:"ContractSubmission.Value",field:"ExtendedAmount",typeConfig: {type:ColumnFieldType.Text}}
  ];

  ngOnInit() {
    this.translate.get('ContractSubmission.BillingNameValue').subscribe(res =>{
      this.MODONText = res;
    })
  }
  ngOnChanges(changes)
  {
    if(changes['requestId'] && this.requestId)
    {
      this.api.Get<ApiGenericResponse<QuoteWithRelatedQuoteLines>>(`api/EServices/GetRequestQuote?applicationHeaderId=${this.requestId}`).subscribe(
        res => {
          debugger;
          if(res.ResponseCode === ResponseCode.Success)
          {
            this.translate.get('ContractSubmission.PriceOfferDate',{ gre: res.Content.GregorianDate, hij: res.Content.HijriDate}).subscribe(PriceOfferDate =>{
              this.priceOfferDate = PriceOfferDate;
            })
            this.Items = res.Content;
          }
        }
      )
    }
  }

}
