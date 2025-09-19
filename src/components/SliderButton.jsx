import React, { useRef } from 'react';
import { View, Text, StyleSheet, Animated, PanResponder, Dimensions, Platform } from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

const SLIDE_THRESHOLD = 150;

export default function SliderButton({ onSlideComplete }) {
  const pan = useRef(new Animated.Value(0)).current;

  const panResponder = useRef(
    PanResponder.create({
      onStartShouldSetPanResponder: () => true,
      onMoveShouldSetPanResponder: () => true,
      onPanResponderMove: (event, gestureState) => {
        const newDx = gestureState.dx;
        if (newDx >= 0 && newDx <= SLIDE_THRESHOLD) {
          pan.setValue(newDx);
        } else if (newDx < 0) {
          pan.setValue(0);
        } else if (newDx > SLIDE_THRESHOLD) {
          pan.setValue(SLIDE_THRESHOLD);
        }
      },
      onPanResponderRelease: (event, gestureState) => {
        if (gestureState.dx >= SLIDE_THRESHOLD) {
          onSlideComplete();
        }
        Animated.spring(pan, {
          toValue: 0,
          useNativeDriver: true,
          bounciness: 0,
        }).start();
      },
    })
  ).current;

  const animatedStyle = {
    transform: [{ translateX: pan }],
  };

  return (
    <View style={styles.outerContainer}>
     
      <View style={styles.fixedContentContainer}>
        
      </View>
     
     <Animated.View
    style={[styles.swipeableArea, animatedStyle]}
    {...panResponder.panHandlers}
>

    <View style={styles.contentWrapper}>
       <Text style={styles.swipeableText}>DESCUBRÍ MÁS</Text>
    //De acá a la pagina de registro
    <MaterialCommunityIcons name="chevron-double-right" size={20} color="#000" />
    </View>
   
   
</Animated.View>
    </View>
  );
}

const styles = StyleSheet.create({
  outerContainer: {
    backgroundColor: 'white',
    borderRadius: 30,
    height: 55,
    width: '85%',
    alignSelf: 'center',
    justifyContent: 'space-between', 
    overflow: 'hidden',
    
    ...Platform.select({
      ios: {
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.2,
        shadowRadius: 4,
      },
      android: {
        elevation: 5,
      },
    }),
  },
  fixedContentContainer: {
    flexDirection: 'row',
    alignItems: 'flexEnd',
    justifyContent: 'center',
  },
  fixedText: {
    color: '#000',
    fontWeight: 'bold',
    marginRight: 10,
  },
    embossedArrow: {
    color: '#888', 
    textShadowColor: '#fff', 
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 1,
    textShadowColor: 'rgba(255, 255, 255, 0.7)',
    textShadowOffset: { width: -0.5, height: -0.5 },
    textShadowRadius: 1,
  },
  swipeableArea: {
    backgroundColor: 'white',
    borderRadius: 30,
    height: '100%',
    width: 250, 
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute',
    left: 0,
   
    ...Platform.select({
      ios: {
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.2,
        shadowRadius: 4,
      },
      android: {
        elevation: 5,
      },
    }),
  },

  contentWrapper:{
    flexDirection:'row',
    alignItems: 'center',
    justifyContent: 'center',
    height: '100%',
  },
});