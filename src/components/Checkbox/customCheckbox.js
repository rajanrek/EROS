import React, { useState } from 'react';
import { View, Text, TouchableOpacity, Image } from 'react-native';
import ImageUrl from '../ImageUrl';
import styles from './styles';
import CheckBox from 'react-native-check-box'
import Colors from '../Colors/colors';
import Fonts from '../CustomsFonts/customFonts';


const CustomeCheckbox = ({ options, handleSelect }) => {
    const [selectedItems, setSelectedItems] = useState([]);
    const [allselectedItems, setAllSelectedItems] = useState([]);
    const handleCheckboxChange = (option) => {
        if (option === 0) {
            if (selectedItems.length-1 === options.length - 1) {
                // If all other checkboxes are already selected, unselect them
                setSelectedItems([]);
            } else {
                // Otherwise, select all checkboxes
                console.log("options.length---", options.length-1, "selectedItems.length", selectedItems.length-1)
                if(selectedItems.length === options.length){
                setSelectedItems([]);
                }
                setSelectedItems(options.map((opt) => opt.MenuId));
            }
        } else {

            if (selectedItems.includes(7)) {
            const index = selectedItems.indexOf(0);
            if (index > -1) { // only splice array when item is found
                selectedItems.splice(index, 1); // 2nd parameter means remove one item only
              }
                // If "Select All" is checked and you uncheck any other checkbox, uncheck "Select All"

            }
    
            if (selectedItems.includes(option)) {

                // Unselect the checkbox
                setSelectedItems(selectedItems.filter(item => item !== option ));
            } else {

                // Select the checkbox
                setSelectedItems([...selectedItems, option]);
            }
        }
    };
    
    
    handleSelect(selectedItems, allselectedItems)
    return (
        <View style={styles.mainContainer}>
            {options.map((option, index) => {
                return (<View key={index} style={styles.checkBoxView}>


                    <CheckBox
                        style={{  paddingRight: 15, paddingVertical:5 }}
                        onClick={() => handleCheckboxChange(option.MenuId)}
                        isChecked={selectedItems.includes(option.MenuId)}
                        checkedImage={<Image style={[option.img ? styles.checkMarkImage2 : styles.checkMarkImage]} source={option.img ? option.img: ImageUrl.CheckMark} />}
                        unCheckedImage={<Image style={[option.img ? styles.checkBoxImage2 : styles.checkBoxImage]} source={option.img2 ? option.img2: ImageUrl.CheckBox} />}
                        rightTextView={<View style={{paddingLeft:15}}>
                        <Text style={[option.img ? styles.brandTxt : styles.titleTxt]}>{option.MenuName}</Text>

                    </View>}
                    
                    />

                </View>)
            })}

        </View>
    );
}

export default CustomeCheckbox;

