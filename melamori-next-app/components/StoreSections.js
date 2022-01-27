import Image from "next/image";

export default function StoreSections() {
    return(
        <ul className="store-sections">
            <div className="container store-sections__container">
                <li className="store-sections__item">
                    <div className="store-sections__title store-sections__title_right">Кровати</div>
                    <Image src="/img/store-sections/bed.png" alt="Кровать" width={301} height={136}/>
                </li>
                <li className="store-sections__item">
                    <div className="store-sections__title">Матрацы</div>
                    <div className="store-sections__img">
                        <Image src="/img/store-sections/mattr.png" alt="Матрацы"  width={153} height={110}/>
                    </div>
                </li>
                <li className="store-sections__item">
                    <div className="store-sections__title">Мягкая мебель</div>
                    <div className="store-sections__img">
                        <Image src="/img/store-sections/sofa.png" alt="Мягкая мебель" width={153} height={110}/>
                    </div>
                </li>
                <li className="store-sections__item">
                    <div className="store-sections__title">Одеяла и подушки</div>
                    <div className="store-sections__img">
                        <Image src="/img/store-sections/pillow.png" alt="Подушка" width={153} height={110}/>
                    </div>
                </li>
                <li className="store-sections__item">
                    <div className="store-sections__title">Уход за матрацем</div>
                    <div className="store-sections__img">
                        <Image src="/img/store-sections/care.png" alt="Матрац" width={153} height={110}/>
                    </div>
                </li>
            </div>
        </ul>
    )
}