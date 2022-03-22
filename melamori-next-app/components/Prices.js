export default function Prices({productState, dispatch, sizes, priceList}) {
    if(Object.keys(productState.priceObj).length === 0) {
        dispatch({type: 'add_sleep-size', value: sizes[0].sleep_size})
        dispatch({type: 'add_price', value: priceList[0].bed_prices_id})
    }
    const saleStatus = productState.priceObj.status
    const sale = productState.priceObj.sale_percentage ? productState.priceObj.sale_percentage : 0
    const price = productState.priceObj.price* (1 - sale/100);
    return(
        <div className="product__prices">
            <div className="product__price price price_cur">от {price} <span>₽</span></div>
            {saleStatus !== "non-active" ?
                <div className="product__price price price_old">от {productState.priceObj.price}</div>
                :undefined}
            {saleStatus !== "non-active" ?
                <div className="product__discount">-{sale}%</div>
                :undefined}
        </div>
    )
}