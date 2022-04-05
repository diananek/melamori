import React from 'react';
import Image from "next/image";
import {useSelector} from "../../../lib/hooks/useState";

export const Slider = () => {

    const promo = useSelector('main.sub_data.promotion')
    return (
        <>
            <div className="container">
                <div className="page__logo">
                    <Image src="/img/logo.svg" alt="Логотип Me Lamori" layout='fill'/>
                </div>
            </div>
            <ul className="page__offers offers">
                {promo.map((i) => (
                    <li className="offers__item offers__item_dark" key={i.id}>
                        <div className="offers__img">
                            <Image src={`${process.env.serverUrl}${i.image.id}`} alt={''} width={152} height={152}/>
                        </div>
                        <div className="offers__text">
                            <div className="offers__title">{i.title}</div>
                            <div className="offers__dscr">{i.description}</div>
                        </div>
                    </li>
                ))}

                {/*<li className="offers__item offers__item_light">*/}
                {/*    <div className="offers__img">*/}
                {/*        <Image src="/img/offers/glasses.png" alt={''} width={152} height={152}/>*/}
                {/*    </div>*/}
                {/*    <div className="offers__text offers__text_dark">*/}
                {/*        <div className="offers__title">Пенсионерам</div>*/}
                {/*        <div className="offers__dscr">Скидка 5% на все товары</div>*/}
                {/*    </div>*/}
                {/*</li>*/}
                {/*<li className="offers__item offers__item_dark">*/}
                {/*    <div className="offers__img">*/}
                {/*        <Image alt={''} src="/img/offers/ruler.png" width={152} height={152}/>*/}
                {/*    </div>*/}
                {/*    <div className="offers__text">*/}
                {/*        <div className="offers__title">Свой размер</div>*/}
                {/*        <div className="offers__dscr">Изготовление товаров любого размера</div>*/}
                {/*    </div>*/}
                {/*</li>*/}
                {/*<li className="offers__item offers__item_dark">*/}
                {/*    <div className="offers__img">*/}
                {/*        <Image alt={''} src="/img/offers/gift.png" width={152} height={152}/>*/}
                {/*    </div>*/}
                {/*    <div className="offers__text">*/}
                {/*        <div className="offers__title">С днём рождения!</div>*/}
                {/*        <div className="offers__dscr">Скидка 5% именинникам</div>*/}
                {/*    </div>*/}
                {/*</li>*/}
                {/*<li className="offers__item offers__item_light">*/}
                {/*    <div className="offers__img">*/}
                {/*        <Image alt={''} src="/img/offers/phone.png" width={152} height={152}/>*/}
                {/*    </div>*/}
                {/*    <div className="offers__text offers__text_dark">*/}
                {/*        <div className="offers__title">Подпишись!</div>*/}
                {/*        <div className="offers__dscr ">Скидка 2% для новых подписчиков в Instagram</div>*/}
                {/*    </div>*/}
                {/*</li>*/}
                {/*<li className="offers__item offers__item_light">*/}
                {/*    <div className="offers__img">*/}
                {/*        <Image alt={''} src="/img/offers/rings.png" width={152} height={152}/>*/}
                {/*    </div>*/}
                {/*    <div className="offers__text offers__text_dark">*/}
                {/*        <div className="offers__title">На свадьбу</div>*/}
                {/*        <div className="offers__dscr">5% скидка молодожёнам</div>*/}
                {/*    </div>*/}
                {/*</li>*/}
            </ul>
        </>
    );
};

