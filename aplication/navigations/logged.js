import React from 'react';
import RestaurantsScreen from '../screens/Restaurants/Restaurants';
import AddRestaurantScreen from '../screens/Restaurants/AddRestaurant';
import DetailRestaurantScreen from '../screens/Restaurants/DetailRestaurant';
import EditRestaurantScreen from '../screens/Restaurants/EditRestaurant';
import ReviewsRestaurantScreen from '../screens/Restaurants/ReviewsRestaurant';

import LogoutScreen from '../screens/Logout';
import ProfileScreen from '../screens/Profile';

import { createDrawerNavigator, createStackNavigator } from 'react-navigation';
import Icon from 'react-native-vector-icons/FontAwesome';

const navigationOptions = {
    navigationOptions: {
        headerStyle: {
            backgroundColor: 'rgba(200, 38, 74, 1)'
        },
        headerTitleStyle: {
            textAlign: 'center',
            alignSelf: 'center',
            fontSize: 20,
            color: '#fff',
            fontWeight: 'bold'
        }
    }
}

const leftIcon = (navigation, icon) => <Icon 
    name={icon}
    style={{marginLeft: 20}}
    size={20}
    color="white"
    onPress={ () => navigation.openDrawer('DrawerOpen') }
/>;

const rightIcon = (navigation, icon) => <Icon 
    name={icon}
    style={{marginLeft: 20, marginRight: 20}}
    size={30}
    color="white"
    onPress={ () => navigation.navigate('ListRestaurants') }
/>;

const restaurantsScreenStack = createStackNavigator(
    {
        ListRestaurants: {
            screen: RestaurantsScreen,
            navigationOptions: ( {navigation} ) => ({
                title: 'Restaurants',
                headerLeft: leftIcon(navigation, 'bars')
            })
        },
        AddRestaurant: {
            screen: AddRestaurantScreen,
            navigationOptions: ({navigation}) => ({
                title: 'Add Restaurant',
                headerRight: rightIcon(navigation, 'home'),
                headerLeft: leftIcon(navigation, 'bars')
            })
        },
        DetailRestaurant: {
            screen: DetailRestaurantScreen,
            navigationOptions: ({navigation}) => ({
                title: 'Detail of the Restaurant',
                headerRight: rightIcon(navigation, 'home'),
                headerLeft: leftIcon(navigation, 'bars')
            })
        },
        EditRestaurant: {
            screen: EditRestaurantScreen,
            navigationOptions: ({navigation}) => ({
                title: 'Update Restaurant',
                headerRight: rightIcon(navigation, 'home'),
            })
        }
    },
    navigationOptions
);

const ProfileScreenStack = createStackNavigator(
    {
        ProfileScreen: {
            screen: ProfileScreen,
            navigationOptions: ({navigation}) => ({
                title: 'Profile',
                headerLeft: leftIcon(navigation, 'bars'),
                headerRight: rightIcon(navigation, 'home')
            })
        }
    },
    navigationOptions
)

const logoutScreenStack = createStackNavigator(
    {
        LogoutScreen:{
            screen: LogoutScreen,
            navigationOptions: ({ navigation }) => ({
                title: 'Logout',
            })
        }   
    }
);

const ReviewsRestaurantScreenStack = createStackNavigator(
    {
        ReviewsRestaurant:{
            screen: ReviewsRestaurantScreen,
            navigationOptions: ({ navigation }) => ({
                title: 'Valoraciones',
                headerLeft: leftIcon(navigation, 'bars'),
                headerRight: rightIcon(navigation, 'home')
            })
        }   
    },
    navigationOptions
);

export default createDrawerNavigator(
    {
        RestaurantsScreen:{
            screen: restaurantsScreenStack,
            navigationOptions: ({navigation}) => ({
                drawerLabel: 'Restaurants',
                drawerIcon: ({tintColor}) => (<Icon name="home" size={30} style={{color: tintColor}} />)
            })
        },
        ProfileScreen:{
            screen: ProfileScreenStack,
            navigationOptions: ({navigation}) => ({
                drawerLabel: 'Profile',
                drawerIcon: ({tintColor}) => (<Icon name="user" size={30} style={{color: tintColor}} />)
            })
        },
        ReviewRestaurantScreen:{
            screen: ReviewsRestaurantScreenStack,
            navigationOptions: ({navigation}) => ({
                drawerLabel: 'Reviews',
                drawerIcon: ({tintColor}) => (<Icon name="comments" size={30} style={{color: tintColor}} />)
            })
        },
        LogoutScreen:{
            screen: logoutScreenStack,
            navigationOptions: ({navigation}) => ({
                drawerLabel: 'Logout',
                drawerIcon: ({tintColor}) => (<Icon name="sign-out" size={30} style={{color: tintColor}} />)
            })
        }
    },
    {
        drawerBackgroundColor: 'rgba(128, 35, 60, 0.7)',
        contentOptions: {
            activeTintColor: 'white',
            activeBackgroundColor: 'transparent',
            inactiveTintColor: 'white',
            itemsContainerStyle: {
                marginVertical: 0
            }
        }
    }
)
