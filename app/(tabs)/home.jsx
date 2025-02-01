import { SafeAreaView } from "react-native-safe-area-context";
import { FlatList, Image, RefreshControl, Text, View, ScrollView } from "react-native";
import { useGlobalContext } from "../../context/GlobalProvider";
import React, { useState } from "react";
import { Redirect, router } from "expo-router";
import { TextInput, TouchableOpacity, Modal, Alert } from 'react-native';
import Footer from "../../components/Footer";
import CustomButton from "../../components/CustomButton";

import { images } from "../../constants";
import { EmptyState, InfoBox, VideoCard } from "../../components";

const Home = () => {
  const services = [
    {
      id: 1,
      name: "Electrician",
      description: "Our electrician will quickly fix all your electrical problems!",
      image: "https://res.cloudinary.com/dtyombve3/image/upload/v1717845211/sqklhiitjaxf60xif3db.png",
      banner: "https://res.cloudinary.com/dtyombve3/image/upload/v1717666876/u1r4gu12yheaz8um8ago.jpg",
      price: 99,
      reviews: 4,
      refundPolicy:
        "If you are unsatisfied with our services, refunds will be processed within 5-7 business days. To initiate a refund, please contact us directly at:",
      contact: "Phone: 96328 79746",
    },
    {
      id: 2,
      name: "Plumber",
      description: "Our plumber will solve all your plumbing issues efficiently!",
      image: "https://res.cloudinary.com/dtyombve3/image/upload/v1717845573/lsaf993kk9p9uhlmkues.png",
      banner: "https://res.cloudinary.com/dtyombve3/image/upload/v1717666875/lvwufioyt4ftlkpuje26.jpg",
      price: 149,
      reviews: 5,
      refundPolicy:
        "If you are unsatisfied with our services, refunds will be processed within 5-7 business days. To initiate a refund, please contact us directly at:",
      contact: "Phone: 98765 43210",
    },
    {
      id: 3,
      name: "Labour",
      description: "Our laborers will quickly fix all your labor needs!",
      image: "https://res.cloudinary.com/dtyombve3/image/upload/v1717845211/vwcydexjsdmwwchvxsmm.png",
      banner: "https://res.cloudinary.com/dtyombve3/image/upload/v1717666908/wis6jdjuvhb5ahoon1vs.jpg",
      price: 149,
      reviews: 5,
      refundPolicy:
        "If you are unsatisfied with our services, refunds will be processed within 5-7 business days. To initiate a refund, please contact us directly at:",
      contact: "Phone: 98765 43210",
    },
    {
      id: 4,
      name: "Mechanic",
      description: "Our expert mechanic will swiftly solve all your vehicle issues!",
      image: "https://res.cloudinary.com/dtyombve3/image/upload/v1718173767/osnxdnxzqdqqilg6jebn.png",
      banner: "https://res.cloudinary.com/dtyombve3/image/upload/v1718173778/aomhs5pyhdeg13io0hn9.jpg",
      price: 149,
      reviews: 5,
      refundPolicy:
        "If you are unsatisfied with our services, refunds will be processed within 5-7 business days. To initiate a refund, please contact us directly at:",
      contact: "Phone: 98765 43210",
    },
  ]

  const [selectedService, setSelectedService] = useState(null);
  
    const openPopup = (service) => setSelectedService(service);
    const closePopup = () => setSelectedService(null);
    const hire = () => {
      closePopup();
      router.push("/payment/payment");
  };
  
  const { user, setUser, setIsLogged } = useGlobalContext();
  return (
    <SafeAreaView className="bg-primary">
      <ScrollView
        contentContainerStyle={{ flexGrow: 1 }}
        refreshControl={<RefreshControl refreshing={false} onRefresh={() => {}} />}
      >
        <View className="flex my-6 px-4 space-y-6">
          <View className="flex justify-between items-start flex-row mb-6">
            <View>
              <Text className="font-pmedium text-sm text-gray-100">
                Welcome Back
              </Text>
              <Text className="text-2xl font-psemibold text-white">
                EzyHelp
              </Text>
     
            </View>

            <View className="mt-1.5">
            <Image
  source={{ uri: 'https://res.cloudinary.com/dtyombve3/image/upload/v1737798927/bghejb2qjdoo7zievrql-removebg-preview_irtayq.png' }}
  className="w-14 h-14"
  resizeMode="contain"
/>
            </View>
          </View>

          <View className="flex items-center font-poppins mt-10">
            <View className="justify-center flex-1 mx-auto max-w-8xl overflow-hidden py-4">
              <View className="text-center mb-5">
                <Text className="text-4xl font-bold text-white text-center">How does it </Text>
                <Text className="text-4xl font-bold text-white text-center">WORKS?</Text>
              </View>

              <FlatList
                data={[
                  {
                    id: "1",
                    title: "Book order",
                    image:
                      "https://res.cloudinary.com/dtyombve3/image/upload/v1717845211/fio5joa2xy0np02np7ml.png",
                  },
                  {
                    id: "2",
                    title: "Get best Expert",
                    image:
                      "https://res.cloudinary.com/dtyombve3/image/upload/v1717845211/nehjwek8orgrqdtmn0rn.png",
                  },
                  {
                    id: "3",
                    title: "Expert solution",
                    image:
                      "https://res.cloudinary.com/dtyombve3/image/upload/v1717845211/adh0r84rnp5dvzhyhbf2.png",
                  },
                  {
                    id: "4",
                    title: "Expert analysis",
                    image:
                      "https://res.cloudinary.com/dtyombve3/image/upload/v1717845212/as7tergislebj14fdp6w.png",
                  },
                ]}
                numColumns={2}
                keyExtractor={(item) => item.id}
                renderItem={({ item }) => (
                  <View className="w-1/2 p-2 rounded-xl px-4 mb-6 bg-opacity-50 backdrop-blur-3xl">
                    <View className="mx-auto text-center ">
                      <Image
                        source={{ uri: item.image }}
                        className="mx-auto invert brightness-0 bg-white p-2 rounded-full object-cover w-24 h-24 mb-3"
                        resizeMode="contain"
                      />
                      <Text className="text-xl font-semibold text-white">
                        {item.title}
                      </Text>
                    </View>
                  </View>
                )}
              />
            </View>
          </View>
        </View>
        <View className="w-full p-4 items-center bg-primary mt-5">
        <View className="text-center mb-5">
                <Text className="text-4xl font-bold text-white text-center">Our Top </Text>
                <Text className="text-4xl font-bold text-white text-center">SERVICES</Text>
              </View>
      {/* Service Cards */}
      {services.map((service) => (
        <View key={service.id} className="w-full items-center mb-6">
          <View className="bg-white p-5 rounded-lg items-center shadow-md mb-4">
            <View className="w-20 h-20 rounded-full bg-secondary-200 justify-center items-center mb-4">
              <Image source={{ uri: service.image }} className="w-full h-16" />
            </View>
            <Text className="text-xl font-psemibold text-center mb-2">{service.name}</Text>
            <Text className="text-center text-gray-100">{service.description}</Text>
          </View>
          <TouchableOpacity
            onPress={() => openPopup(service)}
            className="bg-secondary-200 py-3 px-6 rounded-full"
          >
            <Text className="text-white text-lg font-pmedium ">Book Now</Text>
          </TouchableOpacity>
        </View>
      ))}

      {/* Popup Modal */}
      {selectedService && (
        <Modal visible transparent animationType="slide">
          <View className="flex-1 bg-black-200/50 justify-center items-center">
            <View className="w-11/12 bg-white rounded-lg p-6 relative">
                <Image source={{ uri: selectedService.banner }} className="w-full h-52 rounded-lg mb-4" />
                <View className="items-center">
                  <Text className="text-sm font-pextralight text-gray-100">EzyHelp</Text>
                  <Text className="text-2xl font-psemibold my-1">{selectedService.name}</Text>
                  <View className="flex-row items-center space-x-1 mb-2">
                    {[...Array(selectedService.reviews)].map((_, index) => (
                      <Text key={index} className="text-secondary text-lg">
                        ★
                      </Text>
                    ))}
                    <Text className="text-gray-100 text-lg">
                      {Array(5 - selectedService.reviews).fill("☆").join("")}
                    </Text>
                    <Text className="text-gray-100 ml-2">{selectedService.reviews} Reviews</Text>
                  </View>
                  <Text className="text-center text-gray-100">{selectedService.description}</Text>
                  <Text className="text-xl font-psemibold text-primary mt-4">₹ {selectedService.price}</Text>
                  <CustomButton
            title="Hire"
            handlePress={hire}
            containerStyles=" w-20 mt-7 text-center"
            
          />
                  <View className="bg-gray-100 p-4 rounded-lg mt-4 w-full">
                    <Text className="font-psemibold text-lg mb-2">Refund Policy</Text>
                    <Text className="text-gray-100 text-center mb-2">{selectedService.refundPolicy}</Text>
                    <Text className="font-psemibold text-black">{selectedService.contact}</Text>
                  </View>
                </View>
              <TouchableOpacity
                onPress={closePopup}
                className="absolute top-4 right-4 bg-red-500 w-8 h-8 rounded-full justify-center items-center"
              >
                <Text className="text-white text-xl">×</Text>
              </TouchableOpacity>
            </View>
          </View>
        </Modal>
      )}
    </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default Home;