import {Layout} from "../../components/reboot/Layout";
import styles from '../../styles/pages/catalog.module.scss'
import {useRouter} from "next/router";
import {useState} from "react";
import clsx from "clsx";
import {Ssr} from "../../lib/ssr";
import {ProductCard} from "../../components/reboot/ProductCard";


const nameType = {
    bed_collection: "Кровати",
    mattresses: "Матрацы",
    soft_furniture: "Мягкая мебель",
}


const RootCatalog = (
    {items, meta}
) => {
    const {query} = useRouter()

    const [sort, setSort] = useState(-1)

    const sortSetter = (update) => {
        if (Math.abs(update) === Math.abs(sort))
            setSort(-sort)
        else
            setSort(update)
    }
    // console.log(items, meta)

    return (
        <Layout>
            <div className="catalog">
                <div className="catalog__container container">
                    <div className={clsx(styles.flex, styles.margin)}>
                        <div className="catalog__title">
                            {nameType[query.name]}
                            <span className={styles.inactive}>
                                {` ${meta?.total_count} товаров`}
                            </span>
                        </div>
                        <div className={clsx(styles.flex, styles.sorting, styles.inactive)}>
                            <div className={clsx(Math.abs(sort) === 1 && styles.active)} onClick={() => sortSetter(1)}>
                                Цена
                                {Math.abs(sort) === 1 && <span className={clsx(sort > 0 || styles.reverse, "sorting__arrow")}/>}
                            </div>
                            <div className={clsx(Math.abs(sort) === 2 && styles.active)} onClick={() => sortSetter(2)}>
                                Популярность
                                {Math.abs(sort) === 2 && <span className={clsx(sort > 0 || styles.reverse, "sorting__arrow")}/>}
                            </div>
                            <div className={clsx(Math.abs(sort) === 3 && styles.active)} onClick={() => sortSetter(3)}>
                                Скидка
                                {Math.abs(sort) === 3 && <span className={clsx(sort > 0 || styles.reverse, "sorting__arrow")}/>}
                            </div>
                        </div>
                    </div>
                    <div className="catalog__grid">
                        {items.map((i, key) => <ProductCard key={String(key)} item={i} />)}
                    </div>
                </div>
            </div>
        </Layout>
    );
};


export const getServerSideProps = async (ctx) => Ssr(ctx.query.name, ctx)

export default RootCatalog
