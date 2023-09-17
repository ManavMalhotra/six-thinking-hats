import React, { useMemo } from "react";
import { StyleSheet, View, ImageSourcePropType } from "react-native";
import { Image } from "expo-image";
import { Color } from "../GlobalStyles";

const getStyleValue = (key, value) => {
  if (value === undefined) return;
  return { [key]: value === "unset" ? undefined : value };
};
const Property1Default = ({
  prop,
  property1DefaultPosition,
  property1DefaultMarginLeft,
  property1DefaultTop,
  property1DefaultLeft,
}) => {
  const property1DefaultStyle = useMemo(() => {
    return {
      ...getStyleValue("position", property1DefaultPosition),
      ...getStyleValue("marginLeft", property1DefaultMarginLeft),
      ...getStyleValue("top", property1DefaultTop),
      ...getStyleValue("left", property1DefaultLeft),
    };
  }, [
    property1DefaultPosition,
    property1DefaultMarginLeft,
    property1DefaultTop,
    property1DefaultLeft,
  ]);

  return (
    <View style={[styles.property1default, property1DefaultStyle]}>
      <View style={styles.property1defaultChild} />
      <Image style={styles.icon} contentFit="cover" source={prop} />
    </View>
  );
};

const styles = StyleSheet.create({
  property1defaultChild: {
    height: "100%",
    width: "100%",
    top: "0%",
    right: "0%",
    bottom: "0%",
    left: "0%",
    backgroundColor: Color.white,
    position: "absolute",
  },
  icon: {
    height: "32.2%",
    width: "33.39%",
    top: "18.52%",
    right: "31.32%",
    bottom: "49.28%",
    left: "35.29%",
    maxWidth: "100%",
    overflow: "hidden",
    maxHeight: "100%",
    position: "absolute",
  },
  property1default: {
    width: 17,
    height: 27,
  },
});

export default Property1Default;
