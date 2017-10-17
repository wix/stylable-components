import * as React from 'react';
import {properties, stylable} from 'wix-react-tools';
import {Popup} from '../../';
import {ChangeEvent} from '../../types/events';
import {FormInputProps} from '../../types/forms';
import {noop} from '../../utils';
import {CaretDown} from '../drop-down/drop-down-icons';
import {
    SelectionListItemValue,
    SelectionListModel,
    SelectionListOptionList
} from '../selection-list/selection-list-model';
import {SelectionListView} from '../selection-list/selection-list-view';
import style from './auto-complete.st.css';

export type FilterPredicate = (item: string, filterString: string) => boolean;

export interface AutoCompleteProps extends FormInputProps<string>,
    Partial<SelectionListOptionList>,
    properties.Props {
    open?: boolean;
    filter?: FilterPredicate;
    onOpenStateChange?: (e: ChangeEvent<boolean>) => void;
    minCharacters?: number;
    maxSearchResults?: number;
    showNoSuggestions?: boolean;
    noSuggestionsNotice?: string | React.ReactElement<any>;
    allowFreeText?: boolean;
    disabled?: boolean;
}

export interface AutoCompleteState {
    input: HTMLInputElement | null;
}

const prefixFilter: FilterPredicate = (item: string, prefix: string) => {
    return item.toLowerCase().startsWith(prefix.toLowerCase());
};

@stylable(style)
@properties
export class AutoComplete extends React.Component<AutoCompleteProps, AutoCompleteState> {
    public static defaultProps: AutoCompleteProps = {
        open: false,
        dataSource: [],
        value: '',
        filter: prefixFilter,
        onChange: noop,
        onOpenStateChange: noop,
        minCharacters: 0,
        maxSearchResults: 0,
        showNoSuggestions: false,
        noSuggestionsNotice: 'No Results',
        allowFreeText: true,
        disabled: false
    };
    public state = {input: null, isOpen: this.props.open!};

    public render() {
        const ariaProps = {
            'aria-haspopup': true,
            'aria-expanded': this.props.open ? true : false
        };
        const list = new SelectionListModel();
        list.addDataSource({dataSource: this.getFilteredItems(this.props.value!)});

        return (
            <div
                {...ariaProps}
                data-automation-id="AUTO_COMPLETE"
                role="combobox"
            >
                <input
                    className="autoCompleteInput"
                    data-automation-id="AUTO_COMPLETE_INPUT"
                    type="text"
                    onChange={this.onChange}
                    value={this.props.value}
                    ref={this.refCallback}
                    disabled={this.props.disabled}
                    role="textbox"
                    {...{'aria-autocomplete': 'list'}}
                />
                <CaretDown onClick={this.onCaretClick} className="caret" data-automation-id="AUTO_COMPLETE_CARET"/>
                <Popup
                    anchor={this.state.input}
                    open={this.props.open && this.props.value!.length >= this.props.minCharacters!}
                >
                    {this.addSelectionList(list)}
                    {this.props.children}
                </Popup>
            </div>
        );
    }

    private refCallback = (ref: HTMLInputElement) => {
        if (!this.state.input) {
            this.setState({input: ref});
        }
    }

    private onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (this.props.allowFreeText || this.getFilteredItems(e.target.value).length) {
            this.props.onChange!({value: e.target.value || ''});
            if (!this.props.value && !this.props.open) {
                this.props.onOpenStateChange!({value: !this.props.open!});
            }
        }
    }

    private onClick = (e: ChangeEvent<SelectionListItemValue>) => {
        this.props.onChange!(e);
        this.props.onOpenStateChange!({value: !this.props.open});
    }

    private onCaretClick = () => {
        this.props.onOpenStateChange!({value: !this.props.open});
    }

    private getFilteredItems(value: string): string[] {
        const items = this.props.dataSource!
            .filter((item: string) => this.props.filter!(item, value)) as string[];
        return this.props.maxSearchResults ? items.slice(0, this.props.maxSearchResults) : items;
    }

    private addSelectionList(list: SelectionListModel) {
        if (!list.items.length) {
            if (typeof this.props.noSuggestionsNotice === 'string') {
                list.addDataSource({dataSource: [this.props.noSuggestionsNotice]});
            } else {
                return this.props.noSuggestionsNotice;
            }
        }
        return (
            <SelectionListView
                className="root auto-complete-list"
                list={list}
                onChange={this.onClick}
            />
        );
    }
}
