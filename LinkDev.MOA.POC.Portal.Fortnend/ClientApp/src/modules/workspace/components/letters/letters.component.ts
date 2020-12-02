import { Component, OnInit } from '@angular/core';
import { WorkspaceBase } from '../../services/workspace-base';
import { ILicenseFiltration } from '../../interfaces/LicenseFiltration.interface';
import { ILetterResult } from '../../interfaces/LettersResult.interface';
import { CrTypeEnum } from 'src/modules/shared/Common/Bidding/models/PriceOfferModel';
import { LetterService } from '../../services/letter.service';
import { LookupService } from 'src/modules/shared/Services/lookup.service';
import { ActivatedRoute } from '@angular/router';
import { AlertService } from 'src/modules/shared/services';
import { TranslateService } from '@ngx-translate/core';
import { SharedService } from '../../services/shared.service';

@Component({
	selector: 'letters',
	templateUrl: 'letters.component.html'
})

export class LettersComponent extends WorkspaceBase<ILicenseFiltration, ILetterResult> implements  OnInit {
	config = {
		displayKey: 'Text',
		search: true,
		placeholder: 'Select',
		noResultsFound: 'No results found!',
		searchPlaceholder: 'Search',
		searchOnKey: 'Text'
	  };
	  cols = [];
	  math: any;
	  public getLookupTypes(): import("../../../shared/Models/lookup-request.model").RetrieveOptionsRequest[] {
		return [];
	}
	public getFiltrationInstance(): ILicenseFiltration {
		return new ILicenseFiltration();
	}
	public getAllowedCrTypes(): number[] {
		return [CrTypeEnum.Investor, 2, 3];
	}
	public addContractsToSearch(): boolean {
		return true;
	}
	constructor(public letterService: LetterService,
		public lookupService: LookupService,
		public activatedRoute: ActivatedRoute,
		public alertService: AlertService,
		public translateService: TranslateService,
		public sharedService: SharedService) {
		super(sharedService, letterService, lookupService, activatedRoute, alertService, translateService);
		this.math = Math;
		this.cols = [
		  { field: 'LetterNumber', header: 'WorkspaceBase.Letters.LetterNumber' },
		  { field: 'IssuanceDate', header: 'WorkspaceBase.Letters.IssuanceDate' }
		];
	  }
	ngOnInit() { }
}