import Image from "next/image";
import Offers1 from "../public/img/offers/clock.png"
import Offers2 from "../public/img/offers/glasses.png"
import Offers3 from "../public/img/offers/ruler.png"
import Offers4 from "../public/img/offers/gift.png"
import Offers5 from "../public/img/offers/phone.png"
import Offers6 from "../public/img/offers/rings.png"


export default function Offers (){
    let pos = { top: 0, left: 0, x: 0, y: 0 };
    let element;
    const mouseDownHandler = function(e) {
        element = e.target.closest(".offers");
        element.style.cursor = 'grabbing';
        element.style.userSelect = 'none';
        pos = {
            // The current scroll
            left: element.scrollLeft,
            top: element.scrollTop,
            // Get the current mouse position
            x: e.clientX,
            y: e.clientY,
        };
        document.addEventListener('mousemove', mouseMoveHandler);
        document.addEventListener('mouseup',  mouseUpHandler);
    };

    const mouseMoveHandler = function(e) {
        const dx = e.clientX - pos.x;
        const dy = e.clientY - pos.y;

        // Scroll the element
        element.scrollTop = pos.top - dy;
        element.scrollLeft = pos.left - dx;

    };

    const mouseUpHandler = function(e) {
        document.removeEventListener('mousemove', mouseMoveHandler);
        document.removeEventListener('mouseup', mouseUpHandler);

        element.style.cursor = 'grab';
        element.style.removeProperty('user-select');
    }
    return (
        <ul className="page__offers offers" onMouseDown={mouseDownHandler}>
            <li className="offers__item offers__item_dark ">
                <div className="offers__img">
                    <Image draggable="false" src={Offers1} />
                </div>
                <div className="offers__text">
                    <div className="offers__title">Комплект</div>
                    <div className="offers__dscr">-5% на матрац при покупке кровати</div>
                </div>
            </li>
            <li className="offers__item offers__item_light">
                <div className="offers__img">
                    <Image draggable="false" src={Offers2} />

                </div>
                <div className="offers__text offers__text_dark">
                    <div className="offers__title">Пенсионерам</div>
                    <div className="offers__dscr">Скидка 5% на все товары</div>
                </div>
            </li>
            <li className="offers__item offers__item_dark">
                <div className="offers__img">
                    <Image draggable="false" src={Offers3} />
                </div>
                <div className="offers__text">
                    <div className="offers__title">Свой размер</div>
                    <div className="offers__dscr">Изготовление товаров любого размера</div>
                </div>
            </li>
            <li className="offers__item offers__item_dark">
                <div className="offers__img">
                    <Image draggable="false" src={Offers4} />
                </div>
                <div className="offers__text">
                    <div className="offers__title">С днём рождения!</div>
                    <div className="offers__dscr">Скидка 5% именинникам</div>
                </div>
            </li>
            <li className="offers__item offers__item_light">
                <div className="offers__img">
                    <Image draggable="false" src={Offers5} />
                </div>
                <div className="offers__text offers__text_dark">
                    <div className="offers__title">Подпишись!</div>
                    <div className="offers__dscr ">Скидка 2% для новых подписчиков в Instagram</div>
                </div>
            </li>
            <li className="offers__item offers__item_light">
                <div className="offers__img">
                    <Image draggable="false" src={Offers6} />
                </div>
                <div className="offers__text offers__text_dark">
                    <div className="offers__title">На свадьбу</div>
                    <div className="offers__dscr">5% скидка молодожёнам</div>
                </div>
            </li>
        </ul>
    )
}