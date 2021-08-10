import {useState,useEffect} from 'react'

export default function useMobile() {
    const [width, setWidth] = useState(window.innerWidth)

    function handleSizeChange(){
        setWidth(window.innerWidth)
    }

    useEffect(()=>{
        window.addEventListener('resize',handleSizeChange)
        return ()=>{
            window.removeEventListener('resize',handleSizeChange)
        }
    },[])
    return width<=768;
}
