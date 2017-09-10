import * as ReactDOM from 'react-dom';
import {Portal} from '../../src';
import {DriverBase} from 'test-drive-react';

const nullContainerExceptionMessage =
    'Portal Test Driver Error: tried to get the container of the portal when \'root()\'' +
    'function was called, but got \'null\'.' +
    'Consider using \'isPresent()\' method to make sure the container exists.';

export class PortalTestDriver extends DriverBase {
    public static ComponentClass = Portal;
    private ref: Portal;

    constructor(public readonly instance: Portal) {
        super(() => ReactDOM.findDOMNode(instance));
        this.ref = instance;
    }

    public get root(): Element {
        if (!this.ref || !this.ref.getPortalContainer()) {
            throw new Error(nullContainerExceptionMessage);
        }
        return this.ref.getPortalContainer()!.children[0];
    }

    public get content(): HTMLCollection {
        return this.ref.getPortalContainer()!.children[0].children;
    }

    public get isPresent(): boolean {
        return !!this.ref && !!this.ref.getPortalContainer();
    }
}
