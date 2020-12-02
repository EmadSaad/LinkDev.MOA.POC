import { Component, OnInit, forwardRef, Input, OnChanges, ViewChild, Output, EventEmitter, ChangeDetectorRef } from '@angular/core';
import { ControlValueAccessor, NG_VALIDATORS, NG_VALUE_ACCESSOR, FormControl } from '@angular/forms';
import { CountryCode } from './data/country-code';
import { phoneNumberValidator } from './ngx-intl-tel-input.validator';
import { Country } from './model/country.model';
import * as lpn from 'google-libphonenumber';

@Component({
	selector: 'adahi-intl-tel-input',
	templateUrl: './ngx-intl-tel-input.component.html',
	styleUrls: ['./ngx-intl-tel-input.component.css'],
	providers: [
		CountryCode,
		{
			provide: NG_VALUE_ACCESSOR,
			// tslint:disable-next-line:no-forward-ref
			useExisting: forwardRef(() => NgxIntlTelInputComponent),
			multi: true
		},
		{
			provide: NG_VALIDATORS,
			useValue: phoneNumberValidator,
			multi: true,
		}
	]
})
export class NgxIntlTelInputComponent implements OnInit, OnChanges {

	@ViewChild("#focusable")
	focusableInput;
	@Input() value = '';
	@Input() preferredCountries: Array<string> = [];
	@Input() enablePlaceholder: boolean;
	@Input() cssClass = 'form-control';
	@Input() onlyCountries: Array<string> = [];
	@Input() selected: string;
	@Input() disableDropdown = false;
	@Input() maxLength;
	@Input() ViewMode: string;
	@Input() showFlagInViewMode = false;
	@Input()
	isReadOnly = false;
	@Input()
	enableAutoCountrySelect = false;
	@Output()
	countryChanged = new EventEmitter();

	public isFirst: boolean = true;
	phoneNumber = '';
	allCountries: Array<Country> = [];
	preferredCountriesInDropDown: Array<Country> = [];
	selectedCountry: Country;
	phoneUtil = lpn.PhoneNumberUtil.getInstance();
	disabled = false;
	errors: Array<any> = ['Phone number is required.'];

	onTouched = () => { };
	propagateChange = (_: any) => { };
	changedFromWriteValue: boolean;

	constructor(
		private countryCodeData: CountryCode , private cdr :ChangeDetectorRef
	) {
		this.fetchCountryData();
	}

	getSelectedCountry() {
		return this.selectedCountry;
	}

	onCompInit() {

		if (this.ViewMode) return;

		//Write Mode
		if (this.preferredCountries.length > 0 ) {
			this.preferredCountries.forEach(iso2 => {
				let preferredCountry = this.allCountries.filter((c) => {
					return c.iso2 === iso2;
				});

				this.preferredCountriesInDropDown.push(preferredCountry[0]);
			});
		}

		if (this.onlyCountries && this.onlyCountries.length) {
			//this.allCountries = this.allCountries.filter(c => this.onlyCountries.includes(c.iso2));
            let allCountriesfiltered = [];
			this.onlyCountries.forEach((code) => {
				let country = this.allCountries.find(c => c.iso2 == code);
				if(country)
				allCountriesfiltered.push(country);
			});

			this.allCountries = allCountriesfiltered;
		}

		let selectedCntry = this.allCountries.filter((c) => {
			return c.iso2 === this.selected ? this.selected.toLowerCase() : "";
		}); //[0];


		if (selectedCntry.length > 0) {
			this.selectedCountry = selectedCntry[0];
		}
		else if (this.preferredCountriesInDropDown.length) {
			this.selectedCountry = this.preferredCountriesInDropDown[0];
		}
		else {
			this.selectedCountry = this.allCountries[0];
		}

		this.countryChanged.emit(this.selectedCountry.iso2.toLowerCase());

	}

	ngOnChanges(simpleChanges) {

		if (simpleChanges.onlyCountries && this.onlyCountries && this.onlyCountries.length) {
			//this.allCountries = this.allCountries.filter(c => this.onlyCountries.includes(c.iso2));
			let allCountriesfiltered = [];
			this.onlyCountries.forEach((code) => {
				let country = this.allCountries.find(c => c.iso2 == code);
				if(country)
				allCountriesfiltered.push(country);
			});

			this.allCountries = allCountriesfiltered;
		}

		if (simpleChanges.selected && this.selected) {

			let selectedCntry = this.allCountries.filter((c) => {
				return c.iso2 === this.selected.toLowerCase();
			})[0];

			if (selectedCntry) {
				this.selectedCountry = selectedCntry;
				this.onCountrySelect(this.selectedCountry, this.focusableInput)
			}
		}

		if (this.ViewMode) {
			this.applyViewMode();
			return;
		}
	}

	ngOnInit() {
		this.onCompInit();
	}

	applyViewMode() {

		//Edit Mode
		let selectedCntry = this.allCountries.filter((c) => {
			return c.iso2 === this.selected ? this.selected.toLowerCase() : "";
		});

		if (selectedCntry.length == 0) return;

		this.selectedCountry = selectedCntry[0];
		let countryDialCode = "+" + this.selectedCountry.dialCode ;
		let number = this.ViewMode;
		this.ViewMode = this.showFlagInViewMode ? number.split(countryDialCode)[1] : number;
		this.phoneNumber = this.ViewMode.trim();
		this.countryChanged.emit(this.selectedCountry.iso2.toLowerCase());
		this.onPhoneNumberChange();
	}

