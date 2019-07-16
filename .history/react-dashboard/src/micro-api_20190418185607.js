const API_BASE_URL =  '/api.php?functionname=';
const RUNAPI_BASE_URL = "/runapi.php?command=next_switch_list"; 
// const API_BASE_URL =  '/api.php?functionname=';


const _query=(params)=>{
    let {method, func, body} = params;

    let p = new Promise((resolve, reject )=>{
        
        let base = params.base ? params.base : API_BASE_URL;
        let url = ` ${base}${func}`;
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
        return _query({method:'GET',func:'get_settings',body:false})
    },

    changeSettings: (settings)=> {
        return  _query({method:'POST', func:'change_settings',body:{method:'change_settings', settings}});
    },

    reboot:()=>{
        return  _query({method:'GET',func: 'reboot',body:false});
    }

    checkSwitches: ()=>{
        
    }
};