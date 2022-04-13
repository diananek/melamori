import Bitrix from '@2bad/bitrix'

const bitrix = Bitrix('https://melamori.bitrix24.ru/rest/88/ehstc0lz7lk4kmdp/')
// const bitrix = Bitrix('https://b24-z9pkrw.bitrix24.ru/rest/88/ehstc0lz7lk4kmdp/')


export default function handler(req, res) {
    console.log(req.body)

    if (req.headers['api-key-he-he'] === '0413a78e-ec00-47c3-8112-bb39ae3c5402') {

        // debugger
        bitrix.leads.create({
            TITLE: 'Заказ с сайта',
            HAS_PHONE: "Y",
            // SECOND_NAME: req.body.key,
            COMMENTS: `<a href="https://service.melamori-mebel.ru/admin/content/orders/${req.body.key}">ссылка на заказ</a>`,
            // "CURRENCY_ID": "RUB",
            // "OPPORTUNITY": 12500,
            "PHONE": [{"VALUE": req.body.payload.phone_number, "VALUE_TYPE": "WORK"}]
        }).then(r => console.log(r))
    }
    res.status(200).json()
}
