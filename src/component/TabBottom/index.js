import React from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet } from 'react-native';

import {
  DefaultIconWhite,
  ProfileIconWhite,
  SettingIconWhite,
} from 'assets/icons/index';
import { colors, fonts, spaces } from 'constants/theme';
import { StackRoute } from 'constants/route';

const TabBottom = ({ state, descriptors, navigation }) => {
  const focusedOptions = descriptors[state.routes[state.index].key].options;

  if (focusedOptions.tabBarVisible === false) {
    return null;
  }

  const renderIcon = type => {
    switch (type) {
      case StackRoute.BottomTabs.Setting:
        return <Image source={SettingIconWhite} style={styles.iconTab} />;
      case StackRoute.BottomTabs.Default:
        return <Image source={DefaultIconWhite} style={styles.iconTab} />;
      case StackRoute.BottomTabs.Profile:
        return <Image source={ProfileIconWhite} style={styles.iconTab} />;
      default:
        return <Image source={DefaultIconWhite} style={styles.iconTab} />;
    }
  };

  return (
    <View style={styles.container}>
      {state.routes.map((route, index) => {
        const { options } = descriptors[route.key];
        const label =
          options.tabBarLabel !== undefined
            ? options.tabBarLabel
            : options.title !== undefined
            ? options.title
            : route.name;

        const isFocused = state.index === index;

        const onPress = () => {
          const event = navigation.emit({
            type: 'tabPress',
            target: route.key,
            canPreventDefault: true,
          });

          if (!isFocused && !event.defaultPrevented) {
            navigation.navigate(route.name);
          }
        };

        const onLongPress = () => {
          navigation.emit({
            type: 'tabLongPress',
            target: route.key,
          });
        };

        return (
          <TouchableOpacity
            key={`${label}`}
            accessibilityRole="button"
            accessibilityState={isFocused ? { selected: true } : {}}
            accessibilityLabel={options.tabBarAccessibilityLabel}
            testID={options.tabBarTestID}
            onPress={onPress}
            onLongPress={onLongPress}
            style={styles.tabItem}>
            <View style={styles.itemContainer}>
              {renderIcon(label)}
              <Text style={styles.label}>{label}</Text>
            </View>
          </TouchableOpacity>
        );
      })}
    </View>
  );
};

export default TabBottom;

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    backgroundColor: colors.bg_primary,
  },
  tabItem: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  itemContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: spaces.space1,
  },
  label: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: fonts.medium,
  },
  iconTab: {
    height: spaces.space7,
    width: spaces.space7,
  },
});
