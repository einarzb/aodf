const API_BASE_URL =  '/api.php?functionname=';
// const API_BASE_URL =  '/api.php?functionname=';


const _query=(method, func, body)=>{
    let p = new Promise((resolve, reject )=>{
        
        let url = ` ${API_BASE_URL}${func}`;
        let fetchOptions = {
            method,
            
            headers: {
            "Content-Type": "application/json",
            "Authorization": 'Basic QWRtaW46dGVsaTJhNA==',
            "Origin":"https://82.166.236.100:10455"
            // "Content-Type": "application/x-www-form-urlencoded",
            }
        };    
        if (body){
            fetchOptions.body = JSON.stringify(body);
        }
        if (window.location.hostname == 'localhost') {
            reject("No API calls on localhost")
            return;
        }

        fetch(url, fetchOptions).then((res)=>{
            try {
                // let json = JSON.parse(res)
                resolve(res.json());
            }catch(e){
                resolve(res);
            }
            // console.log(JSON.parse(res));
        }).catch((err)=>{
            console.log(err);
            reject(err);
        })
    } )
    return p;        
}

export const MicroApi = {
    
    getSettings:()=>{
        return _query('GET','get_settings',false)
    },

    changeSettings: (settings)=> {
        return  _query('POST', 'change_settings',{method:'change_settings', settings})
    },

    reboot:()=>{
        return  _query('GET', 'reboot',false)
    }
};