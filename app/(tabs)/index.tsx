import { Text } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function IndexPage() {
  return (
    <SafeAreaView className="bg-blue-900 min-h-screen">
      <Text className="text-3xl text-white">Hola</Text>
    </SafeAreaView>
  );
}
