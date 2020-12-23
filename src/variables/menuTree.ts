const MenuTree: Array<IMenuTree> = [
    {
        href: '/mypage?arg=1',
        pathname: '/mypage',
        label: 'MyPage'
    },
    {
        href: '/modalSample',
        label: 'ModalSample'
    },
    {
        href: '/about',
        label: 'About',
        child: [
            {
                href: '/about/formSample',
                label: 'FormSample'
            },
            {
                href: '/support/helpdesk',
                label: 'Helpdesk'
            }
        ]
    },
    {
        href: '/',
        label: 'Home',
    }
];

export default MenuTree;