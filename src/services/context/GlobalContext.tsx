import { createContext, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import AppEvent from '@Services/appEvent';
import Action from '@Action';

if (process.env.extend.onMockApi) {
    require('../../../mock/mock-api');
}

const GlobalContext = createContext<IGlobalContext>({});

interface Props {
    children: JSX.Element | Array<JSX.Element>
}
const GlobalContextProvider = ({ children }: Props) => {
    const dispatch = useDispatch();
    const modalOpenHandler = (openInfo: ModalOpenInfo) => {
        dispatch(Action._core.showModal(openInfo));
    }
    const modalCloseHandler = (closeInfo: ModalCloseInfo) => {
        dispatch(Action._core.destroyModal(closeInfo.openInfo));
    }
    useEffect(() => {
        const modalOpenEvnet = AppEvent.ON_MODAL_OPEN(modalOpenHandler);
        const modalCloseEvnet = AppEvent.ON_MODAL_CLOSE(modalCloseHandler);
        return () => {
            modalOpenEvnet();
            modalCloseEvnet();
        }
    }, []);
    return (
        <GlobalContext.Provider value={{}}>
            { children}
        </GlobalContext.Provider>
    );
};

export { GlobalContextProvider, GlobalContext };