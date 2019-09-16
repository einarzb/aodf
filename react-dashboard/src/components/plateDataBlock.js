import React from 'react';
import styled from 'styled-components';

const PlateDataBlock = ({plateData}) => {
    
  let plateDataBlockComponent = plateData.map(function(data, i) {
    return <DataRow key={i}>
             {data.label} : {data.value}
          </DataRow>
  })

  return(
    <DataWrapper> 
      {plateDataBlockComponent}
    </DataWrapper>
  )
}

export default PlateDataBlock

const DataWrapper = styled.div`
    display:inline-flex;
    flex-direaction:row;
    width: 200px;
    border:1px solid blue;
`;

const DataRow = styled.div`
display:inline-flex;
flex-direaction:row;
`;