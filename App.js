/*
 *  File: App.js
 *  Author: Daniel Popa [dpopa200d@uregina.ca]
 *  Version: 1.0
 *  Last-Modified: April 11, 2022
 *  Purpose: Provides the main component of the application.
 */

import { StatusBar } from 'expo-status-bar';
import { StyleSheet, View } from 'react-native';
import CharacterPlanner from './components/CharacterPlanner'

export default function App() {
  return (
    <View style={styles.container}>
      <CharacterPlanner/>
      <StatusBar style="auto"/>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#212121',
  },
});
