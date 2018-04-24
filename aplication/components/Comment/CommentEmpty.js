import React, { Component } from 'react';
import {Text, View, StyleSheet} from 'react-native';

export default class CommentEmpty extends Component {
    render() {
        return (
            <View style={styles.commentEmptyView} >
                <Text style={styles.commentEmptyText} >
                    Be the first to share your opinion
                </Text>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    commentEmptyView: {
        justifyContent: 'center',
        flex: 1,
        marginTop: 10,
        marginBottom: 10
    },
    commentEmptyText: {
        backgroundColor: 'rgba(255, 38, 74, 0.9)',
        color: 'white',
        textAlign: 'center',
        padding: 20,
    }
})