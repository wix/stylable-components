import * as React from 'react';
import { SBComponent, SBStateless } from 'stylable-react-component/dist/stylable-react';
import { CaretDown } from './drop-down-icons';
import { SelectionList } from '../selection-list';
import { root } from 'wix-react-tools';
import style from './drop-down.st.css';

export const dropDownDefaultText = 'Default Text';

export interface DropDownLabelProps {
    selectedItem?: DropDownItem;
    onClick?: React.EventHandler<React.MouseEvent<HTMLDivElement>>;
}

export const DropDownInput: React.SFC<DropDownLabelProps> = SBStateless(props => {
  return (
      <div data-automation-id="DROP_DOWN_INPUT" onClick={props.onClick} className="drop-down-input">
          <span className="label">{props.selectedItem ? props.selectedItem.label : dropDownDefaultText}</span>
          <CaretDown className="caret" />
      </div>
  );
}, style);

export interface DropDownListProps {
    open: boolean;
    items?: object[];
    selectedItem: DropDownItem | undefined;
}

export const DropDownList: React.SFC<DropDownListProps> = SBStateless(props => {
    if (!props.open) { return null; }

    return (
        <div data-automation-id="DROP_DOWN_LIST">
            <SelectionList dataSource={props.items!.map((item: DropDownItem) => item.label)} value={props.selectedItem && props.selectedItem.label}/>
        </div>
    );
}, style);

export interface DropDownItem {
    label: string;
}

export interface DropDownProps extends React.HTMLAttributes<HTMLDivElement> {
    selectedItem?: DropDownItem;
    onLabelClick?: React.EventHandler<React.MouseEvent<HTMLDivElement>>;
    open?: boolean;
    items?: object[];
}

@SBComponent(style)
export class DropDown extends React.Component<DropDownProps, {}> {

    public static defaultProps: DropDownProps = { items: [] };

    public render() {
        const rootProps = root(this.props, { className: 'drop-down' }, ['onLabelClick']);

        return (
            <div data-automation-id="DROP_DOWN" {...rootProps}>
                <DropDownInput selectedItem={this.props.selectedItem} onClick={this.props.onLabelClick} />
                <DropDownList
                    selectedItem={this.props.selectedItem}
                    items={this.props.items}
                    open={!!this.props.open}
                />
            </div>
        );
    }
}
