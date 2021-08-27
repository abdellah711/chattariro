

export default async (url,token,method='GET',body,contentType='application/json') =>{
    const res = await fetch(url,{
        method,
        headers:{
            Authorization: `Bearer ${token}`,
            'Content-Type': contentType
        },
        body: contentType === 'application/json'? JSON.stringify(body): body
    }).catch(err=>{throw err})
    const data = res.json().catch(err=>{throw err})
    return data
}