import { Component, EventEmitter, Input, OnInit, Output, OnChanges, SimpleChanges, forwardRef } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { TranslateService } from '@ngx-translate/core';

const noop = () => {
};


@Component({
    selector: 'mutliselect',
    templateUrl: './mutliselect.component.html',
    providers: [
        { provide: NG_VALUE_ACCESSOR, useExisting: forwardRef(() => MutliselectComponent), multi: true },
    ]
})
export class MutliselectComponent implements OnInit, OnChanges, ControlValueAccessor {



    @Input() options: any[];
    @Input() viewMode: boolean;
    @Input() propertyToSelect: string;
    @Input() multiple: boolean;
    @Input() config: any;
    @Input() isRequiredLabel: boolean = false;
    @Input() label: string = '';
    @Input() searchlabel: string = this.label;
    @Input() selectedItems: boolean = true;
    @Output() change = new EventEmitter<any>();
    configCopy: any;

    obj: any = null;
    switch: boolean = false;
    _value;
    private onTouchedCallback: () => void = noop;
    private onChangeCallback: (_: any) => void = noop;
    @Input() specifySearchPlaceholder: boolean;

    constructor(private translateService: TranslateService) { }
    ngOnInit() {
        // this.configCopy = Object.assign({}, this.config);
        // console.log("Config Copy aho" + JSON.stringify(this.configCopy));
    }

    get Value() {
        return this._value;
    }

    set Value(val) {
        this._value = val;

        this.onChangeCallback(this._value);
        this.onTouchedCallback();
        //this.change.emit(this._value);

    }

    writeValue(data: any): void {

        if (data !== undefined && data !== null) {
            this._value = data;
            // this.change.emit(this._value);
            if (this.options) {
                if (this.multiple) {
                    // convert data to string value
                    data = data.map(String);
                    this.obj = this.options.filter(s => {
                        if (data.indexOf(s[this.propertyToSelect]) != -1) {
                            return s;
                        }
                    })
                }
                else {
                    // convert data to string value
                    data = data.toString();
                    this.obj = this.options.filter(s => {
                        if (data === s[this.propertyToSelect]) {
                            return s;
                        }
                    })[0];
                }
                setTimeout(() => {
                    this.switch = !(this.switch);
                })
            }
        }
        else {
            this._value = null;
            this.obj = null;
            setTimeout(() => {
                this.switch = !(this.switch);
            })
        }

    }

    registerOnChange(fn) {
        this.onChangeCallback = fn;
    }
    registerOnTouched(fn: any): void {
        this.onTouchedCallback = fn;
    }


    ngOnChanges(changes: any) {
        if (changes['options']) {
            this.configCopy = Object.assign({}, this.config);
            if (this.specifySearchPlaceholder) {
                this.translateService.get(this.searchlabel).subscribe(
                    lbl => {
                        this.configCopy['searchPlaceholder'] += ` ${lbl}`;
                    }
                )
            }
        }
        if (changes['options'] && this.options && this.Value) {
            if (this.multiple) {
                this.Value = this.Value.map(String);
                this.obj = this.options.filter(s => {
                    if (this.Value.indexOf(s[this.propertyToSelect]) != -1) {
                        return s;
                    }
                })
            }
            else {
                //this.Value = this.Value.toString();
                setTimeout(() => {
                    this.obj = this.options.filter(s => {
                        if (this.Value) {
                            if (this.Value.toString() == s[this.propertyToSelect]) {
                                return s;
                            }
                        }
                    })[0];
                    if (!this.obj) {
                        this.Value = null;
                    }
                    
                }, 100);
                
            }
        }
    }

    onChangeHandler(event): void {
        if (this.multiple) {
            this.Value = this.obj.map(s => {
                return s[this.propertyToSelect]
            });
        }
        else {
            if (this.obj) {
                this.Value = this.obj[this.propertyToSelect];
            }
            else {
                this.Value = null;
            }
        }
        this.change.emit(this.Value);
    }
}
