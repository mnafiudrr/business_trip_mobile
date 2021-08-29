import React, { useState, useEffect } from 'react';
import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  View,
  Text,
  Image
} from 'react-native';
import {
  Placeholder,
  PlaceholderMedia,
  PlaceholderLine,
  Shine
} from "rn-placeholder";
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen'

const Loading = () => {
  return (
    <>
      <Placeholder
        Animation={Shine}
      >
        {/* Header */}
        <PlaceholderLine style={{width:wp(47), height:wp(7), alignSelf:'center', marginTop:wp(12)}}/>


        {/* TOP */}
        <View style={{flexDirection:'row', marginTop:wp(5)}}>
          <View>
            <PlaceholderLine style={{width:wp(47), height:wp(7)}}/>
            <PlaceholderLine style={{width:wp(40), height:wp(4)}} />
            <PlaceholderLine style={{width:wp(20), height:wp(5), marginTop:wp(2)}} />
            <PlaceholderLine style={{width:wp(40), height:wp(5)}} />
          </View>
          <PlaceholderMedia
          isRound={true}
          style={{ width:wp(30), height:wp(30), borderRadius:wp(35), marginRight:wp(8) }}
          />
        </View>
        <PlaceholderLine style={{width:wp(85), height:wp(4), marginTop:wp(5)}} />
        <PlaceholderLine style={{width:wp(45), height:wp(4)}} />

        {/* Delegations */}
        <Text style={{fontSize:wp(4.5), fontWeight:'bold'}}>Delegations</Text>
        <View style={{flexDirection:'row', marginTop:wp(2), alignContent:'center'}}>
          <PlaceholderMedia
            isRound={true}
            style={{ width:wp(15), height:wp(15), borderRadius:wp(35), marginHorizontal:wp(3) }}
            />
          <View style={{justifyContent:'center', height:wp(16)}}>
            <PlaceholderLine style={{width:wp(45), height:wp(4)}} />
            <PlaceholderLine style={{width:wp(45), height:wp(4)}} />
          </View>
        </View>
        <View style={{flexDirection:'row', marginTop:wp(2), alignItems:'center'}}>
          <PlaceholderMedia
            isRound={true}
            style={{ width:wp(15), height:wp(15), borderRadius:wp(35), marginHorizontal:wp(3) }}
            />
          <PlaceholderLine style={{width:wp(45), height:wp(4)}} />
        </View>
        <View style={{flexDirection:'row', marginTop:wp(2), alignItems:'center'}}>
          <PlaceholderMedia
            isRound={true}
            style={{ width:wp(15), height:wp(15), borderRadius:wp(35), marginHorizontal:wp(3) }}
            />
          <PlaceholderLine style={{width:wp(45), height:wp(4)}} />
        </View>

        {/* Spendings */}
        <Text style={{fontSize:wp(4.5), fontWeight:'bold'}}>Spendings</Text>

      </Placeholder>
    </>
  )
}

const styles = StyleSheet.create({

})

export default Loading;