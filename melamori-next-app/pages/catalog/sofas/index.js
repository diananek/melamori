import {useRouter} from "next/router";
import {getPageData} from "../../../lib/getPageData";
import {useQuery} from "@apollo/client";
import {softFurnitureCollection} from "../../../graphql/queries";
import CatalogPage from "../../../components/CatalogPage";

export default function Sofas() {
    const pathname = useRouter().asPath
    const title = getPageData(pathname)
    const {loading, error, data} = useQuery(softFurnitureCollection)

    let status;

    if(loading) {
        status = "loading"
    }
    if (error) {
        status = "error"
    }

    return(
        <CatalogPage title={title} collectionName={'soft_furniture'} status={status} data={data}/>
    )
}