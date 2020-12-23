import { useRouter, NextRouter } from 'next/router';
import Link from 'next/link';
import classnames from 'classnames';
import MenuTree from '@Variables/menuTree'

const isActive = (item: IMenuTree, router: NextRouter): boolean => {
    return router.pathname === (item.pathname || item.href);
}
const isSubActive = (item: IMenuTree, router: NextRouter): boolean => {
    if (item.child) {
        return item.child.find((sitem) => {
            return isActive(sitem, router) || isSubActive(sitem, router);
        }) ? true : false;
    }
    return false;
}

interface MenuItemProps {
    item: IMenuTree;
    router: NextRouter;
}
const MenuItem = ({ item, router }: MenuItemProps) => {
    return (
        <li className={classnames({
            on: isActive(item, router),
            son: isSubActive(item, router)
        })}>
            <Link href={item.href}><a>{item.label}</a></Link>
            {item.child ?
                (<ul>
                    {item.child.map((sitem, index) => <MenuItem key={index} item={sitem} router={router} />)}
                </ul>)
                : null}
        </li>
    );
}

const NavTop = () => {
    const router = useRouter();
    return (
        <nav>
            <div>Top Navigation</div>
            <ul>
                {MenuTree.map((value, index) => <MenuItem key={index} item={value} router={router} />)}
            </ul>
        </nav>
    );
}
export default NavTop;