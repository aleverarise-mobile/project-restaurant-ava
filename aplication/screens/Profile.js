import React, { Component } from 'react';
import { AsyncStorage, Text, View } from 'react-native';
import BackgroundImage from '../components/BackgroundImage';
import {Card, Input} from 'react-native-elements';
import AppButton from '../components/AppButton'; 
import Toast from 'react-native-simple-toast'

export default class Profile extends Component {

    constructor() {
        super();
        
        this.state = {
            user: {
                name: '',
                age: ''
            }
        }
    }

    componentDidMount() {
        this.fetch().then( () => {
            Toast.showWithGravity('Usuario Obtenido', Toast.LONG, Toast.BOTTOM)
        }).catch( (error) => {
            Toast.showWithGravity(error.message, Toast.LONG, Toast.BOTTOM)
        })     
    }

    updateName (val){
        let state = this.state.user;
        this.setState({
            user: Object.assign({}, state, {
                name: val
            })
        })
    }

    updateAge (val){
        let state = this.state.user;
        this.setState({
            user: Object.assign({}, state, {
                age: val
            })
        })
    }

    async save(){
        try {
            const user = {
                name: this.state.user.name,
                age: this.state.user.age
            }
            await AsyncStorage.setItem('user', JSON.stringify(user));
            Toast.showWithGravity('Usuario guardado correctamente', Toast.LONG, Toast.BOTTOM)
        } catch (error) {
            Toast.showWithGravity('Error Guardando', Toast.LONG, Toast.BOTTOM)
        }
    }

    async fetch(){
        try {
            let user = await AsyncStorage.getItem('user');
            if(user){
                let parsed = JSON.parse(user);
                this.setState({user: parsed})
            }
        } catch (error) {
            Toast.showWithGravity('Error Obteniendo', Toast.LONG, Toast.BOTTOM)
        }
    }
    
    render() {
        const {user} = this.state;
        return (
            <BackgroundImage source={require('../../assets/images/fondo.jpg')}>
                <Card  title="Iniciar sesión" >
                    <Input 
                        placeholder="Nombre del usuario"
                        shake={true}
                        value={user.name}
                        onChangeText={(val) => this.updateName(val)}
                    />
                    <Input 
                        placeholder="Edad del usuario"
                        shake={true}
                        value={user.age}
                        onChangeText={(val) => this.updateAge(val)}
                    />

                    <View style={{marginTop: 15}}>
                        <AppButton 
                            bgColor="rgba(200, 38, 74, 1)"
                            title="Guardar en local"
                            action={this.save.bind(this)}
                            iconName="save"
                            iconColor="#fff"
                        />
                    </View>

                </Card>
            </BackgroundImage>
        );
    }
}