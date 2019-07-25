const API_BASE_URL =  '/api.php?functionname=';
const RUNAPI_BASE_URL = "/runapi.php?command="; 
// const API_BASE_URL =  '/api.php?functionname=';
let canCall =false;

const _query=(params)=>{
    let {method, func, body} = params;

    let p = new Promise((resolve, reject )=>{
        
        if (!canCall){
            // reject("not calling!")
        }
        let base = params.base ? params.base : API_BASE_URL;
        let url = ` ${base}${func}`;
        let fetchOptions = {
            method,
            
            headers: {
            "Content-Type": "application/json",
            "Authorization": 'Basic QWRtaW46dGVsaTJhNA==',
            // "Origin":"https://82.166.236.100:10455"
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
            res.text().then((text)=>{
                
                try {
                    let json = JSON.parse(text);
                    resolve(json);
                }catch(e){
                    resolve(text);
                }
            });
            
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
    setDate: (date)=> {
        return  _query({method:'POST', func:'set_date',body:{method:'set_date', date}});
    },
    getDate: ()=> {
        return  _query({method:'POST', func:'get_date',body:{method:'get_date'}});
    },
    getPin: ()=> {
        return  _query({method:'POST', func:'verification_pin',body:{method:'verification_pin'}});
    },
    reboot:()=>{
        return  _query({method:'GET',func: 'reboot',body:false});
    },

    checkSwitches: ()=>{
        return  _query({method:'GET',func: 'next_switch_list',body:false, base:RUNAPI_BASE_URL});
    },
    setNTPsync: (sync)=>{
        return  _query({method:'GET',func: `enable_ntp_usage&arguments=${sync}`,body:false, base:RUNAPI_BASE_URL});
    },
    getNTPsync: ()=>{
        return  _query({method:'GET',func: `enable_ntp_usage`,body:false, base:RUNAPI_BASE_URL});
    },
    dumpLog:()=>{
        return  _query({method:'POST', func:'dump_log',body:{method:'dump_log'}});
    }
};