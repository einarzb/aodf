import React, { Component } from 'react';
import styled from 'styled-components';
import {OButton} from './settings/styled';


class RebootView extends Component{
    constructor(){
        this.state = {
            rebootInProgress:false,
            rebootStartTime:false
        }
    }
    confirm= ()=>{
        this.props.reboot();
        let d = new Date;
        this.setState({rebootInProgress:true, rebootStartTime:d.toString})
    }
    render(){
        let re
        return (<div>
            {rebootInProgress ? 
            <OButton label={'CONFIRM REBOOT'}></OButton>
            :
            
            }
        </div>);
    }
}
export default RebootView;