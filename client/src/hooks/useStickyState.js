


import {useState,useEffect} from 'react'

const useStickyState = (initialState,key) => {
    const [state, setState] = useState(()=> (JSON.parse(localStorage.getItem(key)) ?? initialState))
    useEffect(() => {
        localStorage.setItem(key,state)
    }, [state])
    return [state,setState]
}

export default useStickyState
