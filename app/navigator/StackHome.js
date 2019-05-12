import { createStackNavigator, createAppContainer } from "react-navigation";
import StackNavigator from '../navigator/Drawer';

const RootStack = createStackNavigator({
    StackNavigator: {
        screen: StackNavigator
    },
    initialRouteName: 'StackNavigator',
});

const StackHome = createAppContainer(RootStack);

export default StackHome;