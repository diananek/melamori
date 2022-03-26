import React from 'react';
import {Header} from "../Header";
import {Footer} from "../Footer";
import {Slider} from "../Slider";
import Head from "next/head";

export const Layout = ({
    children,
}) => {
    return (
        <div className="wrapper">
            <Head>
                <title>
                    LEM
                </title>
                <meta name="description" content={'New site'}/>
            </Head>
            <Header />
            <main className="page">
                <Slider />
                {children}
            </main>
            <Footer />
        </div>
    );
};

