import React, { useState } from "react";
import { TouchableOpacity, View, Text } from "react-native";
import Icon from "react-native-vector-icons/MaterialIcons";

import TimerComponent from "../ui/TimerComponent";
import UserCard from "../ui/UserCard";
import { IconButton } from "react-native-paper";
import Accordion from "../ui/Accordion";

interface AccordionProps {
  headerText: string;
  content: React.ReactNode;
}

const Test = () => {
  return (
    <View>
      <Accordion
        headerText="About Session"
        content={
          <>
            <TimerComponent duration={10} />
            <View style={styles.hatColors}>
              <IconButton
                style={styles.hatStyle}
                icon="checkbox-blank-circle"
                iconColor="black"
                size={60}
              />
              <IconButton
                style={styles.hatStyle}
                icon="checkbox-blank-circle"
                iconColor="white"
                size={60}
              />
              <IconButton
                style={styles.hatStyle}
                icon="checkbox-blank-circle"
                iconColor="yellow"
                size={60}
              />
              <IconButton
                style={styles.hatStyle}
                icon="checkbox-blank-circle"
                iconColor="green"
                size={60}
              />
              <IconButton
                style={styles.hatStyle}
                icon="checkbox-blank-circle"
                iconColor="red"
                size={60}
              />
            </View>
          </>
        }
      />

      <Accordion
        headerText="Participants"
        content={
          <UserCard
            user={{
              name: "John Doe",
              role: "Developer",
              hatColor: "blue",
              userId: "123456",
            }}
            roomId="123456"
            adminCard={false}
          />
        }
      />
    </View>
  );
};

const styles = {
  hatColors: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    padding: 0,
    margin: 0,
    paddingHorizontal: 50,
  },
  hatStyle: {
    marginHorizontal: 0,
  },
};

export default Test;
