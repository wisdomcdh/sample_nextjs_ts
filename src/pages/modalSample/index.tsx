import { useState } from 'react'
import AppAlert from '@Services/appAlert';
import Modal from '@Components/common/modal';

const modalSample = () => {
    const [modalShow, setModalShow] = useState(false);
    const alertInfo = () => {
        AppAlert.info({ title: 'Alert.info', content: 'information...' })
            .result.then(closeInfo => {
                console.log('Alert.info: close', closeInfo);
            })
    }
    const alertConfirm = () => {
        AppAlert.confirm({ title: 'Alert.confirm', content: 'are you ok?' })
            .result.then(closeInfo => {
                console.log('Alert.confirm: close', closeInfo);
            }, closeInfo => {
                console.log('Alert.confirm: dismiss', closeInfo);
            })
    };
    const modal = () => {
        setModalShow(true);
    }
    const onCloseModal = () => {
        setModalShow(false);
    }
    return (
        <>
            <h1>Modal Sample</h1>
            <hr />
            <button onClick={alertInfo}>Alert.info</button>
            <button style={{ marginLeft: 4 }} onClick={alertConfirm}>Alert.confirm</button>
            <button style={{ marginLeft: 4 }} onClick={modal}>Modal.show</button>
            <hr />
            <Modal show={modalShow} onClose={onCloseModal}>
                <>
                    <span>Modal...</span>
                </>
            </Modal>
        </>
    );
}

export default modalSample;