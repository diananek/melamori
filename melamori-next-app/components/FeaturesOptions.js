import FeaturesOptionBtn from "./FeaturesOptionBtn";
import {useState} from "react";
import {getSizesAndCategories} from "../lib/getSizesAndCategories";

export default function FeaturesOptions({data, dispatch, type}) {

    const [activeIdx, setActiveIdx] = useState(0)
    let result = []
    for (let i of data.size.keys()){
        activeIdx.size === 0 ? setActiveIdx(i.id): null

        result.push(<FeaturesOptionBtn key={i.id} isActive={i.id === activeIdx} onClick={(e)=> {
            e.preventDefault()
            setActiveIdx(i.id)
            dispatch.size({type: type, size: i})
        }}>{i.sleep_size}</FeaturesOptionBtn>)
    }
    return(
        <div className={'features__options'}>
            {result}
        </div>
    )
    // let activeSize;
    // let activeCategory;
    // let flag = 'size'
    // let sizeOptions = []
    // let clothOptions = []
    //
    // if(flag === 'size') {
    //     for (let i of sizeData.keys()){
    //         // activeIdx.size === 0 ? setActiveIdx({'size': i.id, 'cloth': activeIdx.cloth}): null
    //         if(activeIdx.size === 0) {
    //             activeSize = i;
    //             setActiveIdx({'size': i.id, 'cloth': activeIdx.cloth})
    //         }
    //         sizeOptions.push(<FeaturesOptionBtn key={i.id} isActive={i.id === activeIdx.size} onClick={(e)=> {
    //             e.preventDefault()
    //             setActiveIdx({'size': i.id, 'cloth': activeIdx.cloth})
    //             activeSize = i;
    //             flag = 'size'
    //         }}>{i.sleep_size}</FeaturesOptionBtn>)
    //     }
    //     for (let i of sizeData.get(activeSize)){
    //         // activeIdx.cloth === 0 ? setActiveIdx(()=>{activeCategory = i; return({'size': activeIdx.size, 'cloth': i.id})}): null
    //         if(activeIdx.cloth === 0) {
    //             activeCategory = i;
    //             setActiveIdx({'size': activeIdx.size, 'cloth': i.id})
    //         }
    //         clothOptions.push(<FeaturesOptionBtn key={i.id} isActive={i.id === activeIdx.cloth} onClick={(e)=> {
    //             e.preventDefault()
    //             setActiveIdx({'size': activeIdx.size, 'cloth': i.id})
    //             activeCategory = i
    //             flag='category'
    //         }}>{i.category}</FeaturesOptionBtn>)
    //     }
    //
    // } else {
    //     for (let i of clothData.keys()){
    //         // activeIdx.cloth === 0 ? setActiveIdx(()=>{activeCategory = i; return({'size': activeIdx.size, 'cloth': i.id})}): null
    //         if(activeIdx.cloth === 0) {
    //             activeCategory = i;
    //             setActiveIdx({'size': activeIdx.size, 'cloth': i.id})
    //         }
    //         clothOptions.push(<FeaturesOptionBtn key={i.id} isActive={i.id === activeIdx.cloth} onClick={(e)=> {
    //             e.preventDefault()
    //             setActiveIdx({'size': activeIdx.size, 'cloth': i.id})
    //             activeCategory = i
    //             flag='category'
    //         }}>{i.category}</FeaturesOptionBtn>)
    //     }
    //     for (let i of clothData.get(activeCategory)){
    //         // activeIdx.size === 0 ? setActiveIdx(()=>{activeSize = i; return({'size': i.id, 'cloth': activeIdx.cloth})}): null
    //         if(activeIdx.size === 0) {
    //             activeSize = i;
    //             setActiveIdx({'size': i.id, 'cloth': activeIdx.cloth})
    //         }
    //         sizeOptions.push(<FeaturesOptionBtn key={i.id} isActive={i.id === activeIdx.size} onClick={(e)=> {
    //             e.preventDefault()
    //             setActiveIdx({'size': i.id, 'cloth': activeIdx.cloth})
    //             activeSize = i
    //             flag='size'
    //         }}>{i.category}</FeaturesOptionBtn>)
    //     }
    // }
    // return(
    //     <form className="product__features features">
    //         <div className="features__item">
    //             <div className="features__name name">Размер спального места</div>
    //             <div className={'features__options'}>
    //                 {sizeOptions}
    //             </div>
    //         </div>
    //         <div className="features__item">
    //             <div className="features__name name">Категория ткани</div>
    //             <div className={'features__options'}>
    //                 {clothOptions}
    //             </div>
    //         </div>
    //     </form>
    // )
}
