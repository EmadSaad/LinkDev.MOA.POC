import { Component, OnInit, Input } from '@angular/core';
import { APIService } from 'src/modules/shared/Services/API-Service/api-service.service';
import { QuoteWithRelatedQuoteLines } from '../../interfaces/PriceOffer/QuoteWithRelatedQuoteLines';
import { ApiGenericResponse, ResponseCode } from 'src/modules/shared/Models/api-generic-response';
import { GridColumn, ColumnFieldType } from 'src/modules/shared/form-guide/grid/models/GridColumn';
import { TranslateService } from '@ngx-translate/core';
import { AlertService } from 'src/modules/shared/services';
import { Router } from '@angular/router';
import { ConfigService } from 'src/modules/shared/Services/Config-Service/config-service.service';

@Component({
  selector: 'app-price-offer',
  templateUrl: './price-offer.component.html',
  styleUrls: ['./price-offer.component.css']
})
export class PriceOfferComponent implements OnInit {

  @Input() requestId: string;
  @Input() IndustrialCities: any[];
  @Input() SelectedCity: string;
  MODONText: string = 'Modon'
  priceOfferDate: "";
  public apiUrl: string = ConfigService.APIURL;

  Items: QuoteWithRelatedQuoteLines={};
  constructor(public api: APIService,public translate: TranslateService,protected alertService: AlertService,protected router: Router) { }

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
      this.api.Get<ApiGenericResponse<QuoteWithRelatedQuoteLines>>(`api/ContractSubmission/GetQuoteWithRelatedQuoteLines?contractsubmissionId=${this.requestId}`).subscribe(
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
  getIndustrialCity()
  {
    if(this.IndustrialCities && this.SelectedCity && this.IndustrialCities.find(x => x['Value'].toString() === this.SelectedCity.toString()))
      return this.IndustrialCities.find(x => x['Value'].toString() === this.SelectedCity.toString())['Text'];
  }

}
