import { TestBed, inject } from '@angular/core/testing';

import { LettersComponent } from './letters.component';

describe('a letters component', () => {
	let component: LettersComponent;

	// register all needed dependencies
	beforeEach(() => {
		TestBed.configureTestingModule({
			providers: [
				LettersComponent
			]
		});
	});

	// instantiation through framework injection
	beforeEach(inject([LettersComponent], (LettersComponent) => {
		component = LettersComponent;
	}));

	it('should have an instance', () => {
		expect(component).toBeDefined();
	});
});