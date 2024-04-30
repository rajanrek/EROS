import Globals from './constant';
import axios from 'axios';
import {Platform, Alert} from 'react-native';
import {store} from '../redux/store';
//import { Platform } from 'react-native';
// Call post Api

export const getStoreState = () => {
  return store.getState();
};

const CountryCode = getStoreState().loginuser.user.data?.ResultData;
const CountryCodeRegister =
  getStoreState().loginuser.user.data?.ResultData.loginResponse;

const API_URL = 'https://newappapi.lensgroup.co/api/';
// const API_URL = `https://newappapi.lensgroup.co/api/${
//   CountryCodeRegister
//     ? CountryCodeRegister?.CodeToAppend
//     : CountryCode?.CodeToAppend
// }/`;

const CustomerId = CountryCodeRegister
  ? CountryCodeRegister?.CustomerId
  : CountryCode?.CustomerId;

console.log('API_URL-', API_URL);

console.log('customer 37--', CustomerId);

// call this function when new api url is being used and params is passed in url for get method
export function getApiCallwithNew(param) {
  console.log('API_URL-', API_URL);

  //  const AuthStr = 'Basic'.concat('App1app#123');
  // const  AuthStr = "Basic " +"QXBwMTphcHAxIzEyMw==";
  var url = param.url;
  var json = param.json;
  url = url + json?.type;
  console.log('url--68-', url);
  console.log('json-68--', json);
var custmId=param?.CustomerId
  return axios
    .get(API_URL.concat(json != undefined ? url : param.url), {
      headers: {
        Authorization: 'Basic ' + Globals.TOKEN,
        customerId: custmId,
        version: '10',
      },
    })
    .then(response => {
      return response.data;
    })
    .catch(error => {
      if (error.toJSON().message === 'Network Error') {
        Alert.alert(
          '',
          'Oops…something went wrong!Please check your connection and try again',
        );
        //  dispatch({type: RELOAD});
      } else if (error.response.status == 404) {
        Alert.alert('', 'Could not connect to server. Please try again later.');
        //  dispatch({type: RELOAD});
      }
      return error;
    });
}

// call this function when new api url is being used and params is passed in url for post method

export function postApiCallwithNew(param) {
  console.log('paramsss 8----------', API_URL);

  try {
    let url = param.url;
    var json = param.json;
    url = url + json.EmailId;
    console.log('url---', url);
    console.log('json---', json);
    console.log('paramsss----------', param);
    return axios
      .post(API_URL.concat(url), null, {
        headers: {Authorization: 'Basic ' + Globals.TOKEN, version: '10'},
      })
      .then(response => {
        return response.data;
      })
      .catch(error => {
        if (error.toJSON().message === 'Network Error') {
          Alert.alert(
            '',
            'Oops…something went wrong! Please check your connection and try again',
          );
          // dispatch({type: RELOAD});
        } else if (error.response.status == 404) {
          Alert.alert(
            '',
            'Could not connect to server. Please try again later.',
          );
          //  dispatch({type: RELOAD});
        }
        return error;
      });
  } catch (error) {
    console.log('Error from post api call1111>>>', error);
  }
}

// call this function when new api url is being used and params is passed as json object for post method
export function postApiCallWithNewParams(param) {
  console.log('paramsss in handlers 84----------', param);
  try {
    var url = param.url;
    var json = param.json;
    // var customerId = json.CustomerId;
    // let customerId = param.customerId;

    console.log('api url in handler---------', url);
    return axios
      .post(API_URL.concat(url), json, {
        headers: {
          Authorization: 'Basic ' + Globals.TOKEN,
          version: '10',
          customerId: CustomerId,
        },
      })
      .then(response => {
        return response.data;
      })
      .catch(error => {
        if (error?.toJSON().message === 'Network Error') {
          Alert.alert(
            '',
            'Oops…something went wrong! Please check your connection and try again',
          );
          // dispatch({type: RELOAD});
        } else if (error.response.status == 404) {
          Alert.alert(
            '',
            'Could not connect to server. Please try again later.',
          );
          //  dispatch({type: RELOAD});
        }
        return error;
      });
  } catch (error) {
    console.log('Error from post api call>>>', error);
  }
}
