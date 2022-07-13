import EventBus from "../EventBus";
import Templator from "./Templator";
import { merge } from "./utils";

export default class Component {
    static EVENTS = {
        INIT: "init",
        FLOW_CDM: "flow:component-did-mount",
        FLOW_RENDER: "flow:render",
        FLOW_CDU: "flow:component-did-update"
    };

    private _element: HTMLElement | null = null;
    private _eventBus: EventBus = new EventBus();
    private _events: Record<string, (...args: any) => void> = {};
    private readonly _properties: Record<string, any> = {};

    constructor(properties: Record<string, any> = {}) {
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

        Object.keys(properties).forEach((prop: string) => {
            if(prop.startsWith('@:')) {
                this._events[prop.substring(2)] = properties[prop];

                delete properties[prop];
            }
        });

        this._properties = new Proxy(merge(this.data(), properties), {
            set(target: Record<string, any>, prop: string, val: any) {
                const oldTarget = structuredClone(target);

                target[prop] = val;

                eventBus.emit(Component.EVENTS.FLOW_CDU, oldTarget, target);

                return true;
            },
            deleteProperty() {
                // todo
                return true;
            }
        });

        eventBus.on(Component.EVENTS.INIT, this.init.bind(this));
        eventBus.on(Component.EVENTS.FLOW_CDM, this._componentDidMount.bind(this));
        eventBus.on(Component.EVENTS.FLOW_RENDER, this.render.bind(this));
        eventBus.on(Component.EVENTS.FLOW_CDU, this._componentDidUpdate.bind(this));

        eventBus.emit(Component.EVENTS.INIT);
    }

    private _componentDidMount(): void {
        this.componentDidMount();
    }

    private _componentDidUpdate(oldProps: Record<string, any>, newProps: Record<string, any>): void {
        if(this.componentDidUpdate(oldProps, newProps)) {
            this.eventBus().emit(Component.EVENTS.FLOW_RENDER);
        }
    }

    private init(): void {
        this._events.init && this._events.init(this);

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

    protected data(): Record<string, any> {
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

    componentDidUpdate(oldProps: Record<string, any>, newProps: Record<string, any>): boolean {
        oldProps && newProps;

        return true;
    }

    dispatchComponentDidMount(): void {
        this.eventBus().emit(Component.EVENTS.FLOW_CDM);
    }

    element(): HTMLElement {
        return this._element as HTMLElement;
    }

    properties() {
        return this._properties;
    }

    setProperties(newProperties: Record<string, any>): Component {
        if(newProperties) {
            Object.assign(this._properties, newProperties);
        }

        return this;
    }
}
