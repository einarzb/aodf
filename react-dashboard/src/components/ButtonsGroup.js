
import React from 'react';
import {ButtonsFlexer, QCButton} from './Common';

const ButtonsGroup = ({btnsArr, width}) => {
    
  let buttonComponents = btnsArr.map(function(button) {
    return <QCButton label={button.label} onClick={button.onClick} ></QCButton>
  })

  width = width || "50%"

  return(
    <ButtonsFlexer style={{width}}> 
      {buttonComponents}
    </ButtonsFlexer>
  )
}

export default ButtonsGroup