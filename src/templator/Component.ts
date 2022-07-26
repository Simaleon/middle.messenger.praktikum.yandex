import EventBus from "../EventBus";
import Templator from "./Templator";
import { merge } from "../utils";
import { keyValueObject } from "../types";
import { cloneDeep } from "../utils";

export default class Component {
    static EVENTS = {
        INIT: "init",
        FLOW_CDM: "flow:component-did-mount",
        FLOW_RENDER: "flow:render",
        FLOW_CDU: "flow:component-did-update"
    };

    private _element: HTMLElement | null = null;
    private _eventBus: EventBus = new EventBus();
    private readonly _properties: keyValueObject = {};

    constructor(properties: keyValueObject = {}) {
        this._properties = new Proxy(merge(this.data(), properties), {
            set(target: keyValueObject, prop: string, val: any) {
                const oldTarget = cloneDeep(target);

                target[prop] = val;

                eventBus.emit(Component.EVENTS.FLOW_CDU, oldTarget, target);

                return true;
            },
            deleteProperty() {
                // todo
                return true;
            }
        });

        // avoid re-creating the object on next calls
        const components = this.components();

        this.components = () => {
            return components;
        };

        const initiatedMethods = this.methods(),
            methods: Record<string, () => void> = {},
            context = Object.assign({}, this.properties(), this.methods());

        context.element = () => this.element();

        for(const i in initiatedMethods) {
            methods[i] = (...args: any) => initiatedMethods[i].call(context, ...args);
        }

        this.methods = () => {
            return methods;
        };

        const eventBus = this.eventBus();

        eventBus.on(Component.EVENTS.INIT, this.init.bind(this));
        eventBus.on(Component.EVENTS.FLOW_CDM, this._componentDidMount.bind(this));
        eventBus.on(Component.EVENTS.FLOW_RENDER, this.render.bind(this));
        eventBus.on(Component.EVENTS.FLOW_CDU, this._componentDidUpdate.bind(this));

        eventBus.emit(Component.EVENTS.INIT);
    }

    private _componentDidMount(): void {
        this.componentDidMount();
    }

    private _componentDidUpdate(oldProps: keyValueObject, newProps: keyValueObject): void {
        if(this.componentDidUpdate(oldProps, newProps)) {
            this.eventBus().emit(Component.EVENTS.FLOW_RENDER);
        }
    }

    private init(): void {
        this.eventBus().emit(Component.EVENTS.FLOW_RENDER);
    }

    private render(): void {
        const element = Templator.compile(this.template(), {
            components: this.components(),
            data: this._properties,
            methods: this.methods()
        });

        if(this._element) {
            this._element.replaceWith(element);
        }

        this._element = element;
    }

    protected components(): Record<string, typeof Component> {
        return {};
    }

    protected data(): keyValueObject {
        return {};
    }

    protected eventBus(): EventBus {
        return this._eventBus;
    }

    protected methods(): Record<string, (...args: any) => any | void> {
        return {};
    }

    protected template(): string {
        throw new Error('Method should be overridden');
    }

    componentDidMount(): void {
        return;
    }

    componentDidUpdate(_oldProps: keyValueObject, _newProps: keyValueObject): boolean {
        return true;
    }

    dispatchComponentDidMount(): void {
        this.eventBus().emit(Component.EVENTS.FLOW_CDM);
    }

    element(): HTMLElement {
        return this._element as HTMLElement;
    }

    hide() {
        this.element().style.display = 'none';
    }

    properties() {
        return this._properties;
    }

    setProperties(newProperties: keyValueObject): Component {
        if(newProperties) {
            Object.assign(this._properties, newProperties);
        }

        return this;
    }

    show() {
        this.element().style.display = 'block';
    }
}
