import React from 'react';

import styled from 'styled-components';

import {Text} from 'grommet/components/Text'
import {MaskedInput} from 'grommet/components/MaskedInput'
import { TextInput } from 'grommet/components/TextInput';
import { CheckBox } from 'grommet/components/CheckBox';
import { Anchor } from 'grommet/components/Anchor'
import { Heading } from 'grommet/components/Heading'
import { Save } from 'grommet-icons/icons/Save'
import { Undo } from 'grommet-icons/icons/Undo'
// import { Calendar } from 'grommet-icons/icons/Calendar'
import {ConfRow, FormRow, RowTitle, RowData, DataText, OButton,RowChild, InputContainer, InputCalibContainer} from './styled'

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
    {
      length: [1, 30]
  
    }
  ];



export default class SettingsRow extends React.Component{

    render(){
              let {onChange, label, model, isIp} = this.props;
        
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
                  {
                    isIp? 
                    <MaskedInput value={model} onChange={(e)=>{onChange(e.target.value)}}
                    mask={IP_INPUT_PROPS}></MaskedInput>
                    :
                    <TextInput value={model} onChange={(e)=>
                      {onChange(e.target.value)}}></TextInput>
                  }
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


export class CalibrationRow extends React.Component{

  render(){
            let {onChange, label, model, isIp} = this.props;
      
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
                <InputCalibContainer>            
                  <TextInput value={model} onChange={(e)=>
                    {onChange(e.target.value)}}></TextInput>
                </InputCalibContainer>              
                
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



export class ConfigurationRow extends React.Component{
  render(){
    let {onChange, label, model, isIp} = this.props;
    if (onChange) {
      return (
      <ConfRow>
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
            {
              isIp? 
              <MaskedInput value={model} onChange={(e)=>{onChange(e.target.value)}}
              mask={IP_INPUT_PROPS}></MaskedInput>
              :
              <TextInput value={model} onChange={(e)=>{
                onChange(e.target.value);
              }}></TextInput>
            }
              
            </InputContainer>              
            
          </RowData>
        </ConfRow>)
  }
  return (
   <ConfRow>
      <RowTitle>
        {label}
      </RowTitle>
      <RowData>
          <DataText>
                {model}
          </DataText>
      </RowData>
    </ConfRow>);  
 }
}  
export class HalfRow extends React.Component{

  render(){
            let {labelLeft, modelLeft, labelRight, modelRight} = this.props;
      return (
       <FormRow>
          <RowTitle>
            {labelLeft}
          </RowTitle>
          <RowData>
              <DataText>
                    {modelLeft}
              </DataText>
          </RowData>
          <RowTitle>
            {labelRight}
          </RowTitle>
          <RowData>
              <DataText>
                    {modelRight}
              </DataText>
          </RowData>
        </FormRow>);  
  }
}
export class SettingsDownloadRow extends React.Component{
  render(){
    let {label, model , refresher} = this.props;
   
    return (<FormRow>
      <RowTitle>
        {label}
      </RowTitle>
      <RowData>
        
        <InputContainer>
          {model && <a href={model} download>
            <Heading level={3}>Download</Heading>
          </a>}
         { refresher && <a href="#" onClick={refresher}>
            <Heading level={3}>Download</Heading>
          </a>}
        </InputContainer>              
        
      </RowData>
    </FormRow>);
  
  }
}
export class SettingsNTPSyncRow extends React.Component{
  render(){
    let {onChange, label, model } = this.props;
   
    return (<FormRow>
      <RowTitle>
        {label}
      </RowTitle>
      <RowData>
        
        <InputContainer>
        {
        model != '-1'?
        <CheckBox  
          checked={model == '200'}
          
          onChange={(event) => {
            onChange((event.target.checked ? '200':'0'));
            }}></CheckBox>
            :
            <Heading level={4} color={'red'}>{"NTP ENABLE SCRIPT MISSING"}</Heading>
        }
          
        </InputContainer>              
        
      </RowData>
    </FormRow>);
  
  }
}
// export class SettingsIDRow extends React.Component{
//   render(){
//     let {onChange, label, model, onSave , dataKey} = this.props;
//     let major = model[dataKey + '_MAJOR_ID'];
//     let minor = model[dataKey + '_MINOR_ID'];
//     let formatted = `Major: ${major}, Minor: ${minor}`;
//     return (<FormRow>
//       <RowTitle>
//         {label}
//       </RowTitle>
//       <RowData>
//         <RowChild>
//           <DataText>
//             {formatted}
//           </DataText>
//         </RowChild>
//         <InputContainer>
//           <MaskedInput value={formatted} onChange={(e)=>{
//             let parts = e.target.value.split(',');
//             model[dataKey + '_MAJOR_ID'] = parts[0].split(": ")[1]
//             model[dataKey + '_MINOR_ID'] = parts[1].split(": ")[1]
  
//             onChange(model)}
//           }
//           mask={ID_INPUT_PROPS}></MaskedInput>
//         </InputContainer>              
        
//       </RowData>
//     </FormRow>);
  
//   }
// }
export class SettingsIDRow extends React.Component{
  render(){
    let {onChange, label, model, onSave , dataKey} = this.props;
    // let major = model[dataKey + '_MAJOR_ID'];
    // let minor = model[dataKey + '_MINOR_ID'];
    // let formatted = `Major: ${major}, Minor: ${minor}`;
    return (<FormRow>
      <RowTitle>
        {label}
      </RowTitle>
      <RowData>
        <RowChild>
          <DataText>{model}</DataText>
        </RowChild>
        <InputContainer>
          <MaskedInput value={model} onChange={(e)=>{
            // let parts = e.target.value.split(',');
            // model[dataKey + '_MAJOR_ID'] = parts[0].split(": ")[1]
            // model[dataKey + '_MINOR_ID'] = parts[1].split(": ")[1]
  
            onChange(e.target.value)}
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
