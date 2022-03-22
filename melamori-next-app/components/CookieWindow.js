import {useEffect} from "react";

export default function CookieWindow() {
    const activeClass = 'cookie_active'
    const popupClass = '.cookie'
    const btnConfirmClass = '.cookie__btn'
    useEffect(()=> {
        let popup = document.querySelector(popupClass);
        let btnConfirm = document.querySelector(btnConfirmClass);
        const consentPropertyType = 'site_consent';

        const getItem = (key) => {
            const cookies = document.cookie
                .split(';')
                .map(cookie => cookie.split('='))
                .reduce((acc, [key, value]) => ({...acc,
                    [key.trim()]: value
                }), {});

            return cookies[key];
        }

        const setItem = (key, value) => {
            document.cookie = `${key}=${value};expires=Sun, 16 Jul 3567 06:23:41 GMT`;
        }

        const hasConsented = () => {
            return getItem(consentPropertyType) === 'true';
        }

        const changeStatus = (prop) => {
            setItem(consentPropertyType, prop);
            if (hasConsented()) {
                // Подписка на сервисы
            }
        }

        const bindTriggers = () => {
            btnConfirm.addEventListener('click', () => {
                changeStatus(true);
                popup.classList.remove(activeClass);
            });
        }

        const init = () => {
            try {
                if (hasConsented()) {
                } else {
                    popup.classList.add(activeClass);
                }
                bindTriggers();
            } catch (e) {
                console.error('Переданы не все данные');
            }
        }
        init();
    }, [])

    return(
        <div className={"cookie container"}>
            <div className={"cookie__container"}>
                <form className={"cookie__consent"}>
                    <label className={"cookie__dscr"}>
                        Мы используем cookie. Продолжая пользоваться сайтом, вы соглашаетесь с использованием файлов cookie
                    </label>
                    <button className={"cookie__btn"}>
                        Хорошо
                    </button>
                </form>
            </div>
        </div>
    )
}