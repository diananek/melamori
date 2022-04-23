import fp from "lodash/fp";


export const calculationQuery = (input) => {

    const grouped = fp.groupBy('item_price_id.price[0].collection', input.items_prices_relation)

    const {bed_prices, mattresses_prices} = grouped

    const QUERY = `
        query CALCULATION {
            ${mattresses_prices.map((i) => `
                mattresses_prices_by_id(id: "${i.item_price_id.price[0].item}"){
                    id
                    price
                    sale_percentage
                }
                ${i.item_price_id.choosen_additional_options.map((i) => `
                    item_price_additional_options_by_id(id: ${i}){
                        id
                        additional_options_id{
                            price
                            percentage
                        }
                    }
                `)}
            `)}
            ${bed_prices.map((i) => `
                mattresses_prices_by_id(id: "${i.item_price_id.price[0].item}"){
                    id
                    price
                    sale_percentage
                }
                ${i.item_price_id.choosen_additional_options.map((i) => `
                    item_price_additional_options_by_id(id: ${i}){
                        id
                        additional_options_id{
                            price
                            percentage
                        }
                    }
                `)}
            `)}
            
        }
    `
    console.log(QUERY)

    return [
        QUERY,
        grouped
    ]
}
