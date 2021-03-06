import * as React from 'react';
import * as ReactDOM from 'react-dom';
import {setGlobalConfig, stylable} from 'wix-react-tools';
import {ComponentsDemo} from './components-demo';

import defaultTheme from './styles/default.st.css';
import wixTheme from './styles/wix.st.css';
const themes: any = {wix: wixTheme, default: defaultTheme};

let themeName = window.location.search.match(/theme=(\w+)/) && RegExp.$1;
themeName = (themeName && themeName in themes) ? themeName : 'default';

setGlobalConfig({devMode: true});

@stylable(themes[themeName])
class Demo extends ComponentsDemo {}

const meta = document.createElement('meta');
meta.name = 'viewport';
meta.content = 'width=device-width, initial-scale=1';
document.head.appendChild(meta);

const rootContainer = document.createElement('div');
document.body.appendChild(rootContainer);
ReactDOM.render(<Demo theme={themeName} themes={Object.keys(themes)}/>, rootContainer);
