import React from 'react';
import Link from 'next/link'
import Image from 'next/image'
import {useSelector} from "../../../lib/hooks/useState";


export const Header = () => {

    const favoriteCounter = useSelector('main.favorites.length')
    const cartCounter = useSelector('main.cart.length')

    return (
        <header className="header header_catalog">
            <div className="header__body container">
                <nav className="header__nav menu">
                    <div className="menu__icon">
                        <span/>
                    </div>
                    <ul className="menu__list menu__list_catalog">
                        <li className="menu__item">
                            <Link href={'/catalog/bed_collection'}>
                                <a href={'/catalog/bed_collection'} className=" menu__link menu__link_selected">
                                    Кровати
                                </a>
                            </Link>
                        </li>
                        <li className="menu__item ">
                            <Link href={'/catalog/mattresses'}>
                                <a href={'/catalog/mattresses'} className="menu__link ">
                                    Матрацы
                                </a>
                            </Link>
                        </li>
                        <li className="menu__item ">
                            <Link href={'/catalog/soft_furniture'}>
                                <a href={'/catalog/soft_furniture'} className="menu__link ">
                                    Мягкая мебель
                                </a>
                            </Link>
                        </li>
                        <li/>
                        <li/>
                        <li/>
                        <li className="menu__item ">
                            <Link href="/">
                                <a href={"/"} className="menu__link ">
                        {/*            Одеяла и подушки*/}
                                </a>
                            </Link>
                        </li>
                        <li className="menu__item ">
                            <Link href="/">
                                <a href={"/"} className="menu__link ">
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
                    <a href={'/my/favorites'} aria-label="favorites" className="header__favorites header__favorites_catalog">
                        {favoriteCounter > 0 && <span>{favoriteCounter > 9 ? '9+' : favoriteCounter}</span>}
                    </a>
                </Link>
                <Link href={'/my/cart'}>
                    <a href={'/my/cart'} aria-label="cart" className="header__basket header__basket_catalog">
                        {cartCounter > 0 && <span>{cartCounter > 9 ? '9+' : cartCounter}</span>}
                    </a>
                </Link>
            </div>
        </header>
    );
};

