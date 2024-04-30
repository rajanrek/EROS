
import React, {useEffect} from 'react';
import MainNavigator from './src/navigation/navigation';
import Services from './src/utils/Services';
import {LogBox} from 'react-native';
  
LogBox.ignoreAllLogs();

function App(){




  useEffect(() => {

  }, []);
  Services(false)
  return ( 
    
     <MainNavigator />
    )
}

export default App;
