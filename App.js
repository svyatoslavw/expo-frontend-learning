import { StatusBar } from 'expo-status-bar';
import { Text, View } from 'react-native';

export default function App() {
  return (
    <View className="bg-red-400 flex-1 justify-center items-center">
      <Text className="text-white">
        Open up App.js sdasto start working on your app!
      </Text>
      <StatusBar style="auto" />
    </View>
  );
}
