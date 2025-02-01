import React, { useState } from "react";
import { SafeAreaView, ScrollView, View, Text, Alert, Image,Dimensions } from "react-native";
import { Link, router } from "expo-router";
import { editProfile, getCurrentUser, signOut } from "../../lib/appwrite";
import { CustomButton, FormField } from "../../components";
import { useGlobalContext } from "../../context/GlobalProvider";

const EditProfileTest = () => {
  const { setUser, setIsLogged } = useGlobalContext();
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [currentPassword, setCurrentPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handleEditProfile = async () => {
    if (!username && !email && !newPassword) {
      Alert.alert("Error", "Please fill in at least one field to update.");
      return;
    }

    if (!currentPassword) {
      Alert.alert("Error", "Current password is required to update your profile.");
      return;
    }

    setLoading(true);
    try {
      const updatedUser = await editProfile(username, email, newPassword, currentPassword);
      Alert.alert("Success", "Profile updated successfully!");
      console.log("Updated User:", updatedUser);

      router.replace("/home");
    } catch (error) {
      Alert.alert("Error", error.message || "Failed to update profile.");
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const handleSignOut = async () => {
    try {
      await signOut();
      setUser(null);
      setIsLogged(false);
      router.replace("/sign-in");
    } catch (error) {
      Alert.alert("Error", error.message || "Failed to sign out.");
    }
  };

  return (
    <SafeAreaView className="bg-primary h-full">
      <ScrollView>
        <View
          className="w-full flex justify-center h-full px-4 my-6"
          style={{
            minHeight: Dimensions.get("window").height - 100,
          }}
        >

          <Text className="text-2xl font-semibold text-white font-psemibold">
            Edit Profile
          </Text>

          <FormField
            title="New Username"
            value={username}
            handleChangeText={setUsername}
            otherStyles="mt-10"
          />

          <FormField
            title="New Email"
            value={email}
            handleChangeText={setEmail}
            otherStyles="mt-7"
            keyboardType="email-address"
          />

          <FormField
            title="New Password"
            value={newPassword}
            handleChangeText={setNewPassword}
            otherStyles="mt-7"
            secureTextEntry
          />

          <FormField
            title="Current Password"
            value={currentPassword}
            handleChangeText={setCurrentPassword}
            otherStyles="mt-7"
            secureTextEntry
          />

          <CustomButton
            title={loading ? "Updating..." : "Update Profile"}
            handlePress={handleEditProfile}
            containerStyles="mt-7"
            isLoading={loading}
          />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default EditProfileTest;