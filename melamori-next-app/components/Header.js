import Link from "next/link";
import Image from "next/image";
import logo from "../public/img/logo.svg";
import Menu from "./Menu";

export default function Header() {
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