import React, { Component } from 'react';
import { View } from 'react-native';
import BackgroundImage from '../components/BackgroundImage';
import AppButton from '../components/AppButton';
import { NavigationActions } from 'react-navigation';
import Toast from 'react-native-simple-toast';
import * as firebase from 'firebase';
import facebook from '../utils/facebook';


export default class Start extends Component {

    static navigationOptions = {
        title: 'Expo App'
    }

    login (){
        const navigateAction = NavigationActions.navigate({
            routeName: 'Login'
        })
        this.props.navigation.dispatch(navigateAction)
    }

    register (){
        const navigateAction = NavigationActions.navigate({
            routeName: 'Register'
        })
        this.props.navigation.dispatch(navigateAction)
    }

    async facebook(){
        const { type, token } = await Expo.Facebook.logInWithReadPermissionsAsync(
            facebook.config.aplication_id,
            { permissions: facebook.config.permissions }
        )

        if(type === 'success'){
            const credentials = firebase.auth.FacebookAuthProvider.credential(token);
            firebase.auth().signInWithCredential(credentials)
                .catch( error => {
                    Toast.showWithGravity('Error accessing with facebook', Toast.LONG, Toast.BOTTOM)
                })
        }else if(type === 'cancel'){
            Toast.showWithGravity('Login canceled', Toast.LONG, Toast.BOTTOM)
        }else{
            Toast.showWithGravity('Error Generated', Toast.LONG, Toast.BOTTOM)
        }
    }

    render() {
        return (
            <BackgroundImage 
				source={require('../../assets/images/fondo.png')}
			>
                <View style={{ justifyContent: 'center', flex: 1 }} >
                    <AppButton 
                        bgColor="#ef693f80"
                        title="Enter"
                        action={this.login.bind(this)}
                        iconName="sign-in"
                        iconColor="#fff"
                    />
                    <AppButton 
                        bgColor="#b968c77a"
                        title="Register"
                        action={this.register.bind(this)}
                        iconName="user-plus"
                        iconColor="#fff"
                    />

                    <AppButton 
                        bgColor="#0298e182"
                        title="Facebook"
                        action={this.facebook.bind(this)}
                        iconName="facebook"
                        iconColor="#fff"
                    />
                </View>
            </BackgroundImage>
        );
    }
}