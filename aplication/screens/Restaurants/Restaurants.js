import React, { Component } from 'react';
import BackgroundImage from '../../components/BackgroundImage';
import PreLoader from '../../components/PreLoader';
import { StyleSheet, FlatList, View, ScrollView } from 'react-native';
import { ListItem, SearchBar } from 'react-native-elements';
import * as firebase from 'firebase';
import { NavigationActions }from 'react-navigation';
import RestaurantEmpty from '../../components/Restaurant/RestaurantEmpty';
import RestaurantAddButton from '../../components/Restaurant/RestaurantAddButton';

export default  class Restaurants extends Component {

    constructor() {
        super();
        
        this.state = {
            restaurants: [],
            loaded: false,
            search: '',
            restaurant_logo: require('../../../assets/images/logo.png')
        }

        
    }

    componentDidMount() {
        const {search} = this.state
        if (!search) {
            this.refRestaurants = firebase.database().ref().child('restaurants');
        }else{
            this._filterRestaurants(search)
        }
        this._loadFirebaseRestaurants()
    }

    _loadFirebaseRestaurants(){
        this.refRestaurants.on('value', snapshot => {
			let restaurants = [];
			snapshot.forEach(row => {
				restaurants.push({
					id: row.key,
					name: row.val().name,
					address: row.val().address,
					capacity: row.val().capacity,
					description: row.val().description
				})
            });
            this.setState({
                restaurants,
                loaded: true
            });
        })
    }

    addRestaurant(){
        const navigateAction = NavigationActions.navigate({
            routeName: 'AddRestaurant'
        });
        this.props.navigation.dispatch(navigateAction);
    }

    restaurantDetail(restaurant){
        const navigateAction = NavigationActions.navigate({
            routeName: 'DetailRestaurant',
            params: {restaurant}
        });
        this.props.navigation.dispatch(navigateAction);
    }

    searchRestaurants(search){
        this.setState({
            search: search.charAt(0).toUpperCase() + search.slice(1)
        })

        if (search.length >= 3) {
            this._filterRestaurants(search)
            setTimeout(() => {
                this._loadFirebaseRestaurants()
            }, 1000)
        }
    }

    resetSearch(){
        this.setState({
            search: ''
        })
        this.refRestaurants = firebase.database().ref().child('restaurants');
        setTimeout(() => {
            this._loadFirebaseRestaurants()
        }, 1000)
    }

    _filterRestaurants(search){
        this.refRestaurants = firebase.database().ref().child('restaurants')
                .orderByChild('name')
                .startAt(search)
                .endAt(`${search}\uf8ff`)
    }

    renderRestaurant(restaurant){
        return (
            <ListItem 
                containerStyle={styles.item}
                titleStyle={styles.title}
                title={`${restaurant.name} (Capacity: ${restaurant.capacity}) `}
                onPress={ () => this.restaurantDetail(restaurant) }
                rightIcon={{ name: 'arrow-right', type: 'font-awesome', style: styles.listIconStyle }}
                leftIcon={{ name: 'restaurant', type: 'material-icons', style: styles.listIconStyle }}
            />
        )
    }
    
    render() {
        const { loaded, restaurants} = this.state;

        if(!loaded){
            return <PreLoader/>
        }

        const searchBar = (
            <SearchBar 
                platform="android"
                showLoading
                cancelIcon={{type: 'font-awesome', name: 'chevron-left'}}
                placeholder='Search Restaurant'
                onChangeText={(text) => this.searchRestaurants(text)}
                onClear={this.resetSearch.bind(this)}
                value={this.state.search}
            />
        )

        if(!restaurants.length){
            return (
                <BackgroundImage source={require('../../../assets/images/fondo.png')}>
                    {searchBar}
                    <RestaurantEmpty text="There is no restaurants available" />
                    <RestaurantAddButton 
                        addRestaurant={this.addRestaurant.bind(this)} />
                </BackgroundImage>
            )
        }

        return (
            <BackgroundImage source={require('../../../assets/images/fondo.png')}>
                <ScrollView>
                    {searchBar}
                    <FlatList 
                        data={restaurants}
                        renderItem={ (data) => this.renderRestaurant(data.item) }
                        keyExtractor={ (data) => data.id }
                    />
                </ScrollView>
                <RestaurantAddButton 
                    addRestaurant={this.addRestaurant.bind(this)} />
            </BackgroundImage>
        );
    }
}

const styles = StyleSheet.create({
    title:{
        color: '#fff'
    },
    listIconStyle: {
        marginRight: 10,
        fontSize: 15,
        color: 'rgba(255, 255, 255, 0.6)'
    },
    item: {
        padding: 10,
        borderBottomWidth: 0.5,
        backgroundColor: 'rgba(206, 206, 206, 0.6)'
    }
});