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
    
    //settings 
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
    },


    /// configuration screen /// 
    
    getConfigSettings:()=>{        
        return _query({method:'GET',func:'get_config_settings',body:false})
    },
    changeConfigs: (configs)=> {
        return  _query({method:'POST', func:'change_configs',body:{method:'change_configs', configs}});
    },
    
    // calibration view

    getParams:()=>{        
        return _query({method:'GET',func:'get_params',body:false})
    },

    // needs to get 2 params
    plateRestart:(data)=>{
        return  _query({method:'POST', func:'plate_restart',body:{method:'plate_restart', data}});
    },
    fetchPlatePorts:(plateNum) =>{
        return  _query({method:'GET',func: `plategetportsjson&plateinfo_platenum=${plateNum}`,body:false, base:API_BASE_URL});
    },
    fetchReelData:(reelNum) =>{
        return  _query({method:'GET',func: `wheelload&reelinfo_reelnum=${reelNum}`,body:false, base:API_BASE_URL});
    },
    reelCalibration:()=>{
        return  _query({method:'GET',func: 'reel_calibration',body:false});
    },
    
    fetchPlates:()=>{
        return  _query({method:'GET',func: 'fetch_plates',body:false});
    },
    fetchReels:()=>{
        return  _query({method:'GET',func: 'fetch_reels',body:false});
    },
    fetchInstructions:()=>{
        return  _query({method:'GET',func: 'fetch_instructions',body:false});
    },
    fetchReelAngle:(currentReel)=>{
        return  _query({method:'POST',func: 'fetch_reel_angle',body:{method:'fetch_reel_angle', currentReel}});
    },
    fetchParkingPlateNum:(currentReel)=>{
        return  _query({method:'POST',func: 'fetch_parking_plate_num',body:{method:'fetch_parking_plate_num', currentReel}});
    },
    fetchPlateHeights:(plateNum)=>{
        return  _query({method:'POST',func: 'fetch_plates_height',body:{method:'fetch_plates_height', plateNum}});
    },
    fetchPlatePosition:(currentPlateNum)=>{
        return  _query({method:'POST',func: 'fetch_plate_position',body:{method:'fetch_plate_position', currentPlateNum}});
    },
    fetchPlateType:(currentPlateNum)=>{
        return  _query({method:'POST',func: 'fetch_plate_type',body:{method:'fetch_plate_type', currentPlateNum}});
    },
    fetchHeight:(currentPlateNum)=>{
        return  _query({method:'POST',func: 'fetch_height',body:{method:'fetch_height', currentPlateNum}});
    },
    updateConnection:(stop) => {
        return  _query({method:'POST',func: 'update_connection',body:{method:'update_connection', stop}});
    },
    updatePlateHeight:(allData)=>{
        return  _query({method:'POST',func: 'update_plate_height',body:{method:'update_plate_height', allData}});
    },
    updateRobotParam:(all) => {
        return  _query({method:'POST',func: 'update_robot_param',body:{method:'update_robot_param', all}});
    },
    setReelToParking:(reelNum)=>{
        return  _query({method:'POST',func: 'set_reel_to_parking',body:{method:'set_reel_to_parking', reelNum}});
    },
    // quick commands 
    queueReset:()=>{
        return  _query({method:'GET',func: 'queue_reset',body:false});
    },
    plateRotIn:()=>{
        return  _query({method:'GET',func: 'plate_rot_in',body:false});
    },
    plateRotOut:()=>{
        return  _query({method:'GET',func: 'plate_rot_out',body:false});
    },
    gripperIn:()=>{
        return  _query({method:'GET',func: 'gripper_in',body:false});
    },
    gripperOut:()=>{
        return  _query({method:'GET',func: 'gripper_out',body:false});
    },
    gripperClose:()=>{
        return  _query({method:'GET',func: 'gripper_close',body:false});
    },
    gripperOpen:()=>{
        return  _query({method:'GET',func: 'gripper_open',body:false});
    },
    powerOff:()=>{
        return _query({method:'GET', func:'power_off', body:false});
    },
    elevatorUp: ()=>{
        return  _query({method:'GET',func: 'direct_mode&arguments=1%201%200%201000',body:false, base:RUNAPI_BASE_URL});
    },
    elevatorDown: ()=>{
        return  _query({method:'GET',func: 'direct_mode&arguments=1%202%200%201000',body:false, base:RUNAPI_BASE_URL});
    },
    elevatorStop: ()=>{
        return  _query({method:'GET',func: 'direct_mode&arguments=1%203%200%200',body:false, base:RUNAPI_BASE_URL});
    },
    directControl: (instruction, motorNum, value)=>{
        return  _query({method:'GET',func: `direct_mode&arguments=${motorNum}%20${instruction}%200%20${value}`,body:false, base:RUNAPI_BASE_URL});
    },
    savePlateData: (serializedData)=>{
        return  _query({method:'GET',func: `platesave&${serializedData}`,body:false, base:API_BASE_URL});
    },
    saveReelData: (reelData) => {
        let {wheelid, operator_comment, administrator_comment, wheelstatus} = reelData;
        return  _query({method:'GET',func: `wheelsave&reelinfo_reelnum=${wheelid}&reelinfo_adcmt=${administrator_comment}&reelinfo_opcmt=${operator_comment}&reelinfo_status=${wheelstatus}`,body:false, base:API_BASE_URL});
    }
};