	public onPhoneNumberChange(): void {
		this.value = this.phoneNumber;

		if (this.value && this.isFirst && !(this.ViewMode || this.isReadOnly)) {
			let countryDialCode = "+" + this.selectedCountry.dialCode;
			if (this.value && this.value.startsWith(countryDialCode)) {
				let number = this.value.split(countryDialCode)[1];
				this.phoneNumber = number.trim();
				this.value = number;
			}

			this.isFirst = false;
		}

		let number: lpn.PhoneNumber;
		try {
			number = this.phoneUtil.parse(this.phoneNumber, this.selectedCountry.iso2.toUpperCase());
		} catch (e) {
		}

		let countryCode = this.selectedCountry.iso2;
		// auto select country based on the extension (and areaCode if needed) (e.g select Canada if number starts with +1 416)
		if (this.enableAutoCountrySelect || this.changedFromWriteValue) {
			countryCode = number && number.getCountryCode()
				? this.getCountryIsoCode(number.getCountryCode(), number)
				: this.selectedCountry.iso2;
			if (countryCode !== this.selectedCountry.iso2) {
				const newCountry = this.allCountries.find(c => c.iso2 === countryCode);
				if (newCountry) {
					this.selectedCountry = newCountry;
				}
			}
			let countryDialCode = "+" + this.selectedCountry.dialCode;
			if (this.value && this.value.startsWith(countryDialCode)) {
				let number = this.value.split(countryDialCode)[1];
				this.phoneNumber = number.trim();
				this.value = number;
			}
			this.changedFromWriteValue = false;
		}
		countryCode = countryCode ? countryCode : this.selectedCountry.iso2;

		this.countryChanged.emit(this.selectedCountry.iso2.toLowerCase());

		this.propagateChange({
			number: this.value,
			internationalNumber: number ? this.phoneUtil.format(number, lpn.PhoneNumberFormat.INTERNATIONAL) : '',
			nationalNumber: number ? this.phoneUtil.format(number, lpn.PhoneNumberFormat.NATIONAL) : '',
			countryCode: countryCode.toLowerCase()
		});
	}

	public onCountrySelect(country: Country, el?): void {
		this.selectedCountry = country;

		this.countryChanged.emit(this.selectedCountry.iso2.toLowerCase())

		if (this.phoneNumber.length > 0) {
			this.value = this.phoneNumber;

			let number: lpn.PhoneNumber;
			try {
				number = this.phoneUtil.parse(this.phoneNumber, this.selectedCountry.iso2.toUpperCase());
			} catch (e) {
			}

			this.propagateChange({
				number: this.value,
				internationalNumber: number ? this.phoneUtil.format(number, lpn.PhoneNumberFormat.INTERNATIONAL) : '',
				nationalNumber: number ? this.phoneUtil.format(number, lpn.PhoneNumberFormat.NATIONAL) : '',
				countryCode: this.selectedCountry.iso2.toUpperCase()
			});
		}

		if (el)
			el.focus();
	}

	public onInputKeyPress(event): void {
		const pattern = /[0-9\+\-\ ]/;
		const inputChar = String.fromCharCode(event.charCode);
		if (!pattern.test(inputChar)) {
			event.preventDefault();
		}
	}

	protected fetchCountryData(): void {
		this.countryCodeData.allCountries.forEach(c => {
			const country: Country = {
				name: c[0].toString(),
				iso2: c[1].toString(),
				dialCode: c[2].toString(),
				priority: +c[3] || 0,
				areaCodes: c[4] as string[] || undefined,
				flagClass: c[1].toString().toLocaleLowerCase(),
				placeHolder: ''
			};

			if (this.enablePlaceholder) {
				country.placeHolder = this.getPhoneNumberPlaceHolder(country.iso2.toUpperCase());
			}

			this.allCountries.push(country);
		});
	}

	protected getPhoneNumberPlaceHolder(countryCode: string): string {
		try {
			return this.phoneUtil.format(this.phoneUtil.getExampleNumber(countryCode), lpn.PhoneNumberFormat.INTERNATIONAL);
		} catch (e) {
			return e;
		}
	}

	registerOnChange(fn: any): void {
		this.propagateChange = fn;
	}

	registerOnTouched(fn: any) {
		this.onTouched = fn;
	}

	setDisabledState(isDisabled: boolean): void {
		this.disabled = isDisabled;
	}

	writeValue(obj: any): void {
		if (obj) {
			this.phoneNumber = obj;

			setTimeout(() => {
				this.changedFromWriteValue = true
				this.onPhoneNumberChange();
				this.cdr.detectChanges();
			}, 1);
		}
		else {
		this.phoneNumber = null;
		setTimeout(() => {
			this.changedFromWriteValue = true
			this.onPhoneNumberChange();
			this.cdr.detectChanges();
		}, 1);
	  }
	}

	private getCountryIsoCode(countryCode: number, number: lpn.PhoneNumber): string | undefined {
		// Will use this to match area code from the first numbers
		const rawNumber = number.toString(); //.values_['2'].toString();

		// List of all countries with countryCode (can be more than one. e.x. US, CA, DO, PR all have +1 countryCode)
		const countries = this.allCountries.filter(c => c.dialCode === countryCode.toString());
		// Main country is the country, which has no areaCodes specified in country-code.ts file.
		const mainCountry = countries.find(c => c.areaCodes === undefined);
		// Secondary countries are all countries, which have areaCodes specified in country-code.ts file.
		const secondaryCountries = countries.filter(c => c.areaCodes !== undefined);
		let matchedCountry = mainCountry ? mainCountry.iso2 : undefined;

		/*
			Interate over each secondary country and check if nationalNumber starts with any of areaCodes available.
			If no matches found, fallback to the main country.
		*/
		secondaryCountries.forEach(country => {
			country.areaCodes.forEach(areaCode => {
				if (rawNumber.startsWith(areaCode)) {
					matchedCountry = country.iso2;
				}
			});
		});

		return matchedCountry;
	}

}
