import React from 'react';
import Link from 'next/link'
import Image from 'next/image'


export const Header = () => {
    return (
        <header className="header header_catalog">
            <div className="header__body container">
                <nav className="header__nav menu">
                    <div className="menu__icon">
                        <span/>
                    </div>
                    <ul className="menu__list menu__list_catalog">
                        <li className="menu__item">
                            <Link href="/">
                                <a href={'/'} className=" menu__link menu__link_selected">
                                    Кровати
                                </a>
                            </Link>
                        </li>
                        <li className="menu__item ">
                            <Link href="/">
                                <a href={"/"} className="menu__link ">
                                    Матрацы
                                </a>
                            </Link>
                        </li>
                        <li className="menu__item ">
                            <Link href="/">
                                <a href={"/"} className="menu__link ">
                                    Мягкая мебель
                                </a>
                            </Link>
                        </li>
                        <li className="menu__item ">
                            <Link href="/">
                                <a href={"/"} className="menu__link ">
                                    Одеяла и подушки
                                </a>
                            </Link>
                        </li>
                        <li className="menu__item ">
                            <Link href="/">
                                <a href={"/"} className="menu__link ">
                                    Уход за матрацем
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
                <Link href={'/'}>
                    <a href={"/"} className="header__favorites header__favorites_catalog"/>
                </Link>
                <Link href={'/'}>
                    <a href={"/"} className="header__basket header__basket_catalog"/>
                </Link>
            </div>
        </header>
    );
};

