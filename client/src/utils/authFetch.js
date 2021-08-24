

export default async (url,token,method='GET',body) =>{
    const res = await fetch(url,{
        method,
        headers:{
            Authorization: `Bearer ${token}`
        },
        body
    }).catch(err=>{throw err})
    const data = res.json().catch(err=>{throw err})
    return data
}