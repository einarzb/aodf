import React, { Component } from 'react';
import styled from 'styled-components';
import {OButton} from './settings/styled';
class RebootView extends Component{
    render(){
        return (<div>
             <OButton>Are you sure you want to reboot ?</OButton>

        </div>);
    }
}
export default RebootView;