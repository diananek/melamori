import {Layout} from "../../components/reboot/Layout";
import Link from 'next/link'

const Success = () => {
    return (
        <Layout>
            <div className={"container"}>
                <div className={"error"} style={{display: 'flex', flexDirection: 'column', justifyContent: 'center'}}>
                    {/*<div className={"error__circle"}/>*/}
                    <h2 className={"error__h"}>
                        Заказ оформлен!
                    </h2>
                    <h1 className={"error__cart"}>
                        В ближайшее время наш менеджер вам позвонит
                    </h1>
                    <div style={{display: 'flex', justifyContent: 'center', width: '100%', paddingLeft: '12px', marginBottom: '50px'}}>
                        <Link href={'/'}>
                            <a href={'/'} className={'product-card__add'}>
                                На главную
                            </a>
                        </Link>
                    </div>
                </div>
            </div>
        </Layout>
    )
}

export default Success
