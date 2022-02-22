export function getPageData(path) {
    let title;
    switch (path) {
        case '/catalog/beds':
            title = "Кровати"
            break;
        case '/catalog/sofas':
            title = "Мягкая мебель"
            break;
        case '/catalog/mattresses':
            title = "Матрасы"
            break;
    }
    return title;
}