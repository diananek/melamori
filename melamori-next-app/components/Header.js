import MenuList from "./MenuList";
import Link from "next/link";
import Image from "next/image";
import logo from "../public/img/logo.svg";

export default function Header() {
    return(
        <header className="header header_catalog">
            <div className="header__body container">
                <nav className="header__nav menu">
                    <div className="menu__icon">
                        <span> </span>
                    </div>
                    <MenuList className={"menu__list_catalog"}/>
                </nav>
                <Link href="/">
                    <a className="header__logo">
                        <Image src={logo} alt="Логотип Me Lamori" layout={"fill"}/>
                    </a>
                </Link>
                <Link href={"/favorites"}>
                    <a className="header__favorites header__favorites_catalog">
                    </a>
                </Link>
                <Link href={"/basket"}>
                    <a className="header__basket header__basket_catalog">
                    </a>
                </Link>
            </div>
        </header>
    )
}