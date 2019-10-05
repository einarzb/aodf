import React, { Component } from 'react';
import { connect } from 'react-redux';

// views
import TabsView from './views/TabsView';


 
// styling dependencies
import './App.css';
import {Grommet} from 'grommet/components/Grommet';
import { ModalBG, myTheme } from './views/styled';

class App extends Component {
  constructor(props){
    super(props);  
  }
  
  render() {
    let { showPasscodeModal } = this.props;
    
    return (

      <Grommet theme={myTheme} className="App">
      <TabsView/> 
   

       <ModalBG visible={showPasscodeModal}/>
        
       
       
       
      </Grommet>
    );
  }
}
 

const mapStateToProps = (state) => {
  const props = {
    showPasscodeModal:state.rebootReducer.showPasscodeModal
  }    
  //console.log(props);
  
  return props;
};

export default connect(
  mapStateToProps, 
  null)
  (App)


