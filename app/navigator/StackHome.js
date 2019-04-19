import { createStackNavigator, createAppContainer } from "react-navigation";
import Home from '../navigator/Home'

const RootStack = createStackNavigator({
    StackNavigator: {
        screen: Home
    },
    initialRouteName: 'StackNavigator'
});

const StackHome = createAppContainer(RootStack);

export default StackHome;