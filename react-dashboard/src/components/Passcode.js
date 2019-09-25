
import React from 'react';
import {Heading} from 'grommet/components/Heading';
import {ChangeList} from '../views/styled';

const Passcode = ({changesBlock}) => {
    
  let saveModalComponent = changesBlock.map(function(arrName, i) {
  return <div><Heading level={4} key={i}> {`Are you sure you want to make ${arrName.arr.length} change${arrName.arr.length > 1 ? 's':''}?`}
  </Heading>
 <ChangeList>
 {
   arrName.arr.map((change, ii) => {
     if (typeof change.value === 'object') {
       // if the value is an object then you need to loof inside of it.
           return(
             <li key={`change${ii}`}>
               <span>'{change.fieldName}' : <br/>
                 <ul>
                   { 
                     Object.keys(change.value).map(
                       (changeKey,cindex) => { 
                         return (
                             <li key={`sub_change${cindex}`}>
                               <span>'{changeKey}' to {change.value[changeKey]}</span>
                             </li>
                         )
                       }
                     )
                   }
                 </ul>
               </span>
             </li>)
     } else {
         // if the value isnt an object 
           return (
             <li key={`change${ii}`}>
               <span>'{change.fieldName}' to {change.value}</span>
             </li>
           )
         }
       }) 
      }
      </ChangeList>  
      </div>
        })
           

  return(
    <div>
      {saveModalComponent}
    </div>
  )
}

export default Passcode


{/**

        {`Are you sure you want to make ${arrName.arr.length} change${arrName.arr.length > 1 ? 's':''}?`}
           <ChangeList>
                {
                  changesToSave.name.map((change, ii) => {
                    if (typeof change.value === 'object') {
                      // if the value is an object then you need to loof inside of it.
                          return(
                            <li key={`change${ii}`}>
                              <span>'{change.fieldName}' : <br/>
                                <ul>
                                  { 
                                    Object.keys(change.value).map(
                                      (changeKey,cindex) => { 
                                        return (
                                            <li key={`sub_change${cindex}`}>
                                              <span>'{changeKey}' to {change.value[changeKey]}</span>
                                            </li>
                                        )
                                      }
                                    )
                                  }
                                </ul>
                              </span>
                            </li>)
                    } else {
                        // if the value isnt an object 
                          return (
                            <li key={`change${ii}`}>
                              <span>'{change.fieldName}' to {change.value}</span>
                            </li>
                          )
                        }
                }) 
              }

            </ChangeList>
            <br/>
             Enter passcode to verify change
*/}