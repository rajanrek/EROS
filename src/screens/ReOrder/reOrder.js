// import React, {useEffect, useRef, useState} from 'react';
// import {
//   View,
//   Text,
//   FlatList,
//   SafeAreaView,
//   TouchableOpacity,
//   Image,
//   TextInput,
//   ScrollView,
// } from 'react-native';
// import styles from './styles';
// import FgcHeader from '../../components/Header/FgcHeader';
// import Colors from '../../components/Colors/colors';
// import ImageUrl from '../../components/ImageUrl';
// import {
//   widthPercentageToDP as wp,
//   heightPercentageToDP as hp,
// } from 'react-native-responsive-screen';
// import RBSheet from 'react-native-raw-bottom-sheet';
// import CommonCheckBox from '../../components/commonCheckbox/commonCheckbox';
// import Button from '../../components/Button/button';
// import SetAutoReplenish from '../../components/SetAutoReplenish/setAutoReplenish';
// import { useSelector } from 'react-redux';

// const Reorder = props => {
//   const [email, setEmail] = useState(false);
//   const [sms, setSms] = useState(false);

//   const refRBSheet = useRef();

//   const handleCloseRBSheet = () => {
//     refRBSheet.current.close();
//   };

//   const handleOpenRBSheet = item => {
//     refRBSheet.current.open();
//   };

//   const handleToggle = param => {
//     if (param == 1) {
//       setEmail(!email);
//     } else {
//       setSms(!sms);
//     }
//   };
//   const {accountData} = useSelector(
//     state => state.accountData.account,
//   );

//   const details = accountData?.ResultData?.personalDetailResponse;

//   console.log('reorderProps----', props);
//   return (
//     <View style={styles.mainContainer}>
//       <SafeAreaView style={styles.safeContainer}>
//         <FgcHeader title={'Re-order reminder'} />
//       </SafeAreaView>
//       <ScrollView>
//         <View style={styles.commonView}>
//           <View style={styles.subView}>
//             <Text style={styles.reminderTxt}>
//               My current re-order reminder date:
//             </Text>
//           </View>
//           <View style={styles.dateView}>
//             <Text style={styles.reminderDateTxt}>Reminder date:</Text>
//             <View style={styles.dateSubView}>
//               <View style={styles.backgroundView}>
//                 <Text style={styles.dateTxt}>16/03/2023</Text>
//               </View>
//               <View style={styles.btnView}>
//                 <Button
//                   onPress={handleOpenRBSheet}
//                   txtColor={Colors.White}
//                   color={Colors.Black}
//                   title={'Change my re-order reminder date'}
//                 />
//               </View>
//             </View>
//           </View>

//           <View style={styles.likeView}>
//             <View>
//               <Text style={styles.likeTxt}>
//                 I'd like to receive my re-order reminder via:
//               </Text>
//               <Text style={styles.tickTxt}>(Please tick)</Text>
//             </View>
//             <View style={styles.emailView}>
//               <View style={styles.emailSubView}>
//                 <Text style={styles.emailTxt}>Email</Text>

//                 <View style={styles.mailView}>
//                   <View style={styles.commonView}>
//                     <Text style={styles.mailTxt}>{details?.Email}</Text>
//                   </View>
//                   <View style={styles.commonCheckView}>
//                     <CommonCheckBox
//                       imageSource={ImageUrl.CheckRing}
//                       onToggle={() => handleToggle(1)}
//                       isChecked={email}
//                       uncheckedImage={ImageUrl.UncheckRing}
//                     />
//                   </View>
//                 </View>
//               </View>

//               <View style={styles.smsView}>
//                 <Text style={styles.smsTxt}>SMS</Text>

//                 <View style={styles.smsSubView}>
//                   <View style={styles.commonView}>
//                     <TextInput
//                       style={styles.inputTxt}
//                       value={sms}
//                       maxLength={12}
//                       keyboardType="numeric"
//                       placeholder="Enter mobile"
//                       placeholderTextColor={Colors.LightGrey}
//                     />
//                   </View>
//                   <View style={styles.commonCheckView}>
//                     <CommonCheckBox
//                       imageSource={ImageUrl.CheckRing}
//                       onToggle={() => handleToggle(2)}
//                       isChecked={sms}
//                       uncheckedImage={ImageUrl.UncheckRing}
//                     />
//                   </View>
//                 </View>
//               </View>
//             </View>
//             <View style={styles.btn}>
//               <Button
//                 title={'Update'}
//                 txtColor={Colors.White}
//                 color={Colors.Black}
//               />
//             </View>
//           </View>
//         </View>
//       </ScrollView>

//       <RBSheet
//         ref={refRBSheet}
//         height={hp('95%')}
//         openDuration={250}
//         closeOnDragDown={true}
//         animationType="fade"
//         customStyles={{
//           container: {
//             backgroundColor: Colors.LightWhite,
//             // justifyContent: 'center',
//             // alignItems: 'center',
//           },
//         }}>
//         <SetAutoReplenish
//           handleBtn={props?.route?.name === 'reOrder'}
//           onClose={handleCloseRBSheet}
//         />
//       </RBSheet>
//     </View>
//   );
// };
// export default Reorder;
