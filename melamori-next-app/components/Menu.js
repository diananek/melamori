import MenuList from "./MenuList";
import {useEffect} from "react";

export default function Menu() {
    useEffect(() => {
        const burgerMenu = () => {
            const menuIcon = document.querySelector('.menu__icon');

            if (menuIcon) {
                const menuBody = document.querySelector('.menu__list');
                menuIcon.addEventListener('click', function() {
                    document.body.classList.toggle('menu__list_lock');
                    menuIcon.classList.toggle('menu__icon_active');
                    menuBody.classList.toggle('menu__list_active');
                });
            }
        }
        burgerMenu()
    }, [])

    return(
        <nav className="header__nav menu">
            <div className="menu__icon">
                <span> </span>
            </div>
            <MenuList className={"menu__list_catalog"}/>
        </nav>
    )
}