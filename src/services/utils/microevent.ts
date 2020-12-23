/**
 * MicroEvent - to make any js object an event emitter (server or browser)
 * 
 * - pure javascript - server compatible, browser compatible
 * - dont rely on the browser doms
 * - super simple - you get it immediatly, no mistery, no magic involved
 *
 * - create a MicroEventDebug with goodies to debug
 *   - make it safer to use
*/
interface IEvents {
    [key: string]: Array<Function>;
}
class MicroEvent {
    private _events: IEvents = {};
    bind(event: string, fct: Function): void {
        this._events[event] = this._events[event] || [];
        this._events[event].push(fct);
    }
    unbind(event: string, fct: Function): void {
        if (event in this._events === false) return;
        this._events[event].splice(this._events[event].indexOf(fct), 1);
    }
    trigger(event: string, ...args: any[]): void {
        if (event in this._events === false) return;
        for (var i = 0; i < this._events[event].length; i++) {
            this._events[event][i].apply(this, Array.prototype.slice.call(arguments, 1));
        }
    }
}
export default MicroEvent;