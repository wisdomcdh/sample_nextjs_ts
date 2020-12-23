import { useDispatch } from 'react-redux'
import Api from '@Api';
import { useEffect } from 'react';
import useTypeSelector from '@Services/hooks/useTypeSelector';

const about = () => {
    const login = useTypeSelector(state => state.customer.login);
    const dispatch = useDispatch();
    const onClick = () => {
        dispatch(Api.customer.fetchLogin({ loginId: 'test', password: 'pw' }));
    }
    const onClickExtension = () => {
        dispatch(Api.customer.fetchExtension());
    }
    useEffect(() => {
        //console.log(login);
    }, [login]);
    return (
        <>
            <h1>About</h1>
            <hr />
            <button onClick={onClick}>API TEST(Login)</button>
            <button onClick={onClickExtension}>API TEST(Extension)</button>
            <hr />
            <pre>{JSON.stringify(login)}</pre>
        </>
    );
}

export default about;