import {useRouter} from "next/router";
import {getPageData} from "../../lib/getPageData";
import {useQuery} from "@apollo/client";
import {mattressCollection} from "../../graphql/queries";
import CatalogPage from "../../components/CatalogPage";

export default function Mattresses() {
    const pathname = useRouter().asPath
    const title = getPageData(pathname)
    const {loading, error, data} = useQuery(mattressCollection)

    let status;

    if(loading) {
        status = "loading"
    }
    if (error) {
        status = "error"
    }

    return(
        <CatalogPage title={title} collectionName={'mattresses'} status={status} data={data}/>
    )
}