import { FormControl } from '@angular/forms';
import * as lpn from 'google-libphonenumber';

export const phoneNumberValidator = (control: FormControl) => {
	const error = { validatePhoneNumber: { valid: false } };

	let number: lpn.PhoneNumber;
	try {
		number = lpn.PhoneNumberUtil.getInstance().parse(control.value.number, control.value.countryCode);
	} catch (e) {
		return error;
	}

	if (!number) {
		return error;
	} else {

		if (!lpn.PhoneNumberUtil.getInstance().isValidNumberForRegion(number, control.value.countryCode)) {
			return error;
      }

    //console.log(lpn.PhoneNumberUtil.getNumberType());

		//if(lpn.PhoneNumberUtil.getNumberType() != 1){
		//return error;
		//}

	}

	return;
};
