const API_BASE_URL =  '/api.php?functionname=';

const _query=(method, data)=>{
    let p = new Promise((resolve, reject )=>{
        let url = ` ${API_BASE_URL}${method}`;
        fetch(url, {
                headers: {
                "Content-Type": "application/json",
                "Authorization": 'Basic QWRtaW46dGVsaTJhNA==',
                "Origin":"https://82.166.236.100:10455"
                // "Content-Type": "application/x-www-form-urlencoded",
            }
        }).then((res)=>{
            try {
                let json = JSON.parse(res)
                resolve( json);
            }catch(e){
                resolve(res);
            }
            console.log(res)
        }).catch((err)=>{
            console.log(err)
            reject(err)
        })
    } )
    return p;        
}

export const MicroApi = {
    
    getSettings:()=>{
        return _query('get_settings',{})
    }

};