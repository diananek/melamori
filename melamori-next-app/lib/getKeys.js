export function getKeys(category) {
    let keys = {
        prices: '',
        sizeRelation: '',
        size: '',
    }
    switch (category) {
        case 'bed_collection':
            keys.prices = 'bed_prices_id'
            keys.sizeRelation = 'bed_size_relation'
            keys.clothRelation = 'bed_cloth_category_relation'
            keys.size = 'bed_size'
            break;
        case 'soft_furniture':
            keys.prices = 'soft_furniture_prices_id'
            keys.sizeRelation = 'soft_furniture_size_relation'
            keys.clothRelation = 'soft_furniture_cloth_category_relation'
            keys.size = 'soft_furniture_size'
            break;
        case 'mattresses':
            keys.prices = 'mattresses_prices_id'
            keys.sizeRelation = 'mattress_size_relation'
            keys.clothRelation = 'mattresses_cloth_category_relation'
            keys.size = null
            break;
    }
    return keys;
}