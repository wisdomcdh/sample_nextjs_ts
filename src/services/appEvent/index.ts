import MicroEvent from '@Services/utils/microevent';
const evt = new MicroEvent();
const withUnbinder = (eventName: string, callback: ModalOpenCallback | ModalCloseCallback): EventUnbinder => {
    evt.bind(eventName, callback);
    return function () {
        evt.unbind(eventName, callback);
    }
}
const TR_MODAL_OPEN = (openInfo: ModalOpenInfo) => evt.trigger('appEvent.MODAL_OPEN', openInfo);
const ON_MODAL_OPEN = (callback: ModalOpenCallback) => withUnbinder('appEvent.MODAL_OPEN', callback);
const TR_MODAL_CLOSE = (closeInfo: ModalCloseInfo) => {
    evt.trigger('appEvent.MODAL_CLOSE', closeInfo);
    evt.trigger('appEvent.MODAL_CLOSE_AT_' + closeInfo.openInfo.key, closeInfo);
};
const ON_MODAL_CLOSE = (callback: ModalCloseCallback) => withUnbinder('appEvent.MODAL_CLOSE', callback);
const ON_MODAL_CLOSE_AT = (openInfo: ModalOpenInfo, callback: ModalCloseCallback) => withUnbinder('appEvent.MODAL_CLOSE_AT_' + openInfo.key, callback);

export default {
    TR_MODAL_OPEN,
    ON_MODAL_OPEN,
    TR_MODAL_CLOSE,
    ON_MODAL_CLOSE,
    ON_MODAL_CLOSE_AT
}