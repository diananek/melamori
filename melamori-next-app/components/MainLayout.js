import Head from "next/head";
import MenuList from "./MenuList";

export default function MainLayout({children, title = "Next App"}) {
    return(
        <>
            <Head>
                <title>{title}</title>
            </Head>
            <div className="wrapper">
                <header className="header header_catalog">
                    <div className="header__body container">
                        <nav className="header__nav menu">
                            <div className="menu__icon">
                                <span> </span>
                            </div>
                            <MenuList className={"menu__list_catalog"}/>
                        </nav>
                        <a className="header__logo" className="header__logo" href="index.html">
                            <img src="img/logo.svg" alt="Логотип Me Lamori"/>
                        </a>
                        <a href="favorites-page.html" className="header__favorites header__favorites_catalog">
                        </a>
                        <a href="basket-page.html" className="header__basket header__basket_catalog">
                        </a>
                    </div>
                </header>
                <main className="page">
                    {children}
                </main>
                <footer className="footer">
                    <div className="container footer__container ">
                        <div className="footer__logo ">
                            <img src="img/footer/footer__logo.svg " alt="Логотип "/>
                        </div>
                        <section className="footer__section goods ">
                            <div className="footer__section-title ">Товары</div>
                            <ul className="footer__categories ">
                                <li>
                                    <a href="# " className="footer__item goods__item ">Кровати</a>
                                </li>
                                <li>
                                    <a href="# " className="footer__item goods__item ">Матрацы</a>
                                </li>
                                <li>
                                    <a href="# " className="footer__item goods__item ">Мягкая мебель</a>
                                </li>
                                <li>
                                    <a href="# " className="footer__item goods__item ">Одеяла и подушки</a>
                                </li>
                                <li>
                                    <a href="# " className="footer__item goods__item ">Уход за матрацем</a>
                                </li>
                            </ul>
                        </section>
                        <section className="footer__section contacts ">
                            <div className="contacts__items ">
                                <div className="contacts__item ">
                                    <div className="footer__section-title ">Контакты</div>
                                    <a href="tel:81234567899 " className="footer__item contacts__tel ">8 (123) 456–78–99</a>
                                    <a href="mailto:MeLamori@gmail.com "
                                       className="footer__item contacts__mail ">MeLamori@gmail.com</a>
                                </div>
                                <div className="contacts__item ">
                                    <div className="footer__cooperation ">
                                        <div className="contacts__subtitle ">По вопросам сотрудничества</div>
                                        <a href="tel:81234567890 " className="footer__item contacts__tel ">8 (123)
                                            456–78–90</a>
                                    </div>
                                </div>
                            </div>

                        </section>
                        <div className="footer__social ">
                            <a href="# "><img src="img/footer/foooter__inst.svg " alt="Instagram icon "
                                              className="contacts__icon "/></a>
                            <div className="contacts__text ">
                                Подпишитесь на наш <a href="# " className="contacts__link ">инстаграм</a>,<br/> чтобы не
                                пропустить акции!
                            </div>
                        </div>
                    </div>
                </footer>
            </div>
        </>
    )
}