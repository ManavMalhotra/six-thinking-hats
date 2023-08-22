import React from 'react';
import { View, StyleSheet, TouchableOpacity, Image } from 'react-native';
import { useNavigation } from '@react-navigation/native';

const Navbar = () => {
  const navigation = useNavigation();

  const handleBackPress = () => {
    navigation.goBack();
  };

  return (
    <View style={styles.navbar}>
      <TouchableOpacity onPress={handleBackPress}>
        <Image
          style={styles.icon}
          source={require('../assets/menu.svg')}
          resizeMode="cover"
        />
      </TouchableOpacity>

      <Image
        style={styles.tinkLogo}
        source={require('../assets/tink-logo-1.png')}
        resizeMode="contain"
      />
      <Image
        style={styles.menuIconLayout}
        source={require('../assets/ellipse-15.svg')}
        resizeMode="cover"
      />
    </View>
  );
};

const styles = StyleSheet.create({
  navbar: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 10,
    paddingTop: 50,
    backgroundColor: 'white',
    borderBottomWidth: 1,
    borderBottomColor: 'lightgrey',
  },
  icon: {
    width: 50,
    height: 50,
  },
  tinkLogo: {
    width: 106,
    height: 32,
  },
  menuIconLayout: {
    height: 24,
    width: 24,
  },
});

export default Navbar;
