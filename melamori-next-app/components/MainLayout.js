import Head from "next/head";
import Image from "next/image";
import Link from "next/link";
import footerLogo from "../public/img/footer/footer__logo.svg";
import instagramIcon from "../public/img/footer/foooter__inst.svg"
import Header from "./Header";
import CookieWindow from "./CookieWindow";
import DynamicAdapt from "../components/dynamicAdapt";

export default function MainLayout({children, title = "MeLamori"}) {
    return(
        <>
            <Head>
                <title>{title}</title>
            </Head>
            <div className="wrapper">
                <Header/>
                <main className="page">
                    {children}
                    <CookieWindow/>
                </main>
                <footer className="footer">
                    <div className="container footer__container ">
                        <div className="footer__logo ">
                            <Image src={footerLogo} layout={"fill"}/>
                        </div>
                        <section className="footer__section goods ">
                            <div className="footer__section-title ">Товары</div>
                            <ul className="footer__categories ">
                                <li>
                                    <Link href="/catalog/beds">
                                        <a className="footer__item goods__item ">Кровати</a>
                                    </Link>
                                </li>
                                <li>
                                    <Link href="/catalog/mattresses">
                                        <a className="footer__item goods__item ">Матрасы</a>
                                    </Link>
                                </li>
                                <li>
                                    <Link href="/catalog/sofas">
                                        <a className="footer__item goods__item ">Мягкая мебель</a>
                                    </Link>
                                </li>
                                <li>
                                    <Link href="/catalog/pillows">
                                        <a className="footer__item goods__item ">Одеяла и подушки</a>
                                    </Link>
                                </li>
                                <li>
                                    <Link href="/catalog/care">
                                        <a className="footer__item goods__item ">Уход за матрацем</a>
                                    </Link>
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
                            <a href="https://www.instagram.com/me.lamorii/" className="contacts__icon">
                                <Image src={instagramIcon} alt="Instagram icon" />
                            </a>
                            <div className="contacts__text ">
                                Подпишитесь на наш <a href="https://www.instagram.com/me.lamorii/" className="contacts__link ">инстаграм</a>,<br/> чтобы не
                                пропустить акции!
                            </div>
                        </div>
                    </div>
                </footer>
            </div>
            <DynamicAdapt/>
        </>
    )
}