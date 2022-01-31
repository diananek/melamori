import Header from "../components/Header";


export default function ErrorPage (){
    return(
        <div className={"wrapper"}>
            <Header/>
            <main className={"page"}>
                <div className={"container"}>
                    <div className={"error"}>
                        <div className={"error__circle"}> </div>
                        <h2 className={"error__num"}>404</h2>
                        <h1 className={"error__msg"}>Страница не найдена</h1>
                    </div>
                </div>
            </main>
        </div>
    )
}