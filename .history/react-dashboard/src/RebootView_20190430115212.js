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

    }
    render(){
        return (<div>
             <OButton label={'CONFIRM REBOOT'}></OButton>

        </div>);
    }
}
export default RebootView;