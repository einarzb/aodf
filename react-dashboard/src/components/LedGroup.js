import React from 'react';
import {LedsFlexer, SwitchsWrapper} from './Common'
import styled from 'styled-components'


let ledsIndicators = (ledStatus) => {  
  let ledsColorsMap = {
    "0": "#7CFC00", //green
    "1": "#B22222", //red
    "2": "#D3D3D3" // default - grey
  }
  return ledsColorsMap[ledStatus]
}

const LedGroup = ({switchesArr}) => {
    
  let ledsComponents = switchesArr.map(function(led) {
   
    return <SwitchsWrapper>
              <SwitchTitle>{led.ledNum}</SwitchTitle>
              <SwitchHandle style={{backgroundColor:ledsIndicators(led.limitSwitchStatus)}}> </SwitchHandle> 
           </SwitchsWrapper>              
  })

  return(
    <LedsFlexer> 
      {ledsComponents}
    </LedsFlexer>
  )
}

export default LedGroup

//style

export const SwitchHandle = styled.div`
    display:block;
    margin: 0px 10px;
    border-color:black;
    width: 80px;
    height: 20px;
    border-radius: 1rem;
    &: hover { box-shadow: 0px 0px 0px 0px #888888; }

`;

export const SwitchTitle = styled.div`
    width: 100px;
    height: auto;
`;