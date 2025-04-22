import React from 'react';
import {View, StyleSheet} from 'react-native';
import CardStack from 'react-native-card-stack-swiper';
import City from '../app/city';
import Filters from '../app/filters';
import Card from '../app/card';
import styles from '../public/styles';
import HappyHours from '../public/restaurants/HappyHours';

const HomeScreen = () => {
  return (
    <View style={styles.containerHome}>
        <View style={styles.top}>
          <City />
          <Filters />
        </View>

      <CardStack
      loop={true}
      verticalSwipe={false}
      renderNoMoreCards={() => null}
      ref={swiper => (this.swiper = swiper)}
      >
        {HappyHours.map((item, index) => (
          <Card key = {index}>
            <CardItem
            image={item.image}
            name={item.name}
            bio={item.bio}
            matches={item.match}
            actions
            onPressLeft={() => this.swiper.swipeLeft()}
            onPressRight={() => this.swiper.swipeRight()}
            />
            </Card>
        ))}
      </CardStack>
    </View>
  );
};
export default HomeScreen;
