import React from 'react';
import styled from 'styled-components';

const DataBlock = ({dataBatch}) => {
    
  let dataBlockComponent = dataBatch.map(function(data, i) {
    return <DataRow key={i}><strong> {data.label}</strong> : {data.value}</DataRow> 
  })

  return(
    <DataWrapper>
      {dataBlockComponent}

    </DataWrapper>
  )
}

export default DataBlock

const DataWrapper = styled.div`
  display:block;
  width:100%;
text-align:left;
margin: 10px 0;
`;

const DataRow = styled.div`

`;