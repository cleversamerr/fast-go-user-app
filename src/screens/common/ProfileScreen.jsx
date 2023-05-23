import { useEffect, useState } from "react";
import { SafeAreaView, ScrollView, StyleSheet, View } from "react-native";
import ProfileScreenTitle from "../../components/screenTitles/ProfileScreenTitle";
import { Ionicons, Feather } from "@expo/vector-icons";
import * as theme from "../../constants/theme";
import InputIcon from "../../components/inputs/InputIcon";
import PhoneInput from "../../components/inputs/PhoneInput";
import SelectInput from "../../components/inputs/SelectInput";
import CustomButton from "../../components/buttons/CustomButton";
import PopupConfirm from "../../components/popups/PopupConfirm";
import useLocale from "../../hooks/useLocale";
import NetworkStatusLine from "../../components/common/NetworkStatusLine";
import AvatarInput from "../../components/inputs/AvatarInput";
import useAuth from "../../auth/useAuth";
import data from "../../static/data.json";

export default function ProfileScreen({ navigation }) {
  const { user } = useAuth();
  const { i18n, lang } = useLocale();
  const [showPopup, setShowPopup] = useState(false);
  const [selectedGender, setSelectedGender] = useState(user.gender);
  const [context, setContext] = useState({
    firstName: user.firstName,
    lastName: user.lastName,
    email: user.email,
    phoneICC: user.phone.icc,
    phoneNSN: user.phone.nsn,
  });

  const handleKeyChange = (key) => (value) =>
    setContext({ ...context, [key]: value });

  const handleSelectGender = (gender) => {
    try {
      setSelectedGender(gender);
    } catch (err) {}
  };

  const handleGoBack = () => {
    try {
      navigation.goBack();
    } catch (err) {}
  };

  const handleRequestAccountDeletion = () => {
    try {
      setShowPopup(true);
    } catch (err) {}
  };

  const handleConfirmAccountDeletion = () => {
    try {
      alert("Confirmed");
    } catch (err) {}
  };

  const handleChangeAvatar = () => {};

  const handleClosePopup = () => {
    try {
      setShowPopup(false);
    } catch (err) {}
  };

  const getAvatarSource = () => {
    try {
      if (user.avatarURL) {
        return { uri: user.avatarURL };
      }

      return null;
    } catch (err) {
      return null;
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <NetworkStatusLine />

      <PopupConfirm
        title={i18n("popupDeleteAccountTitle")}
        subtitle={i18n("popupDeleteAccountSubtitle")}
        hint={i18n("popupDeleteAccountHint")}
        visible={showPopup}
        onClose={handleClosePopup}
        onConfirm={handleConfirmAccountDeletion}
      />

      <ScrollView
        showsHorizontalScrollIndicator={false}
        showsVerticalScrollIndicator={false}
      >
        <ProfileScreenTitle
          title={i18n("profile")}
          showMoreButton
          onPrev={handleGoBack}
          onRequestAccountDeletion={handleRequestAccountDeletion}
        />

        <AvatarInput onChange={handleChangeAvatar} value={getAvatarSource()} />

        <View style={styles.inputsContainer}>
          <InputIcon
            title={i18n("firstname")}
            placeholder={i18n("firstname")}
            value={context.firstName}
            onChange={handleKeyChange("firstName")}
            Icon={() => (
              <Ionicons
                name="person"
                style={lang === "ar" ? styles.arIcon : styles.enIcon}
              />
            )}
          />

          <InputIcon
            title={i18n("lastname")}
            placeholder={i18n("lastname")}
            value={context.lastName}
            onChange={handleKeyChange("lastName")}
            Icon={() => (
              <Ionicons
                name="person"
                style={lang === "ar" ? styles.arIcon : styles.enIcon}
              />
            )}
          />

          <InputIcon
            title={i18n("email")}
            placeholder={i18n("email")}
            keyboardType="email-address"
            value={context.email}
            onChange={handleKeyChange("email")}
            Icon={() => (
              <Feather
                name="mail"
                style={lang === "ar" ? styles.arIcon : styles.enIcon}
              />
            )}
          />

          <PhoneInput
            nsn={context.phoneNSN}
            onNSNChange={handleKeyChange("phoneNSN")}
          />

          <SelectInput
            value={selectedGender}
            options={data.genders}
            onChange={handleSelectGender}
            placeholder={i18n("selectGender")}
          />

          <CustomButton
            text={i18n("save")}
            containerStyle={styles.buttonContainer}
            textStyle={styles.buttonText}
          />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 15,
    paddingTop: 50,
  },
  arIcon: {
    marginRight: 10,
    fontSize: 24,
    color: theme.primaryColor,
  },
  enIcon: {
    marginLeft: 10,
    fontSize: 24,
    color: theme.primaryColor,
  },
  inputsContainer: {
    gap: 17,
  },
  buttonContainer: {
    paddingVertical: 10,
  },
  buttonText: {
    fontFamily: "cairo-800",
    fontSize: 18,
  },
});
