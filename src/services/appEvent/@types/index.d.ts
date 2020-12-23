type ModalCloseType = 'CLOSE' | 'DISMISS' | 'DISMISS_BACKDROP' | 'DESTORY';
type ModalOpenType = 'info' | 'warn' | 'error' | 'confirm';
interface ModalOpenInfo {
    type: ModalOpenType;
    key: string;
    title: string;
    content: string;
}
interface ModalCloseInfo {
    type: ModalCloseType;
    openInfo: ModalOpenInfo;
}
type ModalOpenCallback = (openInfo: ModalOpenInfo) => void;
type ModalCloseCallback = (closeInfo: ModalCloseInfo) => void;
type EventUnbinder = () => void;