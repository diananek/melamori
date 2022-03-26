import React from 'react';
import {Header} from "../Header";
import {Footer} from "../Footer";
import {Slider} from "../Slider";

export const Layout = ({
    children,
}) => {
    return (
        <div className="wrapper">
            <Header />
            <main className="page">
                <Slider />
                {children}
            </main>
            <Footer />
        </div>
    );
};

