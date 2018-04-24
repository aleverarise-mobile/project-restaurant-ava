import React, { Component } from 'react';
import AppButton from '../AppButton';
import { Card, Text, Avatar } from 'react-native-elements';
import {View} from 'react-native';
import RestaurantRating from './RestaurantRating';
const imageUrl = require('../../../assets/images/logo.png');

export default  class Restaurant extends Component {
    render() {
        const {editRestaurant, goHome, restaurant} = this.props;
        return (
            <View>
                 <Card
                    title={restaurant.name}
                    
                >
                    <Avatar
                        xlarge
                        rounded
                        icon={{name: 'restaurant', type: 'material-icons', color: 'rgb(200, 38, 74)'}}
                        activeOpacity={0.7}
                        containerStyle={{
                            flexDirection: 'column', 
                            justifyContent: 'center',
                            alignItems: 'center',
                        }}
                    />
                    
                    <RestaurantRating restaurantId={restaurant.id} /> 

                    <Text style={{marginBottom: 20, marginTop: 20}} >
                        {restaurant.description}
                    </Text>

                    <AppButton 
                        bgColor="rgba(255, 38, 74, 0.8)"
                        title="Editar Restaurante"
                        action={editRestaurant}
                        iconName="pencil"
                        iconColor="#fff"
                    />

                    <AppButton 
                        bgColor="rgba(28, 25, 21, 0.8)"
                        title="Volver"
                        action={goHome}
                        iconName="arrow-left"
                        iconColor="#fff"
                    />
                </Card>
            </View>
           
        );
    }
}
