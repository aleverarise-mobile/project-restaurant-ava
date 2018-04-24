import React, { Component } from 'react';
import {Image} from 'react-native';
import AppButton from '../AppButton';
import { Card, Text, Avatar } from 'react-native-elements';
import {View} from 'react-native';
import RestaurantRating from './RestaurantRating';

export default  class Restaurant extends Component {
    render() {
        const {editRestaurant, goHome, restaurant} = this.props;
        return (
            <View>
                 <Card
                    title={restaurant.name}
                    
                >
                    <Image 
                        source={require('../../../assets/images/logo.png')}
                        style={{
                            width: 180, 
                            height: 180,
                            flex: 1,
                            marginLeft: '20%',
                            marginBottom: 30,
                            flexDirection: 'column',
                            justifyContent: 'center',
                            alignItems: 'center',
                            resizeMode: Image.resizeMode.contain
                        }}
                    />
                    
                    <RestaurantRating restaurantId={restaurant.id} /> 

                    <Text style={{marginBottom: 20, marginTop: 20}} >
                        {restaurant.description}
                    </Text>

                    <AppButton 
                        bgColor="rgba(255, 38, 74, 0.8)"
                        title="Update Restaurant"
                        action={editRestaurant}
                        iconName="pencil"
                        iconColor="#fff"
                    />

                    <AppButton 
                        bgColor="rgba(28, 25, 21, 0.8)"
                        title="Back"
                        action={goHome}
                        iconName="arrow-left"
                        iconColor="#fff"
                    />
                </Card>
            </View>
           
        );
    }
}
