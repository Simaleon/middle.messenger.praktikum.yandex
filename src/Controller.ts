import Model from "./Model";
import Component from "./templator/Component";

export default class Controller {
    private _container: HTMLElement;
    private _component: Component;

    constructor(container: HTMLElement, component: typeof Component, opts?: { model?: typeof Model, data?: Record<string, any> }) {
        this._container = container;
        this._component = new component(opts?.data);

        if(opts?.model) {
            opts.model.getData().then((result: any) => {
                this._component.setProperties(result);

                this.mount();
            });
        } else {
            this.mount();
        }
    }

    private mount(): void {
        this._container.appendChild(this._component.element());

        this._component.dispatchComponentDidMount();
    }
}
