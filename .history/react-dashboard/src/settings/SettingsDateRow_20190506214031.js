import React from 'react';
import styled from 'styled-components';


import TimePicker from 'react-time-picker'
import {Calendar} from 'grommet/components/Calendar';
import {Heading} from 'grommet/components/Heading';
import {MaskedInput} from 'grommet/components/MaskedInput'
import {Text} from 'grommet/components/Text'
import {DataText ,FormRow, RowTitle, RowData, OButton,RowChild, InputContainer, NicePopup} from './styled';

const padHourInt = (original) => {
  console.log(original)
  console.log(original.length)

 return  ( original.toString().length > 1) ? `${original}` : `0${original}`;
}
// const TIMEZONES = [ "UTC−12:00","UTC−11:00","UTC−10:30","UTC−10:00","UTC−09:30","UTC−09:00","UTC−08:30","UTC−08:00","UTC−07:00","UTC−06:00","UTC−05:00","UTC−04:30","UTC−04:00","UTC−03:30","UTC−03:00","UTC−02:30","UTC−02:00","UTC−01:00","UTC","UTC+00:20","UTC+00:30","UTC+01:00","UTC+01:24","UTC+01:30","UTC+02:00","UTC+02:30","UTC+03:00","UTC+03:30","UTC+04:00","UTC+04:30","UTC+05:00","UTC+05:30","UTC+06:00","UTC+06:30","UTC+07:00","UTC+08:00","UTC+09:00","UTC+09:30","UTC+09:45","UTC+10:00","UTC+10:30","UTC+11:00","UTC+11:30","UTC+12:00","UTC+12:45","UTC+13:00","UTC+14:00"];
// // const HOURS = [
//     {
//       length: [1, 2],
//       // options: ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12', ],
//       // regexp: /^1[1-2]$|^[0-9]$/,
//       regexp: /^(?:[01]\d|2[0123])/,
//       placeholder: 'hh',
//     },
//     { fixed: ':' },
//     {
//       length: 2,
//       // options: ['00', '15', '30', '45'],
//       regexp: /^[0-5][0-9]$|^[0-9]$/,
//       placeholder: 'mm',
//     },
//     { fixed: ':00' },
    
//     // { fixed: ' ' },
//     // {
//     //   length: 2,
//     //   options: ['am', 'pm'],
//     //   regexp: /^[ap]m$|^[AP]M$|^[aApP]$/,
//     //   placeholder: 'ap',
//     // },
//   ];
export default class SettingsDateRow extends React.Component{
    
    constructor(){
        super()
        this.state = {
          isShowingDate:false, 
          editedTOD:"00:00", 
          editedDate:new Date(Date.now()), 
          shownDate:new Date(Date.now()),
          showConfirm:true
        };
    }
    
    componentDidMount(){
      let { time } = this.props;
      let editedDate = new Date(Date.parse(time));
      let shownDate = new Date(Date.parse(time));
      this.setState({
        shownDate,
        editedDate,
        editedTOD:`${shownDate.getUTCHours()}:${shownDate.getUTCMinutes()}`
      });
    }
    componentDidUpdate(prevProps){
      let prevTime = prevProps.time;
      let {shownDate} = this.state;

      let {time} = this.props;
      if (time!== prevTime){
        let shownDate = new Date(Date.parse(time));
        this.setState({
          shownDate,
          // editedTOD:`${editedDate.getUTCHours()}:${editedDate.getUTCMinutes()}:00`
        });
      }
    }

    onDateChange = () => {
        
        let {editedDate, editedTOD} = this.state;
        let hoursArr = editedTOD.split(":");
        editedDate.setUTCHours(hoursArr[0]);
        editedDate.setUTCMinutes(hoursArr[1]);
        // editedDate.setUTCSeconds(hoursArr[2]);
        console.log(editedDate)
        this.setState({isShowingDate:false, editedDate})
        let dateToSend = `${padHourInt(editedDate.getUTCMonth()+1)}${padHourInt(editedDate.getUTCDate())}${padHourInt(hoursArr[0])}${padHourInt(hoursArr[1])}${editedDate.getUTCFullYear()}`
        this.props.onChange(dateToSend);
        // alert(`date ${date}`);        
    }
    onTODChange = (editedTOD)=>{
      console.log(editedTOD);
      if(editedTOD){
        this.setState({editedTOD})

      }else{
        // this.setState({editedTOD:"00:00:00"})
      }
    }

    render(){
        let {onDateChange, onZoneChange, time, label} = this.props;
        // let tz = model.substring(model.indexOf('UTC'))
        let {isShowingDate, editedTOD, editedDate, shownDate, showConfirm} = this.state
        return (
            <FormRow>
                <RowTitle>
                  {label}
                </RowTitle>
                <RowData>
                  <RowChild>
                    <DataText>
                      {shownDate.toUTCString()}
                    </DataText>
                  </RowChild>
                  <InputContainer>
                    <OButton onClick={()=>{this.setState({isShowingDate:true})}} label={'Change'}></OButton>

                  </InputContainer>              
                {
                isShowingDate?    
                <CalendarPopup>
                  {
                  !showConfirm ?
                  <CalendarBG>
                    <Calendar   
                      alignSelf="center"                 
                      size="small"
                      disableClock={true}
                      date={editedDate.toUTCString()}
                      onSelect={(date) => {
                        console.log(date)
                        this.setState( {editedDate:new Date(date) })}
                        }>
                      </Calendar>
                          <TimePicker format={"HH:mm"} isOpen={false} onChange={(date)=>{this.onTODChange(date)}}/>
                      <ModalButtons>
                        <OButton onClick={()=>{this.setState({isShowingDate:false})}} label={'Cancel'}></OButton>
                        <OButton onClick={()=>{this.setState({showConfirm:true})}} label={'Set'}></OButton>
                      </ModalButtons>
                    </CalendarBG>   
                  :
                  <CalendarBG>
                    <Heading level={4}>{`Are you sure you want to change machine date to: `}</Heading>
                    <Heading color={'red'} level={2}>{`${editedDate.toDateString()} ${editedTOD}?`}</Heading>
                    <ModalButtons>
                        <OButton onClick={()=>{this.setState({showConfirm:false})}} label={'Back'}></OButton>
                        <OButton onClick={()=>{this.onDateChange(editedDate)}} label={'Confirm'}></OButton>
                      </ModalButtons>
                  </CalendarBG>   
                    
                  }              
                </CalendarPopup>
                :
                <span></span>
                }
                </RowData>
              </FormRow>)
       
    }
}

const SmallerInput = styled(MaskedInput)`
    width: 50%;
    text-align: center;
`;

const CalendarPopup = styled(NicePopup)`
  padding:10px;
  width:250px;
  
`;
const CalendarBG = styled.div`
  width:100%;
  display: flex;
  flex-direction: column;
  align-items:space-evenly;
  & > .react-time-picker{
    display: flex;
    justify-content:center;
  }
`;

const ModalButtons = styled(RowChild)`
  justify-content: space-around;
    padding: 10px 0;
`;