import React, {useEffect, useState} from 'react';
import {
  Pressable, StyleSheet, View, Text, ScrollView, TextInput
} from 'react-native';
import {heightPercentageToDP as hp, widthPercentageToDP as wp} from 'react-native-responsive-screen';
import Modal from 'react-native-modal';

import InputText from '../Input/InputText';

const Select2Modal = (props) => {
  const [dropDown, setDropDown] = useState(false);
  const [lines, setLines] = useState(1);
  const [selected, setSelected] = useState('');
  const [filteredList, setFilteredList] = useState(props.lists);

  useEffect(() => {
    setFilteredList(props.lists);
    if (props.value) {
      const list = props.lists.filter((item) => item.value == props.value);
      if (list[0]) {
        props.showValue ? setSelected(`${list[0].value} - ${list[0].label}`) : setSelected(list[0].label);
      }
    }
    let temp_list = [];
    props.lists.map((item, index) => {
      temp_list.push({
        value: item.value,
        label: item.label,
        selected: false,
      });
    });
    setFilteredList(temp_list);
  }, [props.lists]);

  useEffect(() => {
    if (props.value) {
      setLines(props.value.length ?? 1);
      let temp_text = '';
      props.value.map((value_item, index) => {
        const props_value = props.lists.filter((item) => item.value == value_item);
        if(props_value[0]){
          if(index == 0){
            temp_text = props_value[0].label;
          }else{
            temp_text = `${temp_text},\n${props_value[0].label}`;
          }
        }
      });

      setSelected(temp_text);

    }else{
      setSelected('');
    }
  }, [props.value]);

  const selecting = () => {
    // setActive(true);
    setDropDown(true);
  };

  const canceling = () => {

    let temp_list = filteredList.filter((item) => item.selected == true);
  
    let temp_selected = [];
    temp_list.map((item, index) => {
      temp_selected.push(item.value);
    });
    props.onSelect(temp_selected);
    setDropDown(false);
  };

  const optionClick = (index) => {

    let temp_list = filteredList;
    temp_list[index].selected = !temp_list[index].selected;
    setFilteredList(temp_list);

  }

  return (
    <>
      <Pressable style={[props.style, props.inModal ? {height: wp(11.5)} : null]} onPress={selecting}>
        <InputText
          label={props.label}
          value={selected}
          readonly={true}
          multiline={true}
          numberOfLines={lines}
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
        style={{marginHorizontal: 0, marginBottom: 0}}
        // style={props.searchable ? {marginHorizontal: 0, marginBottom: 0} : null}
        deviceWidth={wp(100)}
        deviceHeight={hp(100) + wp(10)}
      >
        <View style={[{
          backgroundColor: '#ffffff',
          // paddingHorizontal: wp(5),
          borderRadius: wp(3),
          marginTop: wp(3),
          flex: 1,
        },
        // props.searchable ? {flex: 1} : null
        ]}>
          <ScrollView
            showsVerticalScrollIndicator={false}
            // style={[props.searchable ? null : {paddingBottom: wp(1)}]}
          >
            {
              filteredList.map((item, index) => (
                <Pressable
                  onPress={() => {
                    // setDropDown(false);
                    // setSelectedLabel(item.label);
                    // setSelectedValue(item.value);
                    // props.onSelect(item.value);
                    // {props.extraValue ? props.extraValue(item.label) : null;}
                    optionClick(index);
                  }}
                  key={item.value}
                  style={[
                    styles.list,
                    index != 0 ? {borderTopWidth: 0.5} : null,
                    props.centeredLabel ? {alignItems: 'center'} : null,
                    item.selected ? {backgroundColor:'#b5b5b5'} : null,
                  ]}
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

export default Select2Modal;
