import LottieView from "lottie-react-native";
import { Modal, Text, TouchableOpacity, View } from "react-native";
import List from "../../assets/animations/List.json";

const ListModal = ({
  visible,
  onDismiss,
}: {
  visible: boolean;
  onDismiss: () => void;
}) => (
  <Modal visible={visible} animationType="fade" transparent>
    <View className="absolute inset-0 bg-black/70 flex justify-center items-center">
      <View className="w-[80%] h-[60%] flex-col gap-[20px] bg-white rounded-[30px] py-4 px-6 items-center">
        <LottieView
          source={List}
          autoPlay
          loop
          style={{ width: 300, height: 200 }}
        />
        <View className="flex-col gap-[40px] items-center">
          <View className="flex-col gap-2">
            <Text className="text-[24px] font-fredokaMedium mb-2 text-center">
              Plan Your Week!
            </Text>
            <Text className="text-[16px] text-gray-600 font-fredokaRegular text-center mb-4">
              This is your 7-day shopping list to prepare all the ingredients
              you'll need for upcoming breakfasts.
            </Text>
          </View>
          <TouchableOpacity
            className="bg-[#41a4f0] px-8 py-3 rounded-[12px]"
            onPress={onDismiss}
          >
            <Text className="text-white font-fredokaMedium text-[18px]">
              Got it
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  </Modal>
);

export default ListModal;
