import React from 'react';
import {Ssr} from "../../lib/ssr";
import {Layout} from "../../components/reboot/Layout";
import {ProductCard} from "../../components/reboot/ProductCard";

const Index = () => {
    return (
        <>
            <Layout>
                <div className="catalog">
                    <div className="catalog__container container">
                        <div className="catalog__title">Популярное</div>

                        <div className="catalog__grid">
                            <ProductCard />
                        </div>
                    </div>
                </div>
            </Layout>
        </>
    );
};

export const getServerSideProps = async (ctx) => Ssr('home', ctx)

export default Index;
