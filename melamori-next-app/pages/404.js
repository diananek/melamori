import {Layout} from "../components/reboot/Layout";


export default function ErrorPage (){
    return(
        <Layout>
                <div className={"container"}>
                    <div className={"error"}>
                        <div className={"error__circle"}> </div>
                        <h2 className={"error__num"}>404</h2>
                        <h1 className={"error__msg"}>Страница не найдена</h1>
                    </div>
                </div>
        </Layout>
    )
}
