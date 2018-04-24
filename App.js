import React from 'react';
import { Text } from 'react-native';
import PreLoader from './aplication/components/PreLoader';
import firebaseConfig from './aplication/utils/firebase';
import * as firebase from 'firebase';
firebase.initializeApp(firebaseConfig);

import GuestNavigation from './aplication/navigations/guest';
import LoggedNavigation from './aplication/navigations/logged';

console.disableYellowBox = true;

export default class App extends React.Component {

	constructor() {
		super();
		
		this.state = {
			isLogged: false,
			loaded: false
		}
	}

	async componentDidMount(){
		/*firebase.auth().signOut();*/
		await firebase.auth().onAuthStateChanged( (user) => {
			if(user != null){
				this.setState({
					isLogged: true,
					loaded: true
				})
			}else{
				this.setState({
					isLogged: false,
					loaded: true
				})
			}
		})
	}
	
	render() {
		const { isLogged, loaded } = this.state;
		if(!loaded){
			return (
				<PreLoader />
			);
		}

		if(isLogged){
			return (
				<LoggedNavigation />
			)
		}else{
			return (
				<GuestNavigation />
			);
		}
	}
}