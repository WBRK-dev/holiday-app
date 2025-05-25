import translateRegion from '@/lib/translateRegion';
import { Region } from '@/types/holiday';
import { useState } from 'react';
import { Text, View } from 'react-native';
import { Dialog, Portal, RadioButton } from 'react-native-paper';
import { useMemRegion } from './SessionContext';

export default function ({ 
  region 
}: {
  region: Region;
}) {
  const { setMemRegion } = useMemRegion();

  const [visible, setVisible] = useState(false);

  const showDialog = () => setVisible(true);
  const hideDialog = () => setVisible(false);

  return (
    <>
      <View style={{ display: "flex", flexDirection: "row", justifyContent: "center", marginTop: "auto" }}>
        <Text>Region: {translateRegion(region)} • </Text>
        <Text style={{ color: "#4D00FF", textDecorationLine: "underline" }} onPress={showDialog}>Change</Text>
      </View> 
      <Portal>
        <Dialog visible={visible} onDismiss={hideDialog}>
          <Dialog.Title>Select A Region</Dialog.Title>
          <Dialog.Content>
            <RadioButton.Group onValueChange={value => {setMemRegion(value); hideDialog();}} value={region}>
              <RadioButton.Item label="North" value="noord" />
              <RadioButton.Item label="Central" value="midden" />
              <RadioButton.Item label="South" value="zuid" />
            </RadioButton.Group>
          </Dialog.Content>
        </Dialog>
      </Portal>
    </>
  );
};