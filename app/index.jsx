import { StatusBar } from "expo-status-bar";
import { Redirect, router } from "expo-router";
import { View, Text, Image, ScrollView,TouchableOpacity } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import { images } from "../constants";
import { CustomButton, Loader } from "../components";
import { useGlobalContext } from "../context/GlobalProvider";

const Welcome = () => {
  const { loading, isLogged } = useGlobalContext();

  if (!loading && isLogged) return <Redirect href="/home" />;

    const openURL = () => {
      const url = 'https://www.ezyhelp.in/role/Role'; // Replace with your external URL
      Linking.openURL(url).catch((err) =>
        console.error("Failed to open URL:", err)
      );
    };

  return (
    <SafeAreaView className="bg-primary h-full">
      <Loader isLoading={loading} />

      <ScrollView
        contentContainerStyle={{
          height: "100%",
        }}
      >
        <View className="w-full flex justify-center items-center h-full px-4">
          <Image
            source= {{ uri: 'https://res.cloudinary.com/dtyombve3/image/upload/v1737798927/bghejb2qjdoo7zievrql-removebg-preview_irtayq.png' }}
            className="w-[220px] h-[150px]"
            resizeMode="contain"
          />

          <Image
            source={{uri:'https://res.cloudinary.com/dtyombve3/image/upload/v1718883537/jykgqmd5eotkbfhhnk3d.png'}}
            className="max-w-[380px] w-full h-[298px]"
            resizeMode="contain"
          />

          <View className="relative mt-5">
            <Text className="text-3xl text-white font-bold text-center">
              Get Endless{"\n"}
              Services with{" "}
              <Text className="text-secondary-200">EzyHelp</Text>
            </Text>

            <Image
              source={images.path}
              className="w-[136px] h-[15px] absolute -bottom-2 -right-8"
              resizeMode="contain"
            />
          </View>

          <Text className="text-sm font-pregular text-gray-100 mt-7 text-center">
           Your One and only app for all your blue coller works
          </Text>
              {/* <TouchableOpacity
                activeOpacity={0.7}
                className={`bg-secondary text-center rounded-xl min-h-[62px] flex flex-row justify-center items-center
                }`}
                onPress={openURL}
          
              >
          
          
          <Text className={`text-primary font-psemibold text-lg`}>
                  Get Hired
                </Text>
              </TouchableOpacity> */}

          <CustomButton
            title="Continue with Email"
            handlePress={() => router.push("/sign-in")}
            containerStyles="w-full mt-7"
          />
        </View>
      </ScrollView>

      <StatusBar backgroundColor="#161622" style="light" />
    </SafeAreaView>
  );
};

export default Welcome;
