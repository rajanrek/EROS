import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity
} from 'react-native';
import styles from './styles';
import {SafeAreaView} from 'react-native-safe-area-context';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import StarRatingDisplay from 'react-native-star-rating-widget';
import {useDispatch, useSelector} from 'react-redux';
import {SubmitReview} from '../../redux/action/actions';
import Colors from '../Colors/colors';


const WriteReview = props => {
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState('');
  const {registerData} = useSelector(state => state.newuser.user);
  const {data} = useSelector(state => state.loginuser.user);
  const apiData = registerData
    ? registerData?.ResultData?.loginResponse
    : data?.ResultData?.loginResponse
    ? data?.ResultData?.loginResponse
    : data?.ResultData;
  const dispatch = useDispatch();
  const {detailsData, detailsLoading} = useSelector(
    state => state.details.Details,
  );

  const {submitReviewData, submitReviewisLoading} = useSelector(
    state => state.reviewSubmit.submitReview,
  );

  const onChangeText = item => {
    setComment(item);
  };

  const submitReview = () => {
    const postJson = {
      UserId: apiData?.CustomerId,
      Reviews: [
        {
          ProductId: props?.mainData?.ProductId ?
           props?.mainData?.ProductId : props?.selectedData?.ProductID,
          Rating: rating,
          Comments: comment,
        },
      ],
    };
    dispatch(SubmitReview(postJson));
    props.onClose();
  };


  return (
    <View style={styles.mainContainer}>
      <SafeAreaView style={styles.mainContainer}>
        <View style={styles.left}>
          <Text style={styles.editTxt}>
            {props?.mainData?.Name
              ? props?.mainData?.Name
              : props?.selectedData?.ProductName}
          </Text>
        </View>

        <View style={styles.rating}>
          <View style={styles.ratingsubView}>
            <Text style={styles.ratingTxt}>Rating:</Text>

            <StarRatingDisplay
              rating={rating}
              color="black"
              enableHalfStar={false}
              starSize={hp('4.5%')}
              onChange={setRating}
            />
          </View>

          <View style={styles.txtInput}>
            <TextInput
              numberOfLines={6}
              minHeight={120}
              onChangeText={text => onChangeText(text)}
              textAlignVertical="top"
              multiline={true}
              placeholderTextColor={Colors.SemiGrey}
              style={styles.input}
              placeholder="comment..."
              value={comment}
            />
          </View>
        </View>

        <View style={styles.btnView}>
          <View style={styles.btnsubView}>
            <TouchableOpacity onPress={props.onClose} style={styles.writeBtn}>
              <Text style={styles.cancelTxt}>Cancel</Text>
            </TouchableOpacity>

            <TouchableOpacity
              onPress={() => submitReview()}
              disabled={comment.length < 3}
              style={
                comment.length < 3
                  ? styles.disablereorderView
                  : styles.reorderView
              }>
              <Text style={styles.btnTxt}>Submit</Text>
            </TouchableOpacity>
          </View>
        </View>
      </SafeAreaView>
    </View>
  );
};

export default WriteReview;
