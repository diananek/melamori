import MainLayout from "../components/MainLayout";
import Offers from "../components/Offers";
import StoreSections from "../components/StoreSections";
import Catalog from "../components/Catalog";
import Image from "next/image";
import logo from "../public/img/logo.svg"

export default function Home() {
  return (
          <MainLayout>
              <div className="container">
                  <div className="page__logo">
                      <Image src={logo} alt="Логотип Me Lamori" layout={"fill"}/>
                  </div>
              </div>
              <Offers/>
              <StoreSections/>
              <Catalog title="Популярное"/>
          </MainLayout>
  )
}
