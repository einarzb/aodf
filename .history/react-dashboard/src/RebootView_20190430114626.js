import React, { Component } from 'react';
import styled from 'styled-components';
import {Heading} from 'grommet/components/Heading';
export default class RebootView extends Component{
    render(){
        return (<div>
             <Heading>Are you sure you want to reboot ?</Heading>
        </div>);
    }
}