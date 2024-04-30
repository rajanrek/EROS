import react from 'react'
import {TouchableOpacity,Text} from 'react-native'
import styles from './styles';
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';


const Button = ({onPress, title, disable, color, txtColor,width}) =>{
    return(
<TouchableOpacity onPress={onPress} disabled={disable} style={[styles.btnContainer, {backgroundColor:color, width:width ? width : wp('88%') }]}>

<Text style={[styles.btnText,{color:txtColor}]}>{title}</Text>

</TouchableOpacity>
    )
}

export default Button
