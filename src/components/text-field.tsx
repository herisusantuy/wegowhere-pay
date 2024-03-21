import React, { useRef, useState } from "react";
import { Text, TextInput, StyleSheet, View } from "react-native";

type Props = React.ComponentProps<typeof TextInput> & {
  label: string;
  errorText?: string | null;
};

const TextField: React.FC<Props> = (props) => {
  const { label, errorText, value, style, onBlur, onFocus, ...restOfProps } =
    props;
  const [isFocused, setIsFocused] = useState(false);

  const inputRef = useRef<TextInput>(null);

  let color = isFocused ? "#4AD8DA" : "#B9C4CA";
  if (errorText) {
    color = "#B00020";
  }

  return (
    <View style={style}>
      <Text style={styles.label}>{label}</Text>
      <TextInput
        style={[
          styles.input,
          {
            borderColor: color,
          },
        ]}
        ref={inputRef}
        {...restOfProps}
        value={value}
        onBlur={(event) => {
          setIsFocused(false);
          onBlur?.(event);
        }}
        onFocus={(event) => {
          setIsFocused(true);
          onFocus?.(event);
        }}
      />
      {!!errorText && <Text style={styles.error}>{errorText}</Text>}
    </View>
  );
};

const styles = StyleSheet.create({
  input: {
    padding: 24,
    borderWidth: 1,
    borderRadius: 4,
    fontSize: 16,
  },
  labelContainer: {
    position: "absolute",
    paddingHorizontal: 8,
    backgroundColor: "white",
  },
  label: {
    fontSize: 18,
    color: "#000",
    fontWeight: "600",
    paddingBottom: 10,
  },
  error: {
    marginTop: 4,
    fontSize: 12,
    color: "#B00020",
  },
});

export default TextField;
