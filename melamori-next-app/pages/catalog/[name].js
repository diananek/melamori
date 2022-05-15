import {Layout} from "../../components/reboot/Layout";
import styles from '../../styles/pages/catalog.module.scss'
import {useRouter} from "next/router";
import clsx from "clsx";
import {Ssr} from "../../lib/ssr";
import {ProductCard} from "../../components/reboot/ProductCard";
import fp from "lodash/fp";

import Link from 'next/link'


const nameType = {
    bed_collection: "Кровати",
    mattresses: "Матрацы",
    soft_furniture: "Мягкая мебель",
    mattresses_accessories: "Мягкая мебель",
}


const paginationNumbers = (num) => fp.pipe(
    fp.clamp(3, Math.ceil(num / 16) - 3),
    (res) => Array(fp.min([5, Math.ceil(num / 16)])).fill(undefined).map((_, index) => res + index - 2)
)


const RootCatalog = (
    {items, meta}
) => {
    const {query} = useRouter()

    // const [sort, setSort] = useState(-1)

    // const sortSetter = (update) => {
    //     if (Math.abs(update) === Math.abs(sort))
    //         setSort(-sort)
    //     else
    //         setSort(update)
    // }

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
                        {/*<div className={clsx(styles.flex, styles.sorting, styles.inactive)}>*/}
                        {/*    <div className={clsx(Math.abs(sort) === 1 && styles.active)} onClick={() => sortSetter(1)}>*/}
                        {/*        Цена*/}
                        {/*        {Math.abs(sort) === 1 &&*/}
                        {/*            <span className={clsx(sort > 0 || styles.reverse, "sorting__arrow")}/>}*/}
                        {/*    </div>*/}
                        {/*    <div className={clsx(Math.abs(sort) === 2 && styles.active)} onClick={() => sortSetter(2)}>*/}
                        {/*        Популярность*/}
                        {/*        {Math.abs(sort) === 2 &&*/}
                        {/*            <span className={clsx(sort > 0 || styles.reverse, "sorting__arrow")}/>}*/}
                        {/*    </div>*/}
                        {/*    <div className={clsx(Math.abs(sort) === 3 && styles.active)} onClick={() => sortSetter(3)}>*/}
                        {/*        Скидка*/}
                        {/*        {Math.abs(sort) === 3 &&*/}
                        {/*            <span className={clsx(sort > 0 || styles.reverse, "sorting__arrow")}/>}*/}
                        {/*    </div>*/}
                        {/*</div>*/}
                    </div>
                    <div className="catalog__grid">
                        {items.map((i, key) => <ProductCard key={String(key)} item={i}/>)}
                        <div className={styles.paginationContainer}>
                            {paginationNumbers(meta.total_count)(query.page || 0).map(i => {
                                return (
                                    <Link key={String(i)} href={`/catalog/${query.name}?page=${i}`}>
                                        <a href={`/catalog/${query.name}?page=${i}`} className={styles.page}>
                                            {i}
                                        </a>
                                    </Link>
                                )
                            })}
                        </div>
                    </div>

                </div>
            </div>
        </Layout>
    );
};


export const getServerSideProps = async (ctx) => Ssr(ctx.query.name, ctx)

export default RootCatalog
