import { View, StyleSheet } from "react-native";
import ICCInput from "./ICCInput";
import NSNInput from "./NSNInput";

export default function PhoneInput({ icc, nsn, onICCChange, onNSNChange }) {
  return (
    <View style={styles.container}>
      <ICCInput value={icc} onChange={onICCChange} />
      <NSNInput value={nsn} onChange={onNSNChange} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    gap: 10,
  },
});