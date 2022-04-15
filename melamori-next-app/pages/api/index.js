import {calculationQuery} from "../../graphql/schemas/builder";

export default function handler(req, res) {

    console.log(req.body)


    res.status(200).send(calculationQuery()[0])
}
