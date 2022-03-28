import React from 'react';
import {Header} from "../Header";
import {Footer} from "../Footer";
import {Slider} from "../Slider";
import Head from "next/head";

export const Layout = ({
    children,
    hideSlider = false,
}) => {
    return (
        <div className="wrapper">
            <Head>
                <title>
                    MeLamori
                </title>
                <meta name="description" content={'MeLamori'}/>
            </Head>
            <Header />
            <main className="page">
                {hideSlider || <Slider />}
                {children}
            </main>
            <Footer />
        </div>
    );
};

