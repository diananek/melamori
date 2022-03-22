import SortingItem from "./SortingItem";

//кнопки выбора сортировки
export default function Sorting() {
    return(
        <ul className="catalog__sorting sorting">
            <SortingItem id={"price"}>
                Цена
            </SortingItem>
            <SortingItem id={"popularity"}>
                Популярность
            </SortingItem>
            <SortingItem id={"sale"}>
                Скидка
            </SortingItem>
        </ul>
    )
}