import React, { useState } from "react";
import { View, Text, Image, TouchableOpacity, Modal, ScrollView,FlatList } from "react-native";
import { Redirect, router } from "expo-router";
import { CustomButton, Loader } from "../../components";


// Service Data
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
  {
    id: 5,
    name: "Beautician",
    description: "Our talented beautician will enhance your beauty in no time!",
    image: "https://res.cloudinary.com/dtyombve3/image/upload/v1718173767/wxvf05p5ppmbm18uuugj.png",
    banner: "https://res.cloudinary.com/dtyombve3/image/upload/v1718173774/xwy3cqrcgc6hn2x5btby.jpg",
    price: 149,
    reviews: 5,
    refundPolicy:
      "If you are unsatisfied with our services, refunds will be processed within 5-7 business days. To initiate a refund, please contact us directly at:",
    contact: "Phone: 98765 43210",
  },
  {
    id: 6,
    name: "Cable TV Operator",
    description: "Our skilled technicians will quickly resolve all your cable TV issues!",
    image: "https://res.cloudinary.com/dtyombve3/image/upload/v1718173765/wj0gk8euf70msyfiukk0.png",
    banner: "https://res.cloudinary.com/dtyombve3/image/upload/v1718173769/bwjm7rozlnynhbb2ee04.jpg",
    price: 149,
    reviews: 5,
    refundPolicy:
      "If you are unsatisfied with our services, refunds will be processed within 5-7 business days. To initiate a refund, please contact us directly at:",
    contact: "Phone: 98765 43210",
  },
  {
    id: 7,
    name: "Laundry work",
    description: "Our laundry service will swiftly handle all your laundry needs with care and precision!",
    image: "https://res.cloudinary.com/dtyombve3/image/upload/v1718173768/slr8gj6itnxycyzrxwhl.png",
    banner: "https://res.cloudinary.com/dtyombve3/image/upload/v1718173766/p8ide7wbglrmpk7twkap.jpg",
    price: 149,
    reviews: 5,
    refundPolicy:
      "If you are unsatisfied with our services, refunds will be processed within 5-7 business days. To initiate a refund, please contact us directly at:",
    contact: "Phone: 98765 43210",
  },
  {
    id: 8,
    name: "House maid",
    description: " Our housemaid service will efficiently manage your household needs with care and expertise!",
    image: "https://res.cloudinary.com/dtyombve3/image/upload/v1718182225/snmrcqhdtwdotaxeflqg.png",
    banner: "https://res.cloudinary.com/dtyombve3/image/upload/v1718173765/aoeyjrvknfoc9lo8wewu.jpg",
    price: 149,
    reviews: 5,
    refundPolicy:
      "If you are unsatisfied with our services, refunds will be processed within 5-7 business days. To initiate a refund, please contact us directly at:",
    contact: "Phone: 98765 43210",
  },
  {
    id: 9,
    name: "Auto service's",
    description: "Our auto taxi service will get you to your destination safely and promptly!",
    image: "https://res.cloudinary.com/dtyombve3/image/upload/v1718173769/dugpiogw1vduacabhyti.png",
    banner: "https://res.cloudinary.com/dtyombve3/image/upload/v1718173768/adnm9r0knsvdaicy9cu0.jpg",
    price: 149,
    reviews: 5,
    refundPolicy:
      "If you are unsatisfied with our services, refunds will be processed within 5-7 business days. To initiate a refund, please contact us directly at:",
    contact: "Phone: 98765 43210",
  },
  {
    id: 11,
    name: "Glass ware manufacturing",
    description: "Our craftsmen will meticulously create your glassware with precision and care!",
    image: "https://res.cloudinary.com/dtyombve3/image/upload/v1718173767/jsrvabjdwvacowhev5jj.png",
    banner: "https://res.cloudinary.com/dtyombve3/image/upload/v1718173766/exjwytmdcpwrybouawve.jpg",
    price: 149,
    reviews: 5,
    refundPolicy:
      "If you are unsatisfied with our services, refunds will be processed within 5-7 business days. To initiate a refund, please contact us directly at:",
    contact: "Phone: 98765 43210",
  },
  
  // Add more services here...
];

const ElectricianCard = () => {
  const [selectedService, setSelectedService] = useState(null);

  const openPopup = (service) => setSelectedService(service);
  const closePopup = () => setSelectedService(null);
  const hire = () => {
    closePopup();
    router.push("/payment/payment");
};

  // Render each service card
  const renderServiceCard = ({ item }) => (
    <View className="w-full items-center mb-6">
      <View className="bg-white p-5 rounded-lg items-center shadow-md mb-4">
        <View className="w-20 h-20 rounded-full bg-secondary-200 justify-center items-center mb-4">
          <Image source={{ uri: item.image }} className="w-full h-16" />
        </View>
        <Text className="text-xl font-psemibold text-center mb-2">{item.name}</Text>
        <Text className="text-center text-gray-100">{item.description}</Text>
      </View>
      <TouchableOpacity
        onPress={() => openPopup(item)}
        className="bg-secondary-200 py-3 px-6 rounded-full"
      >
        <Text className="text-white text-lg font-pmedium">Book Now</Text>
      </TouchableOpacity>
    </View>
  );

  return (
    <View className="w-full p-4 items-center bg-primary mt-5">
      {/* Use FlatList instead of ScrollView */}
      <FlatList
        data={services}
        keyExtractor={(item) => item.id.toString()}
        renderItem={renderServiceCard}
        contentContainerStyle={{ paddingBottom: 20 }} // Add padding at the bottom
        showsVerticalScrollIndicator={false} // Hide scroll indicator
      />

      {/* Popup Modal (same as before) */}
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
                  containerStyles="w-20 mt-7 text-center"
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
  );

};

export default ElectricianCard;
