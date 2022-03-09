import classNames from "classnames";

export default function FeaturesOptionBtn({children, className, isActive, onClick}) {
    let classNames = require('classnames');
    let btnClass = classNames("features__option", className, {
        "features__option_selected": isActive
    });

    return(
        <button className={btnClass} onClick={onClick}>{children}</button>
    )
}