import EventBus from "./EventBus";
import { keyValueObject } from "./types";
import { set } from './utils';

export enum StoreEvents {
    Updated = 'updated'
}

class Store extends EventBus {
    private readonly _state: keyValueObject = {};

    getState() {
        return this._state;
    }

    set(path: string, value: unknown) {
        set(this._state, path, value);

        this.emit(StoreEvents.Updated, this.getState());
    };
}

export default new Store();