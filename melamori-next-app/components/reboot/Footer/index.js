import React from 'react';
import Image from 'next/image'
import Link from 'next/link'
import {useSelector} from "../../../lib/hooks/useState";
import fp from "lodash/fp";
import {TgIcon, VkIcon} from "../icons";


// const InstagramIcon = () => (
//     <svg width="40" height="40" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg" className={'contacts__icon'} aria-label={'Instagram'}>
//         <path fillRule="evenodd" clipRule="evenodd" d="M28.75 3.125H11.25C6.76269 3.125 3.125 6.76269 3.125 11.25V28.75C3.125 33.2373 6.76269 36.875 11.25 36.875H28.75C33.2373 36.875 36.875 33.2373 36.875 28.75V11.25C36.875 6.76269 33.2373 3.125 28.75 3.125ZM11.25 0C5.0368 0 0 5.0368 0 11.25V28.75C0 34.9632 5.0368 40 11.25 40H28.75C34.9632 40 40 34.9632 40 28.75V11.25C40 5.0368 34.9632 0 28.75 0H11.25Z" fill="#020D2B"/>
//         <path fillRule="evenodd" clipRule="evenodd" d="M20 26.875C23.797 26.875 26.875 23.797 26.875 20C26.875 16.203 23.797 13.125 20 13.125C16.203 13.125 13.125 16.203 13.125 20C13.125 23.797 16.203 26.875 20 26.875ZM20 30C25.5228 30 30 25.5228 30 20C30 14.4772 25.5228 10 20 10C14.4772 10 10 14.4772 10 20C10 25.5228 14.4772 30 20 30Z" fill="#020D2B"/>
//         <path d="M31.875 10C31.875 8.96447 31.0355 8.125 30 8.125C28.9645 8.125 28.125 8.96447 28.125 10C28.125 11.0355 28.9645 11.875 30 11.875C31.0355 11.875 31.875 11.0355 31.875 10Z" fill="#16E7F4"/>
//     </svg>
// )


const icons = {
    vk: VkIcon(),
    telegram: TgIcon(),
}


export const Footer = () => {

    const sub = useSelector('main.sub_data.company_contacts')

    const phone = fp.find(['contact_type', 'phone_number'], sub)
    const email = fp.find(['contact_type', 'email'], sub)
    // const inst = fp.find(['contact_type', 'instagram'], sub)
    const other = fp.xorBy('contact_type', sub, [phone, email])

    // console.log(other)
    return (
        <footer className="footer">
            <div className="container footer__container">
                <div className="footer__logo">
                    <Image src="/img/footer/footer__logo.svg" alt="Логотип" layout='fill'/>
                </div>
                <section className="footer__section goods">
                    <div className="footer__section-title">Товары</div>
                    <ul className="footer__categories">
                        <li>
                            <Link href={'/catalog/bed_collection'}>
                                <a href={'/catalog/bed_collection'} className="footer__item goods__item">Кровати</a>
                            </Link>
                        </li>
                        <li>
                            <Link href={'/catalog/mattresses'}>
                                <a href={'/catalog/mattresses'} className="footer__item goods__item">Матрацы</a>
                            </Link>
                        </li>
                        <li>
                            <Link href={'/catalog/soft_furniture'}>
                                <a href={'/catalog/soft_furniture'} className="footer__item goods__item">Мягкая мебель</a>
                            </Link>
                        </li>
                        {/*<li>*/}
                        {/*    <Link href={'/'}>*/}
                        {/*        <a href={'/'} className="footer__item goods__item">Одеяла и подушки</a>*/}
                        {/*    </Link>*/}
                        {/*</li>*/}
                        {/*<li>*/}
                        {/*    <Link href={'/'}>*/}
                        {/*        <a href={''} className="footer__item goods__item">Уход за матрацем</a>*/}
                        {/*    </Link>*/}
                        {/*</li>*/}
                    </ul>
                </section>
                <section className="footer__section contacts">
                    <div className="contacts__items">
                        <div className="contacts__item">
                            <div className="footer__section-title">Контакты</div>
                            <a href={`tel:${phone.contact}`} className="footer__item contacts__tel">
                                {phone.contact}
                            </a>
                            <a href={`mailto:${email.contact}`} className="footer__item contacts__mail">
                                {email.contact}
                            </a>
                        </div>
                        <div className="contacts__item">
                            <div className="footer__cooperation">
                                <div className="contacts__subtitle">По вопросам сотрудничества</div>
                                <a href={`tel:${phone.contact}`} className="footer__item contacts__tel">
                                    {phone.contact}
                                </a>
                            </div>
                        </div>
                        <div style={{ display: 'flex'}}>
                            {other.map((i) => (
                                <a href={i.contact} className="footer__item contacts__mail" key={i.id} style={{ padding: '10px'}}>
                                    {icons[i.contact_type]}
                                </a>
                            ))}
                        </div>
                    </div>

                </section>
                {/*<div className="footer__social">*/}
                {/*    <Link href={'/'}>*/}
                {/*        <a href={'/'}>*/}
                {/*            <InstagramIcon />*/}
                {/*        </a>*/}
                {/*    </Link>*/}
                {/*    <div className="contacts__text">*/}
                {/*        Подпишитесь на наш <a href={inst.contact} className="">инстаграм</a>,<br/> чтобы не*/}
                {/*        пропустить акции!*/}
                {/*    </div>*/}
                {/*</div>*/}
            </div>

        </footer>
    );
};
