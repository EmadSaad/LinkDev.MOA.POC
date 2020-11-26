import { Component, OnInit, Input, Injectable, forwardRef, Output, EventEmitter } from '@angular/core';
import {
    NgbDateStruct, NgbCalendar, NgbCalendarIslamicUmalqura, NgbDatepickerI18n
} from '@ng-bootstrap/ng-bootstrap';
import { NG_VALUE_ACCESSOR, ControlValueAccessor } from '@angular/forms';

const noop = () => {
};


@Component({
    selector: 'adahi-time-picker',
    templateUrl: './time-picker.component.html',
    providers: [
        { provide: NG_VALUE_ACCESSOR, useExisting: forwardRef(() => TimePickerComponent), multi: true }
    ]
})

export class TimePickerComponent implements ControlValueAccessor, OnInit {

    time = { hour: 12, minute: 0 };
    private onTouchedCallback: () => void = noop;
    private onChangeCallback: (_: any) => void = noop;

    @Output() onchange = new EventEmitter<any>();

    ngOnInit(): void {

    }
    writeValue(value: any) {
        if (value !== this.time) {
            this.time = value;
        }
    }

    get value(): any {
        return this.time;
    };

    //set accessor including call the onchange callback
    set value(v: any) {
        if (v !== this.time) {
            this.time = v;
            this.onChangeCallback(v);
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

    changed($event) {
        this.onchange.emit($event);
    }
}