import * as React from 'react';
import {properties, stylable} from 'wix-react-tools';
import styles from '../../demo/style.st.css';

export const WithThemeDAID = 'THEMED_CONTAINER';
export const WithTheme = (Node?: React.ReactNode, daid?: string, theme = styles): React.SFC => {
    return stylable(theme)(
        () => <div data-automation-id={WithThemeDAID}>{Node}</div>
    );
};