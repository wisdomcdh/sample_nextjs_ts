class ReducerHandler {
    pending<T>(prop: keyof T) {
        const commonPendingHandler = (state: any, action: any): void => {
            this.status(state[prop], 'pending');
        }
        return commonPendingHandler;
    }
    fulfilled<T>(prop: keyof T) {
        const commonFulfilledHandler = (state: any, action: any) => {
            state[prop] = action.payload.detail;
            this.status(state[prop], 'fulfilled');
        }
        return commonFulfilledHandler;
    }
    rejected<T>(prop: keyof T) {
        const commonRejectedHandler = (state: any, action: any) => {
            state[prop].$errorData = action.error;
            this.status(state[prop], 'rejected');
        }
        return commonRejectedHandler;
    }
    status(that: any, type: string) {
        that.$pending = type === 'pending';
        that.$success = type === 'fulfilled';
        that.$error = type === 'rejected';
        if (type !== 'rejected') {
            delete that.$errorData;
        }
    }
}
export default new ReducerHandler();