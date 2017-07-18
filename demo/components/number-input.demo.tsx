import * as React from 'react';
import {NumberInput} from '../../src/components/number-input';

export const NumberInputDemo: React.StatelessComponent<{}> = () => (
    <div>
        <h3>Default NumberInput</h3>
        <NumberInput value={0} step={2} min={-5} max={5} />
    </div>
);
