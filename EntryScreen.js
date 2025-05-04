import React, { useState } from 'react';
import {
  ScrollView,
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Button,
} from 'react-native';
import { useRouter } from 'expo-router';

export default function EntryScreen() {
  const router = useRouter();
  const [name, setName] = useState('');
  const [address, setAddress] = useState('');
  const [hours, setHours] = useState('');

  const [foodOptions, setFoodOptions] = useState({
    Pizza: false,
    Wings: false,
    Tacos: false,
    Burgers: false,
  });
  const [drinkOptions, setDrinkOptions] = useState({
    Wine: false,
    Beer: false,
    Margarita: false,
    Mimosa: false,
  });
  const [parkingOptions, setParkingOptions] = useState({
    Free: false,
    Paid: false,
    'N/A': false,
  });

  const toggleOption = (category, key) => {
    if (category === 'food') {
      setFoodOptions(prev => ({ ...prev, [key]: !prev[key] }));
    } else if (category === 'drink') {
      setDrinkOptions(prev => ({ ...prev, [key]: !prev[key] }));
    } else if (category === 'parking') {
      setParkingOptions({ Free: false, Paid: false, 'N/A': false, [key]: true });
    }
  };

  const handleSave = () => {
    // For demo purposes: log all values
    console.log({
      name,
      address,
      hours,
      foodOptions,
      drinkOptions,
      parkingOptions
    });
    router.back();
  };

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.contentContainer}>
      <TouchableOpacity onPress={() => router.back()}>
        <Text style={styles.back}>&lt; Back</Text>
      </TouchableOpacity>

      <Text style={styles.header}>Restaurant Entry</Text>

      <View style={styles.field}>
        <Text style={styles.label}>Name:</Text>
        <TextInput
          style={styles.input}
          value={name}
          onChangeText={setName}
          placeholder="Enter restaurant name"
        />
      </View>

      <View style={styles.field}>
        <Text style={styles.label}>Address:</Text>
        <TextInput
          style={styles.input}
          value={address}
          onChangeText={setAddress}
          placeholder="Enter address"
        />
      </View>

      <View style={styles.field}>
        <Text style={styles.label}>Hours:</Text>
        <TextInput
          style={styles.input}
          value={hours}
          onChangeText={setHours}
          placeholder="e.g. 3:00-6:00"
        />
      </View>

      <Text style={styles.section}>Food Options:</Text>
      {Object.keys(foodOptions).map(item => (
        <TouchableOpacity
          key={item}
          style={styles.optionRow}
          onPress={() => toggleOption('food', item)}
        >
          <View style={[styles.checkbox, foodOptions[item] && styles.checked]}>
            {foodOptions[item] && <Text style={styles.checkmark}>✓</Text>}
          </View>
          <Text style={styles.optionLabel}>{item}</Text>
        </TouchableOpacity>
      ))}

      <Text style={styles.section}>Drink Options:</Text>
      {Object.keys(drinkOptions).map(item => (
        <TouchableOpacity
          key={item}
          style={styles.optionRow}
          onPress={() => toggleOption('drink', item)}
        >
          <View style={[styles.checkbox, drinkOptions[item] && styles.checked]}>
            {drinkOptions[item] && <Text style={styles.checkmark}>✓</Text>}
          </View>
          <Text style={styles.optionLabel}>{item}</Text>
        </TouchableOpacity>
      ))}

      <Text style={styles.section}>Parking Options:</Text>
      {Object.keys(parkingOptions).map(item => (
        <TouchableOpacity
          key={item}
          style={styles.optionRow}
          onPress={() => toggleOption('parking', item)}
        >
          <View style={[styles.checkbox, parkingOptions[item] && styles.checked]}>
            {parkingOptions[item] && <Text style={styles.checkmark}>✓</Text>}
          </View>
          <Text style={styles.optionLabel}>{item}</Text>
        </TouchableOpacity>
      ))}

      <View style={styles.saveBtn}>
        <Button title="Save" onPress={handleSave} />
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fff', padding: 20 },
  contentContainer: { paddingBottom: 40 },
  back: { color: '#007AFF', marginBottom: 10 },
  header: { fontSize: 24, fontWeight: 'bold', marginBottom: 20 },
  field: { marginBottom: 15 },
  label: { fontSize: 16, marginBottom: 5 },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 4,
    padding: 10,
    fontSize: 16,
  },
  section: { fontSize: 18, fontWeight: '600', marginTop: 20, marginBottom: 10 },
  optionRow: { flexDirection: 'row', alignItems: 'center', marginBottom: 10 },
  checkbox: {
    width: 20,
    height: 20,
    borderWidth: 1,
    borderColor: '#ccc',
    marginRight: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  checked: { backgroundColor: '#007AFF', borderColor: '#007AFF' },
  checkmark: { color: '#fff', fontSize: 16, lineHeight: 18 },
  optionLabel: { fontSize: 16 },
  saveBtn: { marginTop: 30 },
});
