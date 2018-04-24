import React, { Component } from 'react';
import BackgroundImage from '../../components/BackgroundImage';
import AppButtom from '../../components/AppButton';
import { View, StyleSheet } from 'react-native';
import * as firebase from 'firebase';
import { options, Restaurant } from '../../forms/restaurant';
import t from 'tcomb-form-native';
import { Card } from 'react-native-elements';
const Form = t.form.Form;
import Toast from 'react-native-simple-toast';

export default class AddRestaurant extends Component {

    constructor() {
        super();
        
        this.state = {
            restaurant: {
                name: '',
                address: '',
                capacity: 0,
                description: ''
            }
        };
    }

    save (){
        const validate = this.refs.form.getValue();
        if(validate){
            let data = {};
            const key = firebase.database().ref().child('restaurants').push().key;
            data[`restaurants/${key}`] = this.state.restaurant;
            firebase.database().ref().update(data)
                .then( () => {
                    Toast.showWithGravity('Restaurant Added', Toast.LONG, Toast.BOTTOM)
                    this.props.navigation.navigate('ListRestaurants')
                })
                .catch( error => {
                    console.log(error);
                })
        }
    }

    onChange (restaurant){
        this.setState({restaurant});
    }
    
    render() {
        const { restaurant } = this.state;
        return (
            <BackgroundImage source={require('../../../assets/images/fondo.png')}>
                <View style={styles.container} >
                    <Card title="Add Restaurant" >
                        <Form 
                            ref="form"
                            type={Restaurant}
                            options={options}
                            value={restaurant}
                            onChange={ (v) => this.onChange(v) }
                        />
                        <AppButtom 
                            bgColor="rgba(255, 38, 74, 0.9)"
                            title="Save Restaurant"
                            action={this.save.bind(this)}
                            iconName="plus"
                            iconColor="#fff"
                        />
                    </Card>
                </View>
            </BackgroundImage>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        padding: 10
    }
});