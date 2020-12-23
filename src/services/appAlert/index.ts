import AppEvent from '../appEvent'

let latestKey = 0;
function getNewKey(): string {
    let key = latestKey = new Date().getTime();
    if (key === latestKey) {
        key = latestKey = new Date().getTime();
    }
    return key + "";
}

function getOpenInfo(type: ModalOpenType, info: AppAlertInfo): AppAlertOpenInfo {
    return {
        type,
        key: getNewKey(),
        title: info.title,
        content: info.content
    }
}
function getModalPromise(openInfo: AppAlertOpenInfo): AppAlertResult {
    const promise = new Promise<ModalCloseInfo>((resolve, reject) => {
        AppEvent.TR_MODAL_OPEN(openInfo);
        const evntAt = AppEvent.ON_MODAL_CLOSE_AT(openInfo, closeInfo => {
            switch (closeInfo.type) {
                case 'CLOSE':
                    resolve(closeInfo);
                    break;
                case 'DISMISS':
                    reject(closeInfo);
                    break;
                default:
                    break;
            }
            evntAt();
        });
    });

    return {
        result: promise,
        close: () => AppEvent.TR_MODAL_CLOSE({ type: 'CLOSE', openInfo }),
        dismiss: () => AppEvent.TR_MODAL_CLOSE({ type: 'DISMISS', openInfo }),
        destroy: () => AppEvent.TR_MODAL_CLOSE({ type: 'DESTORY', openInfo })
    }
}

class AppAlert {
    info = (info: AppAlertInfo): AppAlertResult => {
        return getModalPromise(getOpenInfo('info', info));
    }
    warn = (info: AppAlertInfo): AppAlertResult => {
        return getModalPromise(getOpenInfo('warn', info));
    }
    error = (info: AppAlertInfo): AppAlertResult => {
        return getModalPromise(getOpenInfo('error', info));
    }
    confirm = (info: AppAlertInfo): AppAlertResult => {
        return getModalPromise(getOpenInfo('confirm', info));
    }
}
export default new AppAlert();