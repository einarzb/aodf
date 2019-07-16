import React from 'react';

import styled from 'styled-components';

import {Text} from 'grommet/components/Text'
import {MaskedInput} from 'grommet/components/MaskedInput'
import { Save } from 'grommet-icons/icons/Save'
import { Undo } from 'grommet-icons/icons/Undo'
// import { Calendar } from 'grommet-icons/icons/Calendar'
import {FormRow, RowTitle, RowData, DataText, OButton,RowChild, InputContainer} from './styled'

const IP_INPUT_PROPS = [
    {
      length:[1, 3],
      regexp:/^[0-9]*$/,
      placeholder:'#',
    },
    { fixed: '.'},
    {
      length: [1, 3],
      regexp:/^[0-9]*$/,
      placeholder:'#',
    },
    { fixed: '.'},
    {
      length: [1, 3],
      regexp:/^[0-9]*$/,
      placeholder:'#',
    },
    { fixed: '.'},
    {
      length: [1, 3],
      regexp:/^[0-9]*$/,
      placeholder:'#',
    },
  ];
  const ID_INPUT_PROPS = [
 
    { fixed: 'Major: '},
    {
      length: [1, 30],
      
    },
    { fixed: ', Minor: '},
    {
      length: [1, 30],
      
    }
  ];
export default class SettingsRow extends React.Component{

    render(){
              let {onChange, label, model, onSave } = this.props;
        
        if (onChange) {
            return (
            <FormRow>
                <RowTitle>
                  {label}
                </RowTitle>
                <RowData>
                  <RowChild>
                    <DataText>
                      {model}
                    </DataText>
                  </RowChild>
                  <InputContainer>
                    <MaskedInput value={model} onChange={(e)=>{onChange(e.target.value)}}
                    mask={IP_INPUT_PROPS}></MaskedInput>
                  </InputContainer>              
                  
                </RowData>
              </FormRow>)
        }
        return (
         <FormRow>
            <RowTitle>
              {label}
            </RowTitle>
            <RowData>
                <DataText>
                      {model}
                </DataText>
            </RowData>
          </FormRow>);  
    }
}

export class SettingsIDRow extends React.Component{
  render(){
    let {onChange, label, model, onSave , dataKey} = this.props;
    let major = model[dataKey + '_MAJOR_ID'];
    let minor = model[dataKey + '_MINOR_ID'];
    let formatted = `Major: ${major}, Minor: ${minor}`;
    return (<FormRow>
      <RowTitle>
        {label}
      </RowTitle>
      <RowData>
        <RowChild>
          <DataText>
            {formatted}
          </DataText>
        </RowChild>
        <InputContainer>
          <MaskedInput value={formatted} onChange={(e)=>{
            let parts = e.target.value.split(',');
            model[dataKey + '_MAJOR_ID'] = parts[0].split(": ")[1]
            model[dataKey + '_MINOR_ID'] = parts[1].split(": ")[1]
  
            onChange(model)}
          }
          mask={ID_INPUT_PROPS}></MaskedInput>
        </InputContainer>              
        
      </RowData>
    </FormRow>);
  
  }
  }

export const ButtonsContainer = styled(RowChild)`
  flex:1;
  flex-direction:row;
`;
