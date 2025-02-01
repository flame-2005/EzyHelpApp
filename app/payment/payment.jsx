import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, Modal, Alert } from 'react-native';
import axios from 'axios';
import { useNavigation } from '@react-navigation/native';
import RazorpayCheckout from 'react-native-razorpay';

const Slider = () => {
  const [amount] = useState(100); // Static amount for simplicity
  const [currency] = useState('INR');
  const [receipt] = useState('receipt#1');
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    pincode: '',
    address: '',
  });
  const [modalVisible, setModalVisible] = useState(false);
  const [modalMessage, setModalMessage] = useState('');
  const navigation = useNavigation();

  // Validation method
  const isFormValid = () => {
    const { name, phone, pincode, address } = formData;
    return name && phone && pincode && address; // Ensures all required fields are filled
  };

  const handleInputChange = (name, value) => {
    setFormData({ ...formData, [name]: value });
  };

  const handlePayment = async () => {
    const orderData = {
      amount, // Amount in smallest currency unit (e.g., 10000 for ₹100.00)
      currency, // Currency (e.g., "INR")
      receipt, // Optional: Unique receipt identifier
    };

    try {
      // Create an order on your backend
      const order = await axios.post(
        "https://e0c2-152-58-237-96.ngrok-free.app/api/razorpay", // Update with your backend URL
        orderData
      );

      if (!order?.data?.id) {
        throw new Error('Order creation failed. Please try again.');
      }

      // Razorpay options configuration
      const options = {
        key: "rzp_test_9zUz6QlYay4xWC", // Replace with your Razorpay key
        amount: order.data.amount, // Amount in smallest unit
        currency: order.data.currency, // INR or other currency
        name: "Eazy Help",
        description: "Transaction",
        order_id: order.data.id, // Razorpay order ID from backend
        handler: async (response) => {
          console.log("Payment successful:", response);
          await saveAddress(); // Save address only after successful payment
          setModalMessage(
            "Payment successful. RazorPay payment ID is " +
              response.razorpay_payment_id
          );
          setModalVisible(true);
        },
        prefill: {
          name: formData.name,
          email: formData.email || "johndoe@example.com", // Default email if not provided
          contact: formData.phone,
        },
        theme: {
          color: "#3399cc", // Custom branding color
        },
      };

      // Open Razorpay Checkout
      console.log(options)
      console.log(RazorpayCheckout.open(options))
      RazorpayCheckout.open(options).catch((error) => {
        console.error("Payment Failed:", error);
        setModalMessage(`Payment failed. Error: ${error.description || error.message}`);
        setModalVisible(true);
      });
    } catch (error) {
      console.error("Error creating order:", error.response?.data || error.message);
      setModalMessage("Payment initialization failed. Please try again.");
      setModalVisible(true);
    }
  };

  // Save address to backend
  const saveAddress = async () => {
    try {
      const response = await axios.post(
        'https://e0c2-152-58-237-96.ngrok-free.app/api/address', // Update with your backend URL
        formData
      );
      if (response.status === 201) {
        Alert.alert('Success', 'Address saved successfully!');
      }
    } catch (error) {
      console.error('Error saving address:', error);
    }
  };

  // Close modal and navigate to home screen
  const closeModal = () => {
    setModalVisible(false);
    navigation.navigate('home'); // Navigate to Home screen
  };

  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <View style={{ width: '80%' }}>
        <Text style={{ fontSize: 24, fontWeight: 'bold', textAlign: 'center', marginBottom: 20 }}>
          Your Address
        </Text>

        <TextInput
          placeholder="Full Name"
          value={formData.name}
          onChangeText={(text) => handleInputChange('name', text)}
          style={{ borderBottomWidth: 1, marginBottom: 10, padding: 8 }}
        />
        <TextInput
          placeholder="Email (Optional)"
          value={formData.email}
          onChangeText={(text) => handleInputChange('email', text)}
          style={{ borderBottomWidth: 1, marginBottom: 10, padding: 8 }}
        />
        <TextInput
          placeholder="Mobile No"
          value={formData.phone}
          onChangeText={(text) => handleInputChange('phone', text)}
          style={{ borderBottomWidth: 1, marginBottom: 10, padding: 8 }}
        />
        <TextInput
          placeholder="Pincode"
          value={formData.pincode}
          onChangeText={(text) => handleInputChange('pincode', text)}
          style={{ borderBottomWidth: 1, marginBottom: 10, padding: 8 }}
        />
        <TextInput
          placeholder="Address"
          value={formData.address}
          onChangeText={(text) => handleInputChange('address', text)}
          style={{ borderBottomWidth: 1, marginBottom: 20, padding: 8, height: 100 }}
        />

        <TouchableOpacity
          onPress={handlePayment}
          disabled={!isFormValid()}
          style={{
            backgroundColor: isFormValid() ? 'black' : 'gray',
            paddingVertical: 12,
            alignItems: 'center',
            borderRadius: 8,
          }}
        >
          <Text style={{ color: 'white', fontSize: 16 }}>Pay ₹{amount / 100}</Text>
        </TouchableOpacity>
      </View>

      <Modal
        visible={modalVisible}
        transparent={true}
        animationType="fade"
        onRequestClose={closeModal}
      >
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: 'rgba(0, 0, 0, 0.5)' }}>
          <View style={{ backgroundColor: 'white', padding: 20, borderRadius: 10 }}>
            <Text style={{ fontSize: 18, fontWeight: 'bold', marginBottom: 10 }}>Payment Status</Text>
            <Text>{modalMessage}</Text>
            <TouchableOpacity onPress={closeModal} style={{ marginTop: 20, backgroundColor: 'black', paddingVertical: 10, borderRadius: 8 }}>
              <Text style={{ color: 'white' }}>Close</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  );
};

export default Slider;
