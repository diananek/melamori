import MenuLink from "./MenuLink";
import {useRouter} from "next/router";

export default function MenuList(props) {
    let pathname = useRouter().asPath
    let classNames = require("classnames")
    let menuClass = classNames("menu__list", props.className)
    return(
        <ul className={menuClass}>
            <MenuLink title={"Кровати"} path={pathname} href={'/catalog/beds'}/>
            <MenuLink title={"Матрасы"} path={pathname} href={'/catalog/mattresses'}/>
            <MenuLink title={"Мягкая мебель"} path={pathname} href={'/catalog/sofas'}/>
            <MenuLink title={"Одеяла и подушки"} path={pathname} href={'/catalog/pillows'}/>
            <MenuLink title={"Уход за матрацем"} path={pathname} href={'/care'}/>
        </ul>
    )
}