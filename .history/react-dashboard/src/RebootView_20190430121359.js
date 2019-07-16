import React, { Component } from 'react';
import styled from 'styled-components';
import {OButton} from './settings/styled';
import {Heading} from 'grommet/components/Heading'

class RebootView extends Component{
    constructor(){
        super()
        this.state = {
            rebootInProgress:false,
            rebootStartTime:false
        }
    }
    confirm= ()=>{
        this.props.reboot();
        let d = new Date();
        this.setState({rebootInProgress:true, rebootStartTime:d.toDateString()})
    }
    render(){
        let {rebootInProgress, rebootStartTime} = this.state
        return (<div>
                            <br/>
                <br/>                <br/>
                <br/>                <br/>
                <br/>
            {!rebootInProgress ? 
            <OButton label={'CONFIRM REBOOT'} onClick={this.confirm} ></OButton>
            :
            <Heading >
                Reboot command sent to machine at {rebootStartTime} 
                <br/>
                <br/>
                You can refresh this page after ~ 1 minute
            </Heading>
            
            }
        </div>);
    }
}
export default RebootView;