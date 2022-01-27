import Image from "next/image";

export default function StoreSections() {
    return(
        <ul className="store-sections">
            <div className="container store-sections__container">
                <li className="store-sections__item">
                    <div className="store-sections__title store-sections__title_right">Кровати</div>
                    <Image src="../melamori-next-app/public/img/store-sections/bed.png" alt="Кровать" layout="fill"/>
                </li>
                <li className="store-sections__item">
                    <div className="store-sections__title">Матрацы</div>
                    <div className="store-sections__img">
                        <Image src="../melamori-next-app/public/img/store-sections/mattr.png" alt="Матрацы" layout="fill"/>
                    </div>
                </li>
                <li className="store-sections__item">
                    <div className="store-sections__title">Мягкая мебель</div>
                    <div className="store-sections__img">
                        <Image src="../melamori-next-app/public/img/store-sections/sofa.png" alt="Мягкая мебель" layout="fill"/>
                    </div>
                </li>
                <li className="store-sections__item">
                    <div className="store-sections__title">Одеяла и подушки</div>
                    <div className="store-sections__img">
                        <Image src="../melamori-next-app/public/img/store-sections/pillow.png" alt="Подушка" layout="fill"/>
                    </div>
                </li>
                <li className="store-sections__item">
                    <div className="store-sections__title">Уход за матрацем</div>
                    <div className="store-sections__img">
                        <Image src="../melamori-next-app/public/img/store-sections/care.png" alt="Матрац" layout="fill"/>
                    </div>
                </li>
            </div>
        </ul>
    )
}