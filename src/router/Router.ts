import Route from "./Route";
import Component from "../templator/Component";
import {keyValueObject} from "../types";

class Router {
    private routes: Route[] = [];
    private readonly history = window.history;
    private _currentRoute: Route | null = null;
    private readonly _rootQuery!: string;

    constructor(rootQuery: string) {
        this._rootQuery = rootQuery;
    }

    use(pathname: string, block: typeof Component, props?: keyValueObject): Router {
        this.routes.push(new Route(pathname, block, { ...props, rootQuery: this._rootQuery}));

        return this;
    }

    start() {
        window.onpopstate = (_event: PopStateEvent) => {
            //this._onRoute(event.currentTarget?.location.pathname);
            this._onRoute(window.location.pathname);
        };

        this._onRoute(window.location.pathname);
    }

    _onRoute(pathname: string) {
        const route = this.getRoute(pathname);

        if (this._currentRoute) {
            this._currentRoute.leave();
        }

        if(!route) {
            throw new Error(`There is no route with path ${pathname}`);
        }

        this._currentRoute = route;

        route.render();
    }

    go(pathname: string) {
        this.history.pushState({}, "", pathname);
        this._onRoute(pathname);
    }

    back() {
        this.history.go(-1);
    }

    forward() {
        this.history.go(1);
    }

    getRoute(pathname: string): Route | undefined {
        return this.routes.find(route => route.match(pathname));
    }
}

export default new Router('.app');