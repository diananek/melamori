import Link from "next/link"


// функция проверки: совпадает ли адрес ссылки и адрес текущей страницы
function isSelected(path, href) {
    return(
        path === href
    )
}

export default function MenuLink ({title, href, path}) {


    let classNames = require("classnames")
    let linkClass = classNames("menu__link", {
        "menu__link_selected": isSelected(path, href)
    })
    return(
        <li className="menu__item">
            <Link href={href}>
                <a>
                    <span className={linkClass}>
                        {title}
                    </span>
                </a>
            </Link>
        </li>
    )
}