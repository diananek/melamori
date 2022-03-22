export function getSizesAndCategories(data, keys) {
    let sizes = [];
    let clothCategories = [];
    data.price_list.forEach((p)=>{
        let price = p[keys.prices];
        let clothCategory = price[keys.clothRelation];
        let size = price[keys.sizeRelation];

        !sizes.includes(size) ? sizes.push(size) : undefined;
        !clothCategories.includes(clothCategory) ? clothCategories.push(clothCategory) : undefined;
    })

    return [sizes, clothCategories]
}