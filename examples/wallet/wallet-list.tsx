import React from 'react';
import {Animated, FlatList} from 'react-native';

import {Cards} from './card';
import WalletCard from './wallet-card';
import {
  useAnimatedScrollHandler,
  useSharedValue,
} from 'react-native-reanimated';

const AnimatedFlatList = Animated.createAnimatedComponent(FlatList);

const cards = [
  {
    type: Cards.Card1,
  },
  {
    type: Cards.Card2,
  },
  {
    type: Cards.Card3,
  },
  {
    type: Cards.Card4,
  },
  {
    type: Cards.Card5,
  },
  {
    type: Cards.Card6,
  },
];

const Wallet = () => {
  const y = useSharedValue(0);
  // const onScroll = Animated.event([{nativeEvent: {contentOffset: {y}}}], {
  //   useNativeDriver: true,
  // });
  const scrollHandler = useAnimatedScrollHandler(event => {
    // console.log('==', event.contentOffset.y);
    y.value = event.contentOffset.y;
  });

  return (
    <AnimatedFlatList
      scrollEventThrottle={16}
      bounces={false}
      data={cards}
      onScroll={scrollHandler}
      renderItem={({index, item: {type}}) => (
        <WalletCard {...{index, y, type}} />
      )}
      keyExtractor={item => item.index}
      // {...{onScroll}}
    />
  );
};

export default Wallet;
