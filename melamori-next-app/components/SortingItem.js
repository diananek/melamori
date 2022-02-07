
import {useRouter} from "next/router";
import clsx from "clsx";

export default function SortingItem({ id, children }) {
    const router = useRouter();
    const active = (router.query?.sorting ?? "price") === id;

    const handleClick = () => {
        router.replace(
            {
                pathname: router.pathname,
                query: { sorting: id }
            },
            void 0

        );
    };

    return (
        <li onClick={handleClick} className={clsx('sorting__item', active && 'sorting__item_active')}>
            {children}
        </li>
    );
}