import Link from "next/link";
import Image from "next/image";
import logo from "../public/img/logo.svg";
import Menu from "./Menu";
import {useAppContext} from "../context/state";

export default function Header() {
    const ctx = useAppContext()
    const basketCount = ctx.cookieBasketId !== undefined ? ctx.cookieBasketId.length : 0 // кол-во товаров в корзине
    const favoritesCount = ctx.cookieFavId !== undefined ? ctx.cookieFavId.length : 0 // кол-во товаров в избранных
    return(
        <header className="header header_catalog">
            <div className="header__body container">
                <Menu/>
                <Link href="/">
                    <a className="header__logo">
                        <Image src={logo} alt="Логотип Me Lamori" layout={"fill"}/>
                    </a>
                </Link>
                <Link href={"/favorites"}>
                    <a className="header__favorites header__favorites_catalog">
                        {favoritesCount !== 0 ? <span>{favoritesCount}</span>: undefined}
                    </a>
                </Link>
                <Link href={"/basket"}>
                    <a className="header__basket header__basket_catalog">
                        {basketCount !== 0 ? <span>{basketCount}</span>: undefined}
                    </a>
                </Link>
            </div>
        </header>
    )
}