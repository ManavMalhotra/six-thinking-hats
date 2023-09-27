import React, { useState } from "react";
import { TouchableOpacity, View, Text, StyleSheet } from "react-native";
import Icon from "react-native-vector-icons/MaterialIcons";

interface AccordionProps {
  headerText: string;
  content: React.ReactNode;
}

const Accordion = ({ headerText, content }: AccordionProps) => {
  const [isExpanded, setIsExpanded] = useState(true);

  const toggleAccordion = () => {
    setIsExpanded(!isExpanded);
  };

  return (
    <View>
      <TouchableOpacity onPress={toggleAccordion}>
        <View style={styles.header}>
          <Text style={styles.headerText}>{headerText}</Text>
          <Icon
            name={isExpanded ? "expand-less" : "expand-more"}
            size={30}
            color="black"
          />
        </View>
      </TouchableOpacity>
      {isExpanded && <View style={styles.content}>{content}</View>}
    </View>
  );
};

const styles = StyleSheet.create({
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 10,
    backgroundColor: "transparent",
  },

  headerText: {
    fontSize: 16,
    fontWeight: "bold",
  },
  content: {
    padding: 10,
  },
});

export default Accordion;
