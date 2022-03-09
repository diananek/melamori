export function getSizesAndCategories(data, keys) {
    let sizes = new Map();
    let clothCategories = new Map();
    let prices = new Map();
    data.price_list.forEach((p)=>{
        let price = p[keys.prices];
        let clothCategory =price[keys.clothRelation];
        let size = price[keys.sizeRelation];
        sizes.get(clothCategory) ? sizes.set(clothCategory, [...sizes.get(clothCategory), size]): sizes.set(clothCategory, [size]);
        clothCategories.get(size) ? clothCategories.set(size, [...clothCategories.get(size), clothCategory]):
            clothCategories.set(size, [clothCategory]);
        prices.set([clothCategory, size], price);
    })

    return [sizes, clothCategories, prices]
}