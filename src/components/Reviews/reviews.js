import React, {useRef, useState} from 'react';
import {View, Text, TouchableOpacity, Image, TextInput} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import styles from './styles';
import StarRatingDisplay from 'react-native-star-rating-widget';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import ImageUrl from '../ImageUrl';
import RBSheet from 'react-native-raw-bottom-sheet';
import WriteReview from '../WriteReview/writeReview';
import Colors from '../Colors/colors';


const Reviews = props => {
  const navigation = useNavigation();
  const [selectedData, setSelectedData] = useState(null);

  const refRBSheet = useRef();

  const handleCloseRBSheet = () => {
    refRBSheet.current.close();
  };

  const handleOpenRBSheet = () => {
    // setSelectedData(item)
    refRBSheet.current.open();
  };

  return (
    <View style={styles.mainView}>
      <Text style={styles.shopTxt}>Reviews</Text>
      <View style={styles.subView}>
        
      { props.TotalReviews != 0 &&
          ( 
        <View style={styles.starView}>
          <View style={styles.ratingView}>

      
          <View style={styles.flex}>
              <View style={styles.starSubView}>
                <StarRatingDisplay
                  rating={props.rating}
                  color="black"
                  starSize={hp('3.2%')}
                  onChange={() => null}
                />
                <Text style={styles.numTxt}>{props.TotalReviews}</Text>
              </View>
              <View style={styles.flex}>
                <TouchableOpacity
                  onPress={() => navigation.navigate('viewReview', {props})}
                  style={styles.allReviews}>
                  <Text style={styles.reviewTxt}>View all Reviews</Text>
                  <Image style={styles.arrowImg} source={ImageUrl.GreyArrow} />
                </TouchableOpacity>
              </View>
            </View>

          </View>
          <View style={styles.imageView}>
            <Image style={styles.reviewImg} source={ImageUrl.ReviewImg} />
          </View>
        </View>
  
         ) }
        <View style={styles.writeView}>
          <View style={styles.writeSubView}>
            <View style={styles.txtView}>
              <TouchableOpacity
                onPress={() => handleOpenRBSheet()}
                style={styles.txtInput}>
                <Text style={styles.reviewTxt}>Write a Review</Text>

                <Image style={styles.arrowImg} source={ImageUrl.GreyArrow} />
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </View>

      <RBSheet
        ref={refRBSheet}
        height={hp('45%')}
        openDuration={250}
        closeOnDragDown={true}
        animationType="fade"
        customStyles={{
          container: {
            backgroundColor: Colors.LightWhite,
          },
        }}>
        <WriteReview
          mainData={props.mainData}
          selectedData={selectedData}
          onClose={handleCloseRBSheet}
        />
      </RBSheet>
    </View>
  );
};

export default Reviews;
