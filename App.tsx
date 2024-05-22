import { NavigationContainer } from '@react-navigation/native';
import { SafeAreaView, StyleSheet } from 'react-native';
import { PaperProvider } from 'react-native-paper';

import { StatusBar } from '@/components';
import { useTheme } from '@/hooks';
import { Routes } from '@/routes';

export default function App() {
  const theme = useTheme();

  return (
    <NavigationContainer>
      <PaperProvider theme={theme}>
        <StatusBar />
        <SafeAreaView style={styles.container}>
          <Routes />
        </SafeAreaView>
      </PaperProvider>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    height: '100%',
  },
});
