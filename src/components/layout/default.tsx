import NavTop from '@Components/common/nav/navTop';
interface Props {
    children: JSX.Element | Array<JSX.Element>
}
const Default = ({ children }: Props) => {
    return (
        <>
            <header></header>
            <NavTop />
            <main role="main">{children}</main>
            <footer></footer>
        </>
    );
}
export default Default;