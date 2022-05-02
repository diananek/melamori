import styles from './style.module.scss'
import {useOnClickOutside} from "../../../lib/hooks/useClickOutside";
import {useRef} from "react";
import {useDispatch, useSelector} from "../../../lib/hooks/useState";
import {actions} from "../../../lib/store/main/actions";
import {useForm} from "react-hook-form";


export const Modal = ({children}) => {
    const ref = useRef();
    const isShown = useSelector('main.modal.show')
    const {handleSubmit, register, formState: {errors}} = useForm()
    const dp = useDispatch()
    useOnClickOutside(ref, () => {
        dp(actions.closeModal())
    })
    return <div
        className={styles.wrapper}
    >
        {isShown && <div className={styles.modal}>
            <form onSubmit={handleSubmit((data) => {
                console.log(data)
            })} className={styles.window} ref={ref}>
                {/*<div className="basket__order-form">*/}
                <div className={styles.header}>
                    Заказать звонок
                </div>
                <div>
                    <label className="basket__form-label" htmlFor="user-tel">
                        Ваш телефон
                    </label>
                    <input
                        id="user-tel"
                        className="basket__input"
                        type="tel"
                        placeholder="8 (123) 456–78–90"
                        {...register('phone')}
                    />
                    <span style={{color: "red"}}>
                        {errors?.phone?.message}
                        </span>
                </div>
                <div>
                    <label className="basket__form-label" htmlFor="user-tel">
                        Имя
                    </label>
                    <input
                        // id="user-tel"
                        className="basket__input"
                        type="text"
                        placeholder="Иванов Иван"
                    />
                    <span style={{color: "red"}}>
                                {errors?.name?.message}
                            </span>
                </div>
                <button className="basket__btn">
                    Подтвердить заказ
                </button>
                <label className="basket__checkbox checkbox">
                    <input
                        className="checkbox__input"
                        type="checkbox"
                    />
                    <span className="basket__checkbox-box checkbox__box"/>
                    Я согласен на обработку моих персональных данных
                </label>
                <span style={{color: "red"}}>
                                    {errors?.sign?.message} <br/>
                            </span>
            </form>
        </div>}
        {children}
    </div>
}

