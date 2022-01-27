import MainLayout from "../components/MainLayout";
import Offers from "../components/Offers";
import StoreSections from "../components/StoreSections";
import Catalog from "../components/Catalog";

export default function Home() {
  return (
          <MainLayout>
              <div className="container">
                  <div className="page__logo">
                      <img src="img/logo.svg" alt="Логотип Me Lamori"/>
                  </div>
              </div>
              <Offers/>
              <StoreSections/>
              <Catalog title="Популярное"/>
          </MainLayout>
  )
}
