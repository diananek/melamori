import Bitrix from '@2bad/bitrix'
// import fp from "lodash/fp";

const bitrix = Bitrix(
    // process.env.NEXT_PUBLIC_IS_DEV
    'https://b24-z9pkrw.bitrix24.ru/rest/1/11o4pfr9vbqpejn4/'
    // 'https://melamori.bitrix24.ru/rest/88/d5dme1w1yxykd1id/'
)
// const bitrix = Bitrix('https://b24-z9pkrw.bitrix24.ru/rest/88/ehstc0lz7lk4kmdp/')


export default function handler(req, res) {
    console.log(JSON.parse(req.body.payload))

    if (req.headers['api-key-he-he'] === '0413a78e-ec00-47c3-8112-bb39ae3c5402') {


        bitrix.leads.create({
            // Заявка: матрасы -Пенза -Инстаграмм
            TITLE: `Заявка: -${req.body.payload.city} -Сайт`,
            HAS_PHONE: "Y",
            NAME: req.body.payload.name,
            // SECOND_NAME: 'a',
            // LAST_NAME_NAME: 'a',
            // SECOND_NAME: req.body.key,
            COMMENTS: `<a href="https://service.melamori-mebel.ru/admin/content/orders/${req.body.key}">ссылка на заказ</a>`,
            "CURRENCY_ID": "RUB",
            "OPPORTUNITY": 12500,
            "PHONE": [{"VALUE": req.body.payload.phone_number, "VALUE_TYPE": "WORK"}],
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
        }).then(r => console.log(r))
    }
    res.status(200).json()
}
