import {DriverBase, selectDom, simulate, trigger} from 'test-drive-react';
import {DatePicker} from '../../src';
import baseStyle from '../../src/components/date-picker/date-picker.st.css';
import {getDayNames} from '../../src/utils';
import {elementHasStylableState} from '../utils';

const bodySelect = selectDom(document.body);
const datePickerDropdown = 'DATE_PICKER_DROPDOWN';

export class DatePickerTestDriver extends DriverBase {
    public static ComponentClass = DatePicker;

    public get input(): HTMLInputElement {
        return this.select<HTMLInputElement>('DATE_PICKER_INPUT');
    }

    public get selectedDate(): string {
        return this.select<HTMLInputElement>('DATE_PICKER_INPUT').value;
    }

    public changeDate(value: string): void {
        trigger.change(this.input, value);
        simulate.blur(this.input);
    }

    public focus(): void {
        simulate.focus(this.input);
    }

    public clickOnDatePicker(): void {
        simulate.mouseDown(this.input);
    }

    public clickOnDay(day: number): void {
        simulate.mouseDown(this.getDay(day));
    }

    public clickOnNextMonth(): void {
        simulate.mouseDown(this.nextMonthLabel);
    }

    public clickOnPrevMonth(): void {
        simulate.mouseDown(this.prevMonthLabel);
    }

    public clickOnHeader(): void {
        simulate.mouseDown(this.calendarHeader);
    }

    public clickOnMonth(month: string): void {
        simulate.mouseDown(this.getMonth(month));
    }

    public openCalender(): void {
        simulate.click(this.select('CALENDAR_ICON'));
    }

    public isOpen(): boolean {
        return !!this.dropDown;
    }

    public keyPress(keyCode: number): void {
        simulate.keyDown(this.input, {keyCode});
    }

    public simulateInput(): void {
        simulate.input(this.input);
    }

    public get nextMonthLabel(): HTMLSpanElement | null {
        return bodySelect('NEXT_MONTH_BUTTON');
    }

    public get prevMonthLabel(): HTMLSpanElement | null {
        return bodySelect('PREV_MONTH_BUTTON');
    }

    public get dropDown(): HTMLDivElement | null {
        return bodySelect(datePickerDropdown);
    }

    public get calendarHeader(): HTMLSpanElement | null {
        return bodySelect('CALENDAR_HEADER');
    }

    public get monthView(): HTMLDivElement | null {
        return bodySelect('MONTH_VIEW');
    }

    public getDay(day: number | string): HTMLSpanElement | null {
        return bodySelect(datePickerDropdown, `DAY_${day}`);
    }

    public getPrevDay(day: number | string): HTMLSpanElement | null {
        return bodySelect(datePickerDropdown, `PREV_DAY_${day}`);
    }

    public getNextDay(day: number | string): HTMLSpanElement | null {
        return bodySelect(datePickerDropdown, `NEXT_DAY_${day}`);
    }

    public getDayName(dayName: number): HTMLSpanElement | null {
        if (dayName < 0 || dayName > 6) {
            return null;
        }
        const dayNames: string[] = getDayNames();
        return bodySelect(datePickerDropdown, `DAY_NAME_${dayNames[dayName].toUpperCase()}`);
    }

    public get headerDate(): HTMLSpanElement | null {
        return bodySelect(datePickerDropdown, 'HEADER_DATE');
    }

    public getMonth(month: string): HTMLSpanElement | null {
        return bodySelect(datePickerDropdown, `MONTH_${month.toUpperCase()}`);
    }

    public elementHasStylableState(element: Element, stateName: string): boolean {
        return elementHasStylableState(element, baseStyle, stateName);
    }
}
