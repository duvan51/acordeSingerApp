import React, { useState } from 'react';
import { View, Button, Text, Platform } from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';

export default function DatePickerExpo({onChangeDate}) {
  const [date, setDate] = useState(new Date());
  const [showPicker, setShowPicker] = useState(false);

  const onChange = (event, selectedDate) => {
    if (Platform.OS === 'android') {
      setShowPicker(false); // Cierra el picker en Android
    }

    if (selectedDate) {
      setDate(selectedDate);
      onChangeDate(selectedDate);
    }
  };

  return (
    <View style={{ padding: 20 }}>
      <Button title="Seleccionar fecha" onPress={() => setShowPicker(true)} />

      {showPicker && (
        <DateTimePicker
          value={date}
          mode="date"
          display="default"
          onChange={onChange}
        />
      )}

      <Text style={{ marginTop: 20 }}>
        Fecha seleccionada: {date.toLocaleDateString()}
      </Text>
    </View>
  );
}
