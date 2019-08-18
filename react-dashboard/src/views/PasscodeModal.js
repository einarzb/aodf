import React, { Component } from 'react';
import { connect } from 'react-redux';

import styled from 'styled-components';

import {Heading} from 'grommet/components/Heading';
import { Close } from 'grommet-icons/icons/Close'
import {NicePopup, OButton, SaveModal, ModalActions, MTextInput, MOButton, ChangeList} from './styled';

class PasscodeModal extends React.Component{
    
    render(){
        let { unSavedChanges, onPasscodeEntered, close} = this.props;
        return (<SaveModal>
            <MOButton icon={<Close/>} onClick={close}/>
            <div>
             
              <br/>
              <Heading level={4} >{`Are you sure you want to make ${unSavedChanges.length} change${unSavedChanges.length>1 ? 's':''}?`}<br/>
                <ChangeList>
                  {
                    unSavedChanges.map((change, ii)=>{
                      if (typeof change.value === 'object'){
                        return (<li key={`change${ii}`}><span>'{change.fieldName}': <br/>
                        <ul>
                          {Object.keys(change.value).map((changeKey,cindex)=>{return (
                            <li key={`sub_change${cindex}`}><span>'{changeKey}' to {change.value[changeKey]}</span></li>
                          )}
                            
                          )}
                        </ul></span></li>)
                      }else{
                        return (<li key={`change${ii}`}><span>'{change.fieldName}' to {change.value}</span></li>)
                      }
                    })
                  }
                </ChangeList>
              <br/>
              Enter passcode to verify change
              </Heading>
              <MTextInput size="small" placeholder={'######'} onChange={(e)=>{onPasscodeEntered(e.target.value)}}></MTextInput>
              <br/>
            </div>
          </SaveModal>)
    }
}

const mapStateToProps = (state) => ({  
  unSavedChanges:state.saveChangesReducer
});

//connecting this view to the store
export default connect(
  mapStateToProps)
  (PasscodeModal)



