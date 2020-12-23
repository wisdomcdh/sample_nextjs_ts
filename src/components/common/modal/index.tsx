import { createPortal } from "react-dom";
export interface ModalProps {
    show: boolean;
    onClose?: () => void;
    onDismiss?: () => void;
    children: JSX.Element | Array<JSX.Element>;
}
const Modal = ({ children, show, onClose = () => { }, onDismiss = () => { } }: ModalProps) => {
    return process.browser && show ? createPortal(
        <div>
            <div>
                {children}
            </div>
            <div>
                <button onClick={onClose}>Close</button>
            </div>
            <div onClick={onDismiss}></div>
        </div>, document.body) : null
}
export default Modal;