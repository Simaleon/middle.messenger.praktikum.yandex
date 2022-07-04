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
    private readonly _properties: Record<string, any> = {};

    constructor(properties: Record<string, any> = {}) {
        // avoid re-creating the object on next calls
        const components = this.components();

        this.components = () => {
            return components;
        };

        const methods = this.methods();

        this.methods = () => {
            return methods;
        };

        const eventBus = this.eventBus();

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

    private _componentDidMount() {
        this.componentDidMount();
    }

    private _componentDidUpdate(oldProps: Record<string, any>, newProps: Record<string, any>) {
        if(this.componentDidUpdate(oldProps, newProps)) {
            this.eventBus().emit(Component.EVENTS.FLOW_RENDER);
        }
    }

    private render() {
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

    protected methods(): Record<string, () => void> {
        return {};
    }

    protected template(): string {
        throw new Error('Method should be overridden');
    }

    componentDidMount() {
        return true;
    }

    componentDidUpdate(oldProps: Record<string, any>, newProps: Record<string, any>) {
        oldProps && newProps;

        return true;
    }

    dispatchComponentDidMount() {
        this.eventBus().emit(Component.EVENTS.FLOW_CDM);
    }

    element(): HTMLElement {
        return this._element as HTMLElement;
    }

    eventBus() {
        return this._eventBus;
    }

    init() {
        this.eventBus().emit(Component.EVENTS.FLOW_RENDER);
    }

    setProperties(newProperties: Record<string, any>): Component {
        if(newProperties) {
            merge(this._properties, newProperties);
        }

        return this;
    }
}
