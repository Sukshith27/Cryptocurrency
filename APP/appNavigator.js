import {createStackNavigator, createAppContainer} from 'react-navigation';
import Home from './home';
import Details from './details'

const MainNavigator = createStackNavigator({
    Home: Home,
    Details: Details,
  });
  
  const AppNavigator = createAppContainer(MainNavigator);
  
  export default AppNavigator;
