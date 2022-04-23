import fp from "lodash/fp";

const mocked = {
    "data": {
        "orders_by_id": {
            "choosen_promotions": [
                {
                    "promotion_id": {
                        "price": null,
                        "percentage": 5,
                        "title": "С днем рождения!"
                    }
                }
            ],
            "items_prices_relation": [
                {
                    "item_price_id": {
                        "choosen_additional_options": [
                            {
                                "additional_options_id": {
                                    "price": null,
                                    "percentage": 15,
                                    "title": "Пенополиуретан 10 см"
                                }
                            }
                        ],
                        "price": [
                            {
                                "item": {
                                    "sale_percentage": "20",
                                    "price": 91000,
                                    "soft_furniture_relation": [
                                        {
                                            "soft_furniture_id": {
                                                "id": "42ab3658-2668-4ceb-a029-ad4cc64c5961",
                                                "title": "Аргус 2"
                                            }
                                        }
                                    ]
                                },
                                "collection": "soft_furniture_prices"
                            }
                        ]
                    }
                },
                {
                    "item_price_id": {
                        "choosen_additional_options": [],
                        "price": [
                            {
                                "item": {
                                    "sale": 20,
                                    "price": 63100,
                                    "bed_relation": [
                                        {
                                            "bed_collection_id": {
                                                "id": "06dea44d-5d34-4bc2-9d5f-5c06078b1c31",
                                                "title": "Эльза"
                                            }
                                        }
                                    ]
                                },
                                "collection": "bed_prices"
                            }
                        ]
                    }
                }
            ]
        }
    }
}

const priceCond = (data) => ({
    bed_prices: 'bed_relation',
    soft_furniture_prices: 'soft_furniture_relation'
})[fp.get('item_price_id.price[0].collection', data)]

const priceNestedCond = (data) => ({
    bed_prices: 'bed_collection_id',
    soft_furniture_prices: 'soft_furniture_id'
})[fp.get('item_price_id.price[0].collection', data)]

const nameCond = (data) => ({
    bed_prices: 'Кровать',
    soft_furniture_prices: 'Модель',
    ma: 'Матрац'
})[fp.get('item_price_id.price[0].collection', data)]


export const mainTemplate = (
    mock = mocked,
    other = {
        key: "aboba"
    }
) =>  (`
<a href="https://service.melamori-mebel.ru/admin/content/orders/${other.key}">Ссылка на полный заказ</a><br>
${mock
    .data
    .orders_by_id
    .items_prices_relation
    .map((item) => {
        const {price, sale_percentage, sale} = item.item_price_id.price[0].item
        const info = item.item_price_id.price[0].item[priceCond(item)][0][priceNestedCond(item)]
        return `
${nameCond(item)}: ${info.title} <br>
Цена: ${price} <br>
Скидка: ${sale_percentage || sale}% <br>
<br>
`;
    }).join('')}`)
