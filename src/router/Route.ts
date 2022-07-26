import Component from "../templator/Component";
import { keyValueObject } from "../types";

type props = {
    [key: string]: any,
    rootQuery: string,
    blockProperties?: keyValueObject
}

export default class Route {
    private readonly _pathname: string;
    private readonly _blockClass: typeof Component;
    private _block: Component | null = null;
    private readonly _props: props;

    constructor(pathname: string, view: typeof Component, props: props) {
        this._pathname = pathname;
        this._blockClass = view;
        this._props = props;
    }

    match(pathname: string) {
        return pathname === this._pathname;
    }

    navigate(pathname: string) {
        if (this._pathname === pathname) {
            this.render();
        }
    }

    leave() {
        if (this._block) {
            this._block.hide();
        }
    }

    render() {
        if (this._block) {
            this._block.show();
        } else {
            this._block = new this._blockClass(this._props.blockProperties);

            document.body.querySelector(this._props.rootQuery)?.appendChild(this._block.element());

            this._block.dispatchComponentDidMount();
        }
    }
}