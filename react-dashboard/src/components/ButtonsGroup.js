
import React from 'react';
import {ButtonsFlexer, QCButton} from './Common';

const ButtonsGroup = ({btnsArr, width, border, bgColor}) => {
    
  let buttonComponents = btnsArr.map(function(button) {
    return <QCButton label={button.label} onClick={button.onClick} style={{width:button.width,backgroundColor:button.bgColor}}></QCButton>
  })

  width = width || "100%"

  return(
    <ButtonsFlexer style={{width, border}}> 
      {buttonComponents}
    </ButtonsFlexer>
  )
}

export default ButtonsGroup