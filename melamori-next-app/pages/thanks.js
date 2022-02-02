import Header from "../components/Header";

export default function Thanks() {
    return(
            <div className="wrapper">
                <Header/>
                <main className="page">
                    <div className="container">
                        <div className="thanks">
                            <h1 className="thanks__title">Заказ оформлен!</h1>
                            <h2 className="thanks__subtitle">В ближайшее время наш менеджер вам позвонит</h2>
                            <button className="thanks__back-btn">На главную</button>
                        </div>
                    </div>
                </main>
            </div>
    )
}