import React from 'react';

const plateDataBlock = ({plateData}) => {
    
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

export default plateDataBlock

const DataWrapper = styled.div`
    display:inline-flex;
    flex-direaction:column;
`;

const DataRow = styled.div`
display:inline-flex;
flex-direaction:row;
`;