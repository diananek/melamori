import {useRouter} from "next/router";
import {getPageData} from "../../../lib/getPageData";
import {useQuery} from "@apollo/client";
import {bedCollection} from "../../../graphql/queries";
import CatalogPage from "../../../components/CatalogPage";

export default function Beds() {
    const pathname = useRouter().asPath
    const title = getPageData(pathname)
    const {loading, error, data, fetchMore} = useQuery(bedCollection, {
        variables: {
            offset: 0,
            limit: 4
        },
    })

    let status;

    if(loading) {
        status = "loading"
    }
    if (error) {
        status = "error"
    }

    return(
        <>
            <CatalogPage title={title} collectionName={'bed_collection'} status={status} data={data} onLoadMore={() => fetchMore({
                variables: {
                    offset: data.bed_collection.length,
                    limit: 4
                },
            })}/>
        </>
    )
}