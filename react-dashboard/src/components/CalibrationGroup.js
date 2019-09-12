import React from 'react';
import styled from 'styled-components'


import {calibrationRow, CalibrationsGroupWrapper} from './Common';


const CalibrationGroup = ({calibRow, setValue, children}) => {    
  
  let CalibrationRowComponents = calibRow.map(function(item) {
 
    return <CalibrationsGroupWrapper>
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
`;

export const MainRow = styled.div`
  display:inline-flex;
  flex-direction:row;
  width:100%;
  justify-content:space-between;
  align-items:center;
  padding: 7px 0px;
`;

const CalibrationLabel = styled.label`
  font-size:12px;
  width: 36%;
  height:70px;
  line-height:1;
  margin: 0px 8px;  

`;

