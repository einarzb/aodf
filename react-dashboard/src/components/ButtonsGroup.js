
import React from 'react';
import {ButtonsFlexer, QCButton} from './Common';

const ButtonsGroup = ({btnsArr, width, border}) => {
    
  let buttonComponents = btnsArr.map(function(button, i) {
    return <QCButton key={i} label={button.label} onClick={button.onClick} style={{width:button.width,backgroundColor:button.bgColor}}></QCButton>
  })

  width = width || "100%"

  return(
    <ButtonsFlexer style={{width, border}}> 
      {buttonComponents}
    </ButtonsFlexer>
  )
}

export default ButtonsGroup