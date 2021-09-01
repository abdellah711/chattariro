

export default async (url,token,method='GET',body,contentType='application/json') =>{
    const headers = {
        Authorization: `Bearer ${token}`
    }
    if(contentType){
        headers['Content-Type']=contentType
    }
    const res = await fetch(url,{
        method,
        headers,
        body: contentType === 'application/json'? JSON.stringify(body): body
    }).catch(err=>{throw err})
    const data = res.json().catch(err=>{throw err})
    return data
}