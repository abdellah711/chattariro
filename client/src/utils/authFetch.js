

export default async (url,token) =>{
    const res = await fetch(url,{
        headers:{
            Authorization: `Bearer ${token}`
        }
    })
    const data = res.json()
    return data
}