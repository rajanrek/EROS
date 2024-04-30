import React, {useEffect, useState} from 'react';
import {
  View,
  ScrollView,
  Text,
  Image,
  FlatList,
  TouchableOpacity,
  SafeAreaView,
} from 'react-native';
import HeaderCard from './components/HeaderCard';
import MultiCard from './components/MultiCard';
import Styles from './styles';
// import Button from './components/Button';
import {RewardPoint, CreditScore} from '../../redux/action/actions';
import {useDispatch, useSelector} from 'react-redux';
import {useNavigation} from '@react-navigation/native';
import ImageUrl from '../../components/ImageUrl';

const RewardPoints = (props, {backHandler}) => {
  const [pageCurrent, setpageCurrent] = useState(1);
  const [buttonStatus, setButtonStatus] = useState('');

  const {registerData} = useSelector(state => state.newuser.user);
  const {data} = useSelector(state => state.loginuser.user);

  const apiData = registerData
    ? registerData?.ResultData?.loginResponse
    : data?.ResultData?.loginResponse
    ? data?.ResultData?.loginResponse
    : data?.ResultData;

  const {RewardData, CreditData} = useSelector(
    props?.route?.params?.screenName == 'Reward Point'
      ? state => state.rewardPoint.RewardPointData
      : state => state.creditScore.CreditScoreData,
  );

  const navigation = useNavigation();
  const goBack = () => {
    if (backHandler) {
      backHandler();
    }
    navigation.goBack();
  };

  const postJson = {
    type: apiData.CustomerId,
  };

  const dispatch = useDispatch();
  useEffect(() => {
    props?.route?.params?.screenName == 'Reward Point'
      ? dispatch(RewardPoint(postJson))
      : dispatch(CreditScore(postJson));
  }, [pageCurrent, buttonStatus]);

  const loadMore = () => {
    console.log('next page clicked', pageCurrent);
    setpageCurrent(pageCurrent + 1);
  };

  // const ListHeader = () => {
  //   // console.log("listHeader======", RewardData?.ResultData?.History.length)
  //   return Data?.ResultData?.History?.length > 40 ? (
  //     <TouchableOpacity disabled={true} style={Styles.footerStyle}
  //      onPress={() => loadMore()}
  //     >
  //       <View>
  //         <View>
  //           <Text style={Styles.loadMoreText}>Load More</Text>
  //         </View>
  //       </View>
  //     </TouchableOpacity>
  //   ) : null;
  // };

  const updateState = data => {
    setButtonStatus(data);
  };

  const Data =
    props?.route?.params?.screenName == 'Reward Point'
      ? RewardData
      : CreditData;

  // console.log("RewardData============", RewardData, "buttonStatus", buttonStatus, "Data==========>",Data, "CreditData====",CreditData)

  return (
    <SafeAreaView style={Styles.mainView}>
      <View style={Styles.arrowView}>
        <TouchableOpacity onPress={goBack} style={Styles.imageTouch}>
          <Image style={Styles.image} source={ImageUrl.BackArrow} />
        </TouchableOpacity>
        {props?.route?.params?.screenName == 'Reward Point' ? (
          <Text style={Styles.rewardTextStyle}>Reward Points</Text>
        ) : (
          <Text style={Styles.rewardTextStyle}>Store Credit</Text>
        )}
      </View>

      <HeaderCard
        data={Data?.ResultData}
        screenType={props?.route?.params?.screenName}
      />

      <Button
        data={Data?.ResultData}
        updateParentState={data => updateState(data)}
        buttonScreenType={props?.route?.params?.screenName}
      />

      <FlatList
        data={Data?.ResultData?.History}
        renderItem={({item, key}) => {
          if (props?.route?.params?.screenName == 'Reward Point') {
            if (buttonStatus.redeemedButtonStatus && item.Redeemed !== '') {
              return (
                <View style={Styles.mainView}>
                  <MultiCard
                    data={item}
                    buttonData={buttonStatus}
                    screenType={props?.route?.params?.screenName}
                  />
                </View>
              );
            }
            if (buttonStatus.earnedRewardButtonStatus && item.Earned !== '') {
              return (
                <View style={Styles.mainView}>
                  <MultiCard
                    data={item}
                    buttonData={buttonStatus}
                    screenType={props?.route?.params?.screenName}
                  />
                </View>
              );
            }
          } else {
            if (
              buttonStatus.earnedRewardButtonStatus &&
              item.UsageType == 'DR'
            ) {
              return (
                <View style={Styles.mainView}>
                  <MultiCard
                    data={item}
                    buttonData={buttonStatus}
                    screenType={props?.route?.params?.screenName}
                  />
                </View>
              );
            }
            if (buttonStatus.redeemedButtonStatus && item.UsageType == 'CR') {
              return (
                <View style={Styles.mainView}>
                  <MultiCard
                    data={item}
                    buttonData={buttonStatus}
                    screenType={props?.route?.params?.screenName}
                  />
                </View>
              );
            }
          }
        }}
        // ListFooterComponent={ListHeader}
        // keyExtractor={(item, index) => index.toString()}
        showsVerticalScrollIndicator={false}
      />
    </SafeAreaView>
  );
};

const Button = props => {
  // const fadeAnim = useRef(new Animated.Value(0)).current;

  const [buttonStatus1, setButtonStatus1] = useState(true);
  const [buttonStatus2, setButtonStatus2] = useState(false);

  const button1 = () => {
    console.log('button1======', props);
    setButtonStatus1(false);
    setButtonStatus2(true);
    props.updateParentState({
      earnedRewardButtonStatus: buttonStatus2,
      redeemedButtonStatus: buttonStatus1,
    });
  };

  const button2 = () => {
    setButtonStatus1(true);
    setButtonStatus2(false);
    props.updateParentState({
      earnedRewardButtonStatus: buttonStatus2,
      redeemedButtonStatus: buttonStatus1,
    });
  };

  useEffect(() => {
    props.updateParentState({
      earnedRewardButtonStatus: buttonStatus1,
      redeemedButtonStatus: buttonStatus2,
    });
  }, []);

  return (
    <View style={Styles.mainVieww}>
      {buttonStatus1 ? (
        // Active button

        <View style={Styles.buttonActiveView}>
          <TouchableOpacity>
            <View>
              {props.buttonScreenType == 'Reward Point' ? (
                <>
                  <Text style={Styles.activeTitleTextStyle}>Earned Reward</Text>
                  <View style={Styles.activePointsTextMainContainer}>
                    <Text style={Styles.activePointsTextStyle}>
                      {props?.data?.TotalEarned} Points
                    </Text>
                  </View>
                </>
              ) : (
                <>
                  <Text style={Styles.activeTitleTextStyle}>Debited</Text>
                  <View style={Styles.activePointsTextMainContainer}>
                    <Text style={Styles.activePointsTextStyle}>
                      {props?.data?.TotalDebitAmountText}
                    </Text>
                  </View>
                </>
              )}
            </View>
          </TouchableOpacity>
        </View>
      ) : (
        // Non Active button

        <View style={Styles.buttonNonActiveView}>
          <TouchableOpacity onPress={() => button2()}>
            <View>
              {props.buttonScreenType == 'Reward Point' ? (
                <>
                  <Text style={Styles.nonActiveTitleTextStyle}>
                    Earned Reward
                  </Text>
                  <View style={Styles.activePointsTextMainContainer}>
                    <Text style={Styles.nonActivePointsTextStyle}>
                      {props?.data?.TotalEarned} Points
                    </Text>
                  </View>
                </>
              ) : (
                <>
                  <Text style={Styles.nonActiveTitleTextStyle}>Debited</Text>
                  <View style={Styles.activePointsTextMainContainer}>
                    <Text style={Styles.nonActivePointsTextStyle}>
                      {props?.data?.TotalDebitAmountText}
                    </Text>
                  </View>
                </>
              )}
            </View>
          </TouchableOpacity>
        </View>
      )}

      {buttonStatus2 ? (
        <View style={Styles.buttonActiveView}>
          <TouchableOpacity>
            <View>
              {props.buttonScreenType == 'Reward Point' ? (
                <>
                  <Text style={Styles.activeTitleTextStyle}>Redeemed</Text>
                  <View style={Styles.activePointsTextMainContainer}>
                    <Text style={Styles.activePointsTextStyle}>
                      {props?.data?.TotalRedeemed} Points
                    </Text>
                  </View>
                </>
              ) : (
                <>
                  <Text style={Styles.activeTitleTextStyle}>Credited</Text>
                  <View style={Styles.activePointsTextMainContainer}>
                    <Text style={Styles.activePointsTextStyle}>
                      {props?.data?.TotalCreditAmountText}
                    </Text>
                  </View>
                </>
              )}
            </View>
          </TouchableOpacity>
        </View>
      ) : (
        <View style={Styles.buttonNonActiveView}>
          <TouchableOpacity onPress={() => button1()}>
            <View>
              {props.buttonScreenType == 'Reward Point' ? (
                <>
                  <Text style={Styles.nonActiveTitleTextStyle}>Redeemed</Text>
                  <View style={Styles.activePointsTextMainContainer}>
                    <Text style={Styles.nonActivePointsTextStyle}>
                      {props?.data?.TotalRedeemed} Points
                    </Text>
                  </View>
                </>
              ) : (
                <>
                  <Text style={Styles.nonActiveTitleTextStyle}>Credited</Text>
                  <View style={Styles.activePointsTextMainContainer}>
                    <Text style={Styles.nonActivePointsTextStyle}>
                      {props?.data?.TotalCreditAmountText}
                    </Text>
                  </View>
                </>
              )}
            </View>
          </TouchableOpacity>
        </View>
      )}
    </View>
  );
};

export default RewardPoints;
