import React from 'react';
import styled from 'styled-components'
import { Table } from 'grommet/components/Table';
import {TableHeader } from 'grommet/components/TableHeader';
import {TableRow} from 'grommet/components/TableRow';
import {TableCell} from 'grommet/components/TableCell';
import {TableBody} from 'grommet/components/TableBody';


const RoutinesTable = ({tableCols, children}) => {   
  let TableColsComponent = tableCols.map(function(col, i) { 
      return <TableCell style={{marginBottom:'10px', width:'auto'}} scope="col" border="bottom" key={i}>
              {col.label}
             </TableCell>
    })
  return(
    <TableWrapper>
        <Table>
          <TableHeader style={{display:"inline-flex", width:"80%"}}>
            <TableRow>
             {TableColsComponent}
            </TableRow>
          </TableHeader>
          <TableBody style={{display:"inline-flex", width:'100%', alignItems:'center'}}>
                {children}          
          </TableBody>
        </Table>
    </TableWrapper>    
  )
}

export default RoutinesTable;

export const TableWrapper = styled.div`
  display:inline-flex;
  flex-direction:column;
  width:100%;
  text-align:left;
  margin: 0;
  height:auto;
  font-size: 13px;
  margin-bottom: 10px;
`;


