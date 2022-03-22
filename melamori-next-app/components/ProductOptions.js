import ProductOptionBtn from "./ProductOptionBtn";
import {useState} from "react";

export default function ProductOptions({data, valueName}) {
    const [activeItemId, setActiveItemId] = useState(0);
    return(
        <div className={'features__options'}>
            {
                data.map((item)=>{
                    if(activeItemId === 0){
                        setActiveItemId(item.id)
                    }
                    return(<ProductOptionBtn key={item.id} isActive={item.id === activeItemId} onClick={()=>{
                        e.preventDefault();
                        setActiveItemId(item.id)
                    }}>
                        {item[valueName]}
                    </ProductOptionBtn>)
                })
            }
        </div>
    )
}