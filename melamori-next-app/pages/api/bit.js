import Bitrix from '@2bad/bitrix'
import {mainTemplate} from "../../lib/template/main";
// import {ApolloLink} from "@apollo/client";
import {createSysClient} from "../../lib/ssr/apollo";
// import {calculationQuery} from "../../graphql/schemas/builder";
// import fp from "lodash/fp";
import CALCULATION from '../../graphql/schemas/calculation.graphql'

// import {t} from '../../lib/template/main'

const bitrix = Bitrix(
    // process.env.NEXT_PUBLIC_IS_DEV
    // 'https://b24-z9pkrw.bitrix24.ru/rest/1/11o4pfr9vbqpejn4/'
    'https://melamori.bitrix24.ru/rest/88/d5dme1w1yxykd1id/'
)
// const bitrix = Bitrix('https://b24-z9pkrw.bitrix24.ru/rest/88/ehstc0lz7lk4kmdp/')


// noinspection JSUnusedLocalSymbols
const mock = {
    "phone_number": "dev",
    "name": "Shkerdin Vlad",
    "city": "Пенза",
    "items_prices_relation": [
        {
            "item_price_id": {
                "price": [
                    {
                        "item": "4936c329-3575-42a4-b489-ff7a9d6db244",
                        "collection": "bed_prices"
                    }
                ],
                "choosen_additional_options": []
            }
        }, {
            "item_price_id": {
                "price": [
                    {
                        "item": "880bb177-f653-404f-a44c-1e6c0a2449a9",
                        "collection": "mattresses_prices"
                    }
                ],
                "choosen_additional_options": [14]
            }
        }, {
            "item_price_id": {
                "price": [
                    {
                        "item": "703e3456-7557-440b-8587-dd50478abf40",
                        "collection": "soft_furniture_prices"
                    }
                ],
                "choosen_additional_options": []
            }
        }],
    "choosen_promotions": [
        {
            "promotion_id": "6d090b21-4f9d-4a93-a099-43a22e1325d9"
        },
        {
            "promotion_id": "7b903941-e629-4aa4-b44a-08746ee472f1"
        }]
}

export default function handler(req, res) {
    console.log(JSON.stringify(req.body.key))
    // debugger;

    if (req.headers['api-key-he-he'] === '0413a78e-ec00-47c3-8112-bb39ae3c5402') {
        const link = createSysClient(process.env.DIRECTUS_KEY)

        link.query({
            query: CALCULATION,
            variables: {
                id: req.body.key
            }
        }).then((data) => {

            bitrix.leads.create({
                // Заявка: матрасы -Пенза -Инстаграмм
                TITLE: `Заявка: -${req?.body?.payload?.city} -Сайт`,
                HAS_PHONE: "Y",
                NAME: req?.body?.payload?.name,
                // SECOND_NAME: 'a',
                // LAST_NAME_NAME: 'a',
                // SECOND_NAME: req.body.key,
                COMMENTS: mainTemplate(data, {key: req?.body?.key}),
                // "CURRENCY_ID": "RUB",
                // "OPPORTUNITY": 12500,
                "PHONE": [{"VALUE": req?.body?.payload?.phone_number, "VALUE_TYPE": "WORK"}],
                // CONTACT_IDS: {/
                //     "NAME": "Глеб",
                //     "SECOND_NAME": "Егорович",
                //     "LAST_NAME": "Титов",
                //     "OPENED": "Y",
                //     "ASSIGNED_BY_ID": 1,
                // "TYPE_ID": "CLIENT",
                // "SOURCE_ID": "SELF",
                // "PHOTO": { "fileData": document.getElementById('photo') },
                // "PHONE": [ { "VALUE": "555888", "VALUE_TYPE": "WORK" } ]
                // }
            })
        })

    }
    res.status(200).setHeader('Content-Type', 'text/plain;charset=UTF-8').send(mainTemplate())
}

