import { router } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";
import { View,Text, Image, FlatList, TouchableOpacity,Linking } from "react-native";

import { icons } from "../../constants";
import { signOut } from "../../lib/appwrite";
import { useGlobalContext } from "../../context/GlobalProvider";
import { InfoBox,CustomButton} from "../../components";
import Footer from "../../components/Footer";

const Profile = () => {
  const { user, setUser, setIsLogged } = useGlobalContext();

  const logout = async () => {
    await signOut();
    setUser(null);
    setIsLogged(false);

    router.replace("/sign-in");
  };

  const openURL = () => {
    const url = 'https://www.ezyhelp.in/role/Role'; // Replace with your external URL
    Linking.openURL(url).catch((err) =>
      console.error("Failed to open URL:", err)
    );
  };

  return (
    <SafeAreaView className="bg-primary h-full">
      <FlatList
        keyExtractor={(item) => item.$id}
        // renderItem={({ item }) => (
        //   <VideoCard
        //     title={item.title}
        //     thumbnail={item.thumbnail}
        //     video={item.video}
        //     creator={item.creator.username}
        //     avatar={item.creator.avatar}
        //   />
        // )}
        ListHeaderComponent={() => (
          <View className="w-full flex justify-center items-center mt-6 mb-12 px-4">
            <TouchableOpacity
              onPress={logout}
              className="flex w-full items-end mb-10"
            >
              <Image
                source={icons.logout}
                resizeMode="contain"
                className="w-6 h-6"
              />
            </TouchableOpacity>

            <View className="w-16  h-16 border border-secondary rounded-lg flex justify-center items-center">
              <Image
                source={{ uri: user?.avatar }}
                className="w-[90%] h-[90%] rounded-lg"
                resizeMode="cover"
              />
            </View>

            <InfoBox
              title={user?.username}
              containerStyles="mt-5"
              titleStyles="text-3xl"
            />
            <View>
        <Text className = 'text-yellow-500 font-bold text-3xl '>Wanna Get Hired ?? </Text>

        <TouchableOpacity
      activeOpacity={0.7}
      className={`bg-secondary mt-5 mb-5 text-center rounded-xl min-h-[62px] flex flex-row justify-center items-center
      }`}
      onPress={openURL}

    >


<Text className={`text-primary font-psemibold text-lg`}>
        Get Hired
      </Text>
    </TouchableOpacity>
        <TouchableOpacity
      activeOpacity={0.7}
      className={`bg-secondary mb-5 text-center rounded-xl min-h-[62px] flex flex-row justify-center items-center
      }`}
      onPress={() => router.push("/edit/edit")}

    >


<Text className={`text-primary font-psemibold text-lg`}>
        Edit Profile
      </Text>
    </TouchableOpacity>
      </View>
      
          </View>
          
        )}
        
      />
      <Footer/>
    </SafeAreaView>
  );
};

export default Profile;
