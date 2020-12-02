import { Component, OnInit, Input, Output, EventEmitter, forwardRef, Self } from '@angular/core';
import { FormControl, NG_VALUE_ACCESSOR, ControlValueAccessor, Validators, NgControl, NG_VALIDATORS, Validator } from '@angular/forms';
import { TranslateService } from '@ngx-translate/core';

const noop = () => {
};


@Component({
    selector: 'custom-text-box',
    templateUrl: './text-box.component.html',
    providers: [
        { provide: NG_VALUE_ACCESSOR, useExisting: forwardRef(() => TextBoxComponent), multi: true },
        {
            provide: NG_VALIDATORS,
            useExisting: forwardRef(() => TextBoxComponent),
            multi: true,
        }
    ]
})
export class TextBoxComponent implements ControlValueAccessor, OnInit, Validator {
    constructor(protected translateService: TranslateService, ) {
    }
    ngOnInit(): void {
        if (this.maxLength == null || this.maxLength == undefined) this.maxLength = 50;
    }
    public scriptError: boolean = false;
    public validate(c: FormControl) {
        if (c.value && /[<>]/.test(c.value)) {
            this.scriptError = true;
            return {
                scriptError: {
                    valid: false,
                },
            };
        }
        this.scriptError = false;
        return null;
    }
    //The internal data model
    private innerValue: any = '';
    @Input() isRequiredLabel: boolean = false;
    @Input() label: string = '';
    @Input() fieldLang: string = '';
    @Input() type: string = 'text';
    @Input() placeholder: any = '';
    @Input() maxLength: number = 50;
    @Input() minLength: number = 0;
    @Input() min: number = 0;
    @Input() max: number;
    @Input() isReadOnly: boolean = false;
    @Input() tabIndex: number = null;
    @Input() disabled = false;


    @Output()
    onBlur = new EventEmitter<string>();

    @Output()
    onChange = new EventEmitter<string>();

    //Placeholders for the callbacks which are later provided
    //by the Control Value Accessor
    private onTouchedCallback: () => void = noop;
    private onChangeCallback: (_: any) => void = noop;

    //get accessor
    get value(): any {

        if (this.innerValue) {
            return this.innerValue.trim();
        }

        return this.innerValue
    };

    //set accessor including call the onchange callback
    set value(v: any) {
        if (v !== this.innerValue) {

            if (v) {
                this.innerValue = v.toString().trim();
            }
            else {
                if (v === "") {
                    this.innerValue = null;
                }
                else {
                    this.innerValue = v;
                }
            }

            this.onChangeCallback(this.innerValue);
        }
    }

    //Set touched on blur
    onBlurFn() {
        this.onBlur.emit(this.value);
        this.onTouchedCallback();
    }

    //Set touched on change
    onChangeFn() {
        this.onChange.emit(this.value);
    }

    //From ControlValueAccessor interface
    writeValue(value: any) {
        if (value !== this.innerValue) {

            if (value) {
                this.innerValue = value.toString().trim();
            }
            else {
                this.innerValue = value;
            }

        }
    }

    //From ControlValueAccessor interface
    registerOnChange(fn: any) {
        this.onChangeCallback = fn;
    }

    //From ControlValueAccessor interface
    registerOnTouched(fn: any) {
        this.onTouchedCallback = fn;
    }
}
