import React, {useEffect, useState} from 'react';
import {
  Pressable, StyleSheet, View, Text, ScrollView, TextInput
} from 'react-native';
import {heightPercentageToDP as hp, widthPercentageToDP as wp} from 'react-native-responsive-screen';
import Modal from 'react-native-modal';

import InputText from '../Input/InputText';

const SelectModal = (props) => {
  const [dropDown, setDropDown] = useState(false);

  const [selected, setSelected] = useState('');
  const [selectedLabel, setSelectedLabel] = useState('');
  const [selectedValue, setSelectedValue] = useState('');

  const [searched, setSearched] = useState('');
  const [filteredList, setFilteredList] = useState(props.lists);

  useEffect(() => {
    setFilteredList(props.lists);
    if (props.value) {
      const list = props.lists.filter((item) => item.value == props.value);
      if (list[0]) {
        setSelectedValue(list[0].value);
        setSelectedLabel(list[0].label);
        props.showValue ? setSelected(`${list[0].value} - ${list[0].label}`) : setSelected(list[0].label);
      }
    }
  }, [props.lists]);

  useEffect(() => {
    if (props.value) {
      const list = props.lists.filter((item) => item.value == props.value);
      if (list[0]) {
        setSelectedValue(list[0].value);
        setSelectedLabel(list[0].label);
        props.showValue ? setSelected(`${list[0].value} - ${list[0].label}`) : setSelected(list[0].label);
      }
    }
  }, [props.value]);

  useEffect(() => {
    if (selectedValue) {
      props.showValue ? setSelected(`${selectedValue} - ${selectedLabel}`) : setSelected(selectedLabel);
    } else {
      setSelected('');
    }
  }, [selectedValue]);

  const selecting = () => {
    // setActive(true);
    setDropDown(true);
  };

  const canceling = () => {
    setDropDown(false);
  };

  useEffect(() => {
    if (props.lists) {
      if (props.showValue) {
        const filter = props.lists.filter((item) => item.label.toUpperCase()
          .indexOf(searched.toUpperCase()) !== -1 || item.value.toUpperCase()
            .indexOf(searched.toUpperCase()) !== -1);
        setFilteredList(filter);
      } else {
        const filter = props.lists.filter((item) => item.label.toUpperCase()
          .indexOf(searched.toUpperCase()) !== -1);
        setFilteredList(filter);
      }
    }
  }, [searched]);

  return (
    <>
      <Pressable style={[props.style, props.inModal ? {height: wp(11.5)} : null]} onPress={selecting}>
        <InputText
          label={props.label}
          value={selected}
          readonly={true}
        />
      </Pressable>
      <Modal
        isVisible={dropDown}
        onBackButtonPress={canceling}
        onBackdropPress={canceling}
        onSwipeComplete={canceling}
        swipeDirection={['down', 'left', 'right']}
        swipeThreshold={150}
        useNativeDriverForBackdrop
        statusBarTranslucent
        style={props.searchable ? {marginHorizontal: 0, marginBottom: 0} : null}
        deviceWidth={wp(100)}
        deviceHeight={hp(100) + wp(10)}
      >
        <View style={[{
          backgroundColor: '#ffffff',
          paddingHorizontal: wp(5),
          borderRadius: wp(3),
          marginTop: wp(3)
        },
        props.searchable ? {flex: 1} : null
        ]}>
          { props.searchable ?
            (
              <InputText
                label={props.label}
                value={selected}
                onChangeText={setSearched}
                readonly
              />
            ) : null
          }
          <ScrollView
            showsVerticalScrollIndicator={false}
            style={[props.searchable ? null : {paddingBottom: wp(1)}]}
          >
            {
              filteredList.map((item, index) => (
                <Pressable
                  onPress={() => {
                    setDropDown(false);
                    setSelectedLabel(item.label);
                    setSelectedValue(item.value);
                    props.onSelect(item.value);
                    {props.extraValue ? props.extraValue(item.label) : null;}
                  }}
                  key={index}
                  style={[styles.list, index != 0 ? {borderTopWidth: 0.5} : null, props.centeredLabel ? {alignItems: 'center'} : null]}
                >
                  <Text style={{fontSize: wp(3.7), fontWeight:'bold'}}>
                    {item.label}
                  </Text>
                  {
                    props.showValue && !props.centeredLabel ? (
                      <Text style={{fontSize: wp(3.5), fontWeight:'500'}}>
                        {item.value}
                      </Text>
                    ) : null
                  }
                </Pressable>
              ))
            }
          </ScrollView>
        </View>
      </Modal>
    </>
  );
};

const styles = StyleSheet.create({
  placeholder: {
    color: '#000000',
  },
  list: {
    paddingVertical: wp(3),
    paddingHorizontal: wp(2),
  },
  label: {
    fontSize: wp(4),
  },
});

export default SelectModal;
