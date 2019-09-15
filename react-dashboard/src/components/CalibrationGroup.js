import React from 'react';
import styled from 'styled-components'


import {CalibrationsGroupWrapper} from './Common';


const CalibrationGroup = ({calibRow, children}) => {    
  
  let CalibrationRowComponents = calibRow.map(function(item, i) {
 
    return <CalibrationsGroupWrapper key={i}>
                <p>{item.headline}</p>
                <MainRow>
                  {children}
                </MainRow>
           </CalibrationsGroupWrapper>
  })

  return(
    <CalibrationWrapper>
      {CalibrationRowComponents}
    </CalibrationWrapper>    
  )
}

export default CalibrationGroup

export const CalibrationWrapper = styled.div`
  display:inline-flex;
  flex-direction:column;
  width:50%;
  text-align:left;
  margin: 0;
  height:auto;
`;

export const MainRow = styled.div`
  display:inline-flex;
  flex-direction:row;
  width:100%;
  justify-content:start;
  align-items:center;
  padding: 7px 0px;
  margin: 0;
`;

