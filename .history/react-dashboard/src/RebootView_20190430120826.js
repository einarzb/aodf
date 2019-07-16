import React, { Component } from 'react';
import styled from 'styled-components';
import {OButton} from './settings/styled';
import {Heading} from 'grommet/components/Heading'

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
        this.setState({rebootInProgress:true, rebootStartTime:d.toString()})
    }
    render(){
        let {rebootInProgress} = this.state
        return (<div>
            {rebootInProgress ? 
            <OButton label={'CONFIRM REBOOT'} onClick={this.confirm} ></OButton>
            :
            <Heading> </Heading>
            }
        </div>);
    }
}
export default RebootView;