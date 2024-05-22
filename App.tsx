import { NavigationContainer } from '@react-navigation/native';
import { StatusBar } from 'expo-status-bar';
import { SafeAreaView, StyleSheet, Text } from 'react-native';
import { PaperProvider } from 'react-native-paper';

export default function App() {
  return (
    <NavigationContainer>
      <PaperProvider>
        <SafeAreaView style={styles.container}>
          <Text>Plotter Controller</Text>
          <StatusBar style="auto" />
        </SafeAreaView>
      </PaperProvider>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
