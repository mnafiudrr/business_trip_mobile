
import React, { useState, useEffect } from 'react';
import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  View,
  Text,
  StatusBar,
  Image
} from 'react-native';
import { COLOR_WHITE, color_background_putih, color_text_secondary_title } from '../../utils/colors'
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen'
import { AnimatedCircularProgress } from 'react-native-circular-progress';
import Moment from 'react-moment';
import NumberFormat from 'react-number-format';

const DetailInfo = (props) => {
    const [fill, setFill] = useState(0);
    
    useEffect(() => {
        calculate()
    },[]);

    const calculate = () => {
        setFill(parseInt((props.currency/props.total)*100));
        // setFill(50);
    }



  return (
      <View style={styles.container}>

        <View style={{width:wp(85)}}>
            <Text style={styles.title}>{props.title}</Text>
        </View>
          <View style={styles.top}>
              <View style={styles.left}>
                    {/* <Text style={styles.date}>{props.date}</Text> */}
                    <Text style={styles.date}>
                        <Moment format="DD MMM YYYY" element={Text}>
                            {props.arr}
                        </Moment> - <Moment format="DD MMM YYYY" element={Text}>
                            {props.arr}
                        </Moment>  
                    </Text>
                    <View style={{flexDirection:'row'}}>
                    <View style={[styles.statusInfo,{backgroundColor:props.status=='Aktif'?'green':'red'}]}>
                        <Text style={styles.status}>{props.status}</Text>
                    </View>
                    <View style={[styles.statusInfo,{backgroundColor:props.status=='Aktif'?'#25aef0':'red'}]}>
                        <Text style={styles.status}>Dana Ditolak</Text>
                    </View>
                    </View>
                    <Text style={styles.currency}>
                        <NumberFormat 
                            value={props.currency} 
                            displayType={'text'} 
                            thousandSeparator={true} 
                            prefix={'Rp '} 
                            renderText={formattedValue => <Text>{formattedValue}</Text>}
                        />
                    </Text>
                    <Text>
                        Disini Deskripsi Kerjaannya ngapain aja sebenarnya, misal ya ini itu gitu la pokonya
                    </Text>
              </View>
              <View style={styles.right}>
                  <AnimatedCircularProgress
                      size={wp(28)}
                      width={wp(4.5)}
                      fill={fill}
                      prefill={0}
                      duration={1000}
                      lineCap='butt'
                      tintColor="#25aef0"
                      backgroundColor="#ffffff"
                      >
                      {
                          (fill) => (
                          <Text style={styles.title}>
                              { fill }%
                          </Text>
                          )
                      }
                  </AnimatedCircularProgress>
              </View>
          </View>
        {/* <Text style={styles.description}>Disini Deskripsi apapun bisa ditulis disini coba aja mau tulis apa</Text> */}
        
      </View>
  );
};

const styles = StyleSheet.create({
    container: {
        width:wp(90),
        // marginHorizontal:wp(5),
    },
    top: {
        flexDirection:'row',
        justifyContent:'space-between',
    },
    left: {
        width:wp(57),
        paddingRight:wp(2),
    },
    right: {
        width:wp(33),
        justifyContent:'center',
    },
    title: {
        fontSize:wp(5),
        fontWeight:'bold'
    },
    date: {
        fontSize:wp(3.5),
        marginTop:wp(0.5),
        color:color_text_secondary_title
    },
    statusInfo: {
        backgroundColor:'green',
        marginTop:wp(2),
        // width:wp(15),
        height:wp(7),
        justifyContent:'center',
        alignItems:'center',
        borderRadius:wp(2),
        marginRight:wp(2),
        paddingHorizontal:wp(2)
    },
    status: {
        fontSize:wp(4),
        color:'white',
        fontWeight:'bold'
    },
    currency: {
        fontSize:wp(5),
    },
    description: {
        fontSize:wp(4),
        paddingTop:wp(4)
    },
});

export default DetailInfo;
