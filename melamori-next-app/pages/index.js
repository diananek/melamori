import MainLayout from "../components/MainLayout";
import Offers from "../components/Offers";
import StoreSections from "../components/StoreSections";
import Catalog from "../components/Catalog";
import Image from "next/image";
import logo from "../public/img/logo.svg"
import {useQuery} from "@apollo/client";
import {bedCollection} from "../graphql/queries";
import {Script} from "next/script";

export default function Home() {
    const {loading, error, data} = useQuery(bedCollection)
    let status;
    if(loading) {
        status = "loading"
    }
    if (error) {
        status = "error"
    }
  return (
          <MainLayout>
              <div className="container">
                  <div className="page__logo">
                      <Image src={logo} alt="Логотип MeLamori" layout={"fill"}/>
                  </div>
              </div>
              <Offers/>
              <StoreSections/>
              <Catalog title="Популярное" productsData={data} status={status}
                       collectionName="bed_collection"/>

          </MainLayout>
  )
}
