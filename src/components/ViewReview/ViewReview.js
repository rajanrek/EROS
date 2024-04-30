import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  Image,
  TextInput,
  FlatList,
  TouchableOpacity,
  Alert,
} from 'react-native';
import styles from './styles';
import {SafeAreaView} from 'react-native-safe-area-context';
import {useDispatch, useSelector} from 'react-redux';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import StarRatingDisplay from 'react-native-star-rating-widget';
import FgcHeader from '../Header/FgcHeader';
import {AllReview} from '../../redux/action/actions';
import {SkypeIndicator} from 'react-native-indicators';

const ViewReview = props => {
  const dispatch = useDispatch();

  const {viewReviewData, viewReviewisLoading} = useSelector(
    state => state.reviewView.viewReview,
  );

  const commonParam = '?pageindex=0&pagesize=1000';
  const postJson = {
    type: props.route.params.props.mainData.ProductId + commonParam,
  };

  useEffect(() => {
    dispatch(AllReview(postJson));
  }, [Data]);

  const Data = viewReviewData?.ResultData?.Reviews;

  return (
    <View style={styles.mainContainer}>
      <SafeAreaView style={styles.mainContainer}>
        <FgcHeader isSearch={true} title={'All Reviews'} />

        <FlatList
          data={Data}
          renderItem={({item}) => {
            return (
              <View style={styles.flatlistView}>
                <View style={styles.subView}>
                  <View style={styles.userView}>
                    <Text style={styles.userTxt}>{item.UserName}</Text>
                  </View>

                  <View style={styles.reviewView}>
                    <Text style={styles.dateTxt}>{item.ReviewDate}</Text>
                  </View>
                </View>
                <View style={styles.ratingView}>
                  <StarRatingDisplay
                    rating={item.Rating}
                    color="black"
                    starSize={hp('3%')}
                    onChange={() => null}
                  />
                </View>
                <View style={styles.commentView}>
                  <Text style={styles.commentTxt}>{item.Comments}</Text>
                </View>
              </View>
            );
          }}
          keyExtractor={item => item.id}
        />
      </SafeAreaView>
      {viewReviewisLoading && (
        <View style={styles.IndicatorView}>
          <SkypeIndicator size={100} animationDuration={800} />
        </View>
      )}
    </View>
  );
};

export default ViewReview;
