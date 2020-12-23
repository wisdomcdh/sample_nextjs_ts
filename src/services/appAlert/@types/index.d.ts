interface AppAlertInfo {
    title: string;
    content: string;
}
interface AppAlertOpenInfo extends ModalOpenInfo {
}
interface AppAlertResult {
    result: Promise<ModalCloseInfo>,
    close: () => void,
    dismiss: () => void,
    destroy: () => void
}