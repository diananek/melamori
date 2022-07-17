import React, {useEffect} from 'react';
import Link from 'next/link'
import Image from 'next/image'
import {useSelector} from "../../../lib/hooks/useState";


export const Header = () => {

    const favoriteCounter = useSelector('main.favorites.length')
    const cartCounter = useSelector('main.cart.length')

    const toggleMenu = () => {
        const menuIcon = document.querySelector('.menu__icon');

        if (menuIcon) {
            const menuBody = document.querySelector('.menu__list');
            document.body.classList.toggle('menu__list_lock');
            menuIcon.classList.toggle('menu__icon_active');
            menuBody.classList.toggle('menu__list_active');
        }
    }

    useEffect(() => {


        function selectMenuItem() {
            let menu = document.body.querySelector('.menu');
            if (menu) {
                function menuHandler(e) {
                    if (e.target.classList.contains('menu__link') && document.querySelector('.menu__link_selected')) {
                        document.querySelector('.menu__link_selected').classList.remove('menu__link_selected');
                        // e.target.classList.add('menu__link_selected');
                        // toggleMenu(menuIcon, menuBody)
                    }

                }

                menu.addEventListener('click', menuHandler);
            }
        }

        function menuBurger() {
            const menuIcon = document.querySelector('.menu__icon');

            if (menuIcon) {
                // menuIcon.addEventListener('click', toggleMenu);
            }
        }

        menuBurger()
        selectMenuItem()
    }, [])

    return (
        <header className="header header_catalog">
            <div className="header__body container">
                <nav
                    className="header__nav menu"
                    onClick={toggleMenu}
                >
                    <div className="menu__icon">
                        <span/>
                    </div>
                    <ul className="menu__list menu__list_catalog">
                        <li className="menu__item">
                            <Link href={'/catalog/bed_collection'} scroll passHref prefetch={false}>
                                <a className=" menu__link menu__link_selected">
                                    Кровати
                                </a>
                            </Link>
                        </li>
                        <li className="menu__item ">
                            <Link href={'/catalog/mattresses'} scroll passHref prefetch={false}>
                                <a className="menu__link ">
                                    Матрацы
                                </a>
                            </Link>
                        </li>
                        <li className="menu__item ">
                            <Link href={'/catalog/soft_furniture'} scroll={true}>
                                <a className="menu__link ">
                                    Мягкая мебель
                                </a>
                            </Link>
                        </li>
                        <li className="menu__item ">
                            <Link href={'/catalog/mattresses_accessories'} scroll={true}>
                                <a className="menu__link ">
                                    Уход за матрацем
                                </a>
                            </Link>
                        </li>
                        <li/>
                        <li/>
                        <li/>
                        <li className="menu__item ">
                            <Link href="/">
                                <a className="menu__link ">
                                    {/*            Одеяла и подушки*/}
                                </a>
                            </Link>
                        </li>
                        <li className="menu__item ">
                            <Link href="/">
                                <a className="menu__link ">
                                    {/*            Уход за матрацем*/}
                                </a>
                            </Link>
                        </li>
                    </ul>
                </nav>
                <Link href="/">
                    <a className="header__logo" href={"/"}>
                        <Image src="/img/logo.svg" layout='fill' alt="Логотип Me Lamori"/>
                    </a>
                </Link>
                <Link href={'/my/favorites'}>
                    <a aria-label="favorites"
                       className="header__favorites header__favorites_catalog">
                        {favoriteCounter > 0 && <span>{favoriteCounter > 9 ? '9+' : favoriteCounter}</span>}
                    </a>
                </Link>
                <Link href={'/my/cart'}>
                    <a aria-label="cart" className="header__basket header__basket_catalog">
                        {cartCounter > 0 && <span>{cartCounter > 9 ? '9+' : cartCounter}</span>}
                    </a>
                </Link>
            </div>
        </header>
    );
};

