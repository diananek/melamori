export function getPageData(path) {
    let title;
    switch (path) {
        case '/catalog/beds':
            title = "Кровати"
            break;
        case '/catalog/sofas':
            title = "Диваны"
            break;
        case '/catalog/mattresses':
            title = "Матрасы"
            break;
    }
    return title;
}