import classNames from "classnames";

// кнопка выбора характеристики
export default function ProductOptionBtn({children, className, isActive, onClick}) {
    let classNames = require('classnames');
    let btnClass = classNames("features__option", className, {
        "features__option_selected": isActive
    });

    return(
        <button className={btnClass} onClick={onClick}>{children}</button>
    )
}