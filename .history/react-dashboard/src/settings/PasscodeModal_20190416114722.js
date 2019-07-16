import React, { Component } from 'react';
import {Text} from 'grommet/components/Text';
import {TextInput} from 'grommet/components/TextInput';
import {Heading} from 'grommet/components/Heading';
import styled from 'styled-components';
import { Close } from 'grommet-icons/icons/Close'
import {NicePopup, OButton} from './settings/styled';

export default class PasscodeModal extends React.Component{
    
    render(){
        let { unSavedChanges } = this.props;
        return (<SaveModal>
            <MOButton icon={<Close/>} onClick={this.closeModal}/>
            <div>
             
              <br/>
              <Heading level={4} >{`Are you sure you want to make ${unSavedChanges.length} change${unSavedChanges.length>1 ? 's':''}?`}<br/>
                <ChangeList>
                  {
                    unSavedChanges.map(change=>{
                      if (typeof change.value === 'object'){
                        return (<li><span>'{change.fieldName}': <br/>
                        <ul>
                          {Object.keys(change.value).map(changeKey=>{return (
                            <li><span>'{changeKey}' to {change.value[changeKey]}</span></li>
                          )}
                            
                          )}
                        </ul></span></li>)
                      }else{
                        return (<li><span>'{change.fieldName}' to {change.value}</span></li>)
                      }
                    })
                  }
                </ChangeList>
              <br/>
              Enter passcode to verify change
              </Heading>
              <MTextInput size="small" placeholder={'######'} onChange={(e)=>{this.onPasscodeEntered(e.target.value)}}></MTextInput>
              <br/>
            </div>
          </SaveModal>)
    }
}





const SaveModal = styled(NicePopup)`
    color: red;
    font-size:1.3em;
    margin:10% 30%;
    width:40%;
    
    & > div {
      display:flex;
      flex-direction:column;
      align-items:center;
      text-align:center;
      width:100%;
      position:relative;
      &  button{
        width:200px;
        
      }
    }
    & > button{
      position:absolute;
      right:20px;
      top:20px;
      z-index:1001;
    }
    
`;
const ModalActions = styled.div`
  display: flex;
  flex-direction:row;
  align-items:center;
  justify-content:space-between;
  width:100%;
  &  button{
    /* color:black!important; */
    /* margin-left:15px; */
  }
  
`;

const MTextInput = styled(TextInput)`
    width:160px;

`;

const MOButton = styled(OButton)`
  z-index:1001;
`;

const ChangeList = styled.ul`
  text-align:left;
`;