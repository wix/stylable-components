import * as React from 'react';
import { DropDown } from '../../src';
import { DropDownItem } from '../../src/components/drop-down/drop-down';

export interface DropDownDemoState {
    selectedItem: DropDownItem | undefined;
    open: boolean;
}

const items = [
    { label: 'Muffins' },
    { label: 'Pancakes' },
    { label: 'Waffles' }
];

export class DropDownDemo extends React.Component<{}, DropDownDemoState> {

    constructor() {
        super();
        this.state = {
            selectedItem: undefined,
            open: false
        };
    }

    public onLabelClick = () => {
        this.setState({
           open: !this.state.open
        });
    };

    public render() {
        return (
            <div>
                <h3>DropDown</h3>
                <section data-automation-id="DROP_DOWN_DEMO">
                    <DropDown
                        selectedItem={this.state.selectedItem}
                        items={items}
                        onLabelClick={this.onLabelClick}
                        open={this.state.open}
                    />
                </section>
            </div>
        );
    }
}