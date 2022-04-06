import React, {useEffect} from 'react';
import Image from "next/image";
import {useSelector} from "../../../lib/hooks/useState";

export const Slider = () => {

    useEffect(() => {
        function offersScroll() {
            const ele = document.querySelector('.page__offers');

            if (ele) {
                let pos = { top: 0, left: 0, x: 0, y: 0 };


                const mouseDownHandler = function(e) {
                    // Change the cursor and prevent user from selecting the text
                    ele.style.cursor = 'grabbing';
                    ele.style.userSelect = 'none';
                    pos = {
                        // The current scroll
                        left: ele.scrollLeft,
                        top: ele.scrollTop,
                        // Get the current mouse position
                        x: e.clientX,
                        y: e.clientY,
                    };

                    document.addEventListener('mousemove', mouseMoveHandler);
                    document.addEventListener('mouseup', mouseUpHandler);
                };

                const mouseMoveHandler = function(e) {
                    // How far the mouse has been moved
                    const dx = e.clientX - pos.x;
                    const dy = e.clientY - pos.y;

                    // Scroll the element
                    ele.scrollTop = pos.top - dy;
                    ele.scrollLeft = pos.left - dx;
                };

                const mouseUpHandler = function() {
                    document.removeEventListener('mousemove', mouseMoveHandler);
                    document.removeEventListener('mouseup', mouseUpHandler);

                    ele.style.cursor = 'grab';
                    ele.style.removeProperty('user-select');
                };
                ele.addEventListener('mousedown', mouseDownHandler);
            }
        }
        offersScroll()
    }, [])

    const promo = useSelector('main.sub_data.promotion')


    return (
        <>
            <div className="container">
                <div className="page__logo">
                    <Image src="/img/logo.svg" alt="Логотип Me Lamori" layout='fill'/>
                </div>
            </div>
            <ul
                className="page__offers offers"
                style={{overflowX: 'auto'}}>
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
            </ul>
        </>
    );
};

