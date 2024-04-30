import Globals from "../../utils/constant";

 
 
var excludedVariable = "L0", recommendedVariable = "R0";
var recommended = [];
var excluded = [];

 
var error2 = "There is a significant difference between your Right Eye Sphere value and your Left Eye Sphere value (greater than 5 dioptres).\n" +
"Please review the details you have entered and make sure it is correct." +
`\nPlease call our optical advisers on 0800 458 2090 for further assistance.`;
var error1 = "Unfortunately, the prescription you have entered is out of our prescription range.\n" +
`Please call our optical advisers on 0800 458 2090 for further assistance.`;
var error3 = "Please double check your Cylinder (CYL) as stated on your prescription.\n" +
"You have entered ‘+’ CYL for one eye.\n" +
"You have entered ‘–’ CYL for the other eye.\n" +
"\n" +
"Please review the details you have entered and re-enter your Cylinder (CYL).";
 
export function getPackages(packages, isEnterLater) {
 console.log("packages in get package-----", packages)
 console.log(" Globals._excluded in get package-----",  Globals._excluded)
    Globals._excluded=[];
    Globals._recommended=[];
    
    var arrRecommended = packages?.RecomendedPackageId?.split("|");
    var arrExcluded = packages?.ExcludedPackageIds?.split("|");
    var FrPkgId = packages?.RecomendedPackageId?.split("FrPkgId=");
 console.log("packages in get FrPkgId-----", FrPkgId)
 if(FrPkgId?.length >1){
    Globals.FrPkgId = FrPkgId[1];

 }

    let rec = "";
    let exc = "";
    if (isEnterLater) {
 console.log(" inside isenter get package-----",isEnterLater, packages)

        excluded = getArray(packages?.ExcludedPackageIds, false, isEnterLater);
        recommended = getArray(packages?.RecomendedPackageId, true, isEnterLater);
     
        Globals._excluded=excluded;
        Globals._recommended=recommended;

    }
    else {
        Globals.sphereRight?.Value
        Globals.sphereRight?.Value
        Globals.cylinderLeft?.Value
        Globals.cylinderRight?.Value
        console.log("getPackages fn-sprleft---",Globals.sphereRight?.Value)
        console.log("getPackages fn-right---",Globals.sphereRight?.Value)
   
      var sphereValue = getSphereValue();
       var spherePlusCylinder = getSpherePlusCylinder();
       var hasCylinderValue = false;
     console.log("sphereValue---in fn--", sphereValue)
     console.log("spherePlusCylinder---in fn--", spherePlusCylinder)
       if ( Globals.cylinderLeft!= '---' ||  Globals.cylinderRight != '---'){
        hasCylinderValue = true;
       
    }
 

        for (var i = arrRecommended?.length; i--;) {
 

            rec = getRecommendedPackage(arrRecommended[i], sphereValue, hasCylinderValue, spherePlusCylinder);
           // alert(rec)
            if (rec != "") {
                break;
            }
          }

       
        for (var i = arrExcluded?.length; i--;) {
            exc = getExcludedPackage(arrExcluded[i], sphereValue, hasCylinderValue, spherePlusCylinder);
            if (exc !== "") {
                break;
            }
          }
 
        if (rec !== "") {
           // alert(recommended)
            recommended = rec.split(",");
        } else {
            recommended = getArray(packages.RecomendedPackageId, true, isEnterLater);
        }
 
        if (exc !== "") {
            excluded = exc.split(",");
        } else {
            excluded = getArray(packages.ExcludedPackageIds, false, isEnterLater);
        }
 
        Globals._excluded=excluded;
        Globals._recommended=recommended;
    }
}

 
export function getArray(code, isRecommended, isEnterLater) {
 
    var hashMap = new Map();
    if (code != null) {
        var arr1 = code.split("|");
 
 
        for (var i = 0; i < arr1?.length; i++) {
            var arr = arr1[i].split("=");
            if (arr?.length == 2) {
                hashMap.set(arr[0], arr[1]);
            } else {
                hashMap.set(arr[0], "");
 
            }
        }
 
        var recommendedStr;
        if (isRecommended) {
            if (isEnterLater) {
                recommendedStr = hashMap.get("R0");
            } else {
                recommendedStr = hashMap.get(recommendedVariable);
                if (recommendedStr == null) {
                    recommendedStr = hashMap.get("R0");
                }
            }
        } else {
            if (isEnterLater) {
                recommendedStr = hashMap.get("L0");
            } else {
                recommendedStr = hashMap.get(excludedVariable);
                if (recommendedStr == null) {
                    recommendedStr = hashMap.get("L0");
                }
            }
        }
        if (recommendedStr != null && recommendedStr != "") {
            return recommendedStr.split(",");
        } else {
            return [];
        }
    } else {
        return [];
    }
 
}
//
function isContains(arr, key, val) {
    for (var i = 0; i < arr?.length; i++) {
        if (arr[i][key] === val ) return arr[i].Value;
    }
    return "";
}
function  getSphereValue() {

    var left = Math.abs(Globals.sphereRight?.Value);
    var right = Math.abs(Globals.sphereRight);
   
    if (left > right) {
        return Globals.sphereRight?.Value;
    } else {
        return Globals.sphereRight;
    }
 
}
function getSpherePlusCylinder() {
    let localcylinderLeft=Globals.cylinderLeft;
    let localcylinderRight=Globals.cylinderRight;
    if (Globals.cylinderLeft== '---')
    localcylinderLeft=0;
        if (Globals.cylinderRight== '---')
        localcylinderRight=0;

 
   var L=parseFloat(Globals.sphereRight?.Value) + parseFloat(localcylinderLeft?.Value);
   var R=parseFloat(Globals.sphereRight?.Value) + parseFloat(localcylinderRight.Value);
 
   if(Math.abs(L)>Math.abs(R))
   return L;
   else
   return R;
 

}
function getRecommendedPackage( logicData,  attrPowerValue,  hasCylinderValue,  sumPowerCylinderValue) {
    var result = "";
    var logicValues = [];
    logicValues= logicData.split("=");

    if (logicValues?.length == 2 && logicValues[0] !== "" && !logicValues[1] !==""){
       // console.log("ENTER "+logicValues[0])
        switch (logicValues[0]) {
            case "R1":
                case "R10":
                case "R20":
                case "R30":
            {
                if (hasCylinderValue) {
                    if (sumPowerCylinderValue <= 0.00 && sumPowerCylinderValue >= -3.00) {
                        result = logicValues[1];
                    }
                } else {
                    if (attrPowerValue <= 0.00 && attrPowerValue >= -3.00) {
                        result = logicValues[1];
                    }
                }
                break;
            }
            case "R2":
                case "R11":
                case "R21":
                case "R31":
            {
                if (hasCylinderValue) {
                    if (sumPowerCylinderValue >= 0.00 && sumPowerCylinderValue <= 3.00) {
                        result = logicValues[1];
                    }
                } else {
                    if (attrPowerValue >= 0.00 && attrPowerValue <= 3.00) {
                        result = logicValues[1];
                    }
                }
                break;
            }
            case "R3":
                case "R22":
            {
               // alert(logicValues[1])
                if (hasCylinderValue) {
                    if (sumPowerCylinderValue <= -3.25 && sumPowerCylinderValue >= -4.00) {
                        result = logicValues[1];
                    }
                } else {
                    if (attrPowerValue <= -3.25 && attrPowerValue >= -4.00) {
                        result = logicValues[1];
                    }
                }
                break;
            }
            case "R4":
                case "R23":
                 {
                if (hasCylinderValue) {
                    if (sumPowerCylinderValue >= 3.25 && sumPowerCylinderValue <= 4.00) {
                        result = logicValues[1];
                    }
                } else {
                    if (attrPowerValue >= 3.25 && attrPowerValue <= 4.00) {
                        result = logicValues[1];
                    }
                }
                break;
            }
 
            case "R12":
                case "R32":
                    {
                        if (hasCylinderValue) {
                            if (sumPowerCylinderValue < -3.00) {
                                result = logicValues[1];
                            }
                        } else {
                            if (attrPowerValue < -3.00) {
                                result = logicValues[1];
                            }
                        }
                        break;
                    }
                case "R13":
                case "R33":
                    {
                        if (hasCylinderValue) {
                            if (sumPowerCylinderValue > 3.00) {
                                result = logicValues[1];
                            }
                        } else {
 
                            if (attrPowerValue > 3.00) {
                                result = logicValues[1];
                            }
                        }
                        break;
                    }
 
                    case "R5":
                        case "R24":
                 {
                if (hasCylinderValue) {
                    if (sumPowerCylinderValue < -4.00) {
                        result = logicValues[1];
                    }
                } else {
                    if (attrPowerValue < -4.00) {
                        result = logicValues[1];
                    }
                }
                break;
            }
            case "R6":
                case "R25":
            {
                if (hasCylinderValue) {
                    if (sumPowerCylinderValue > 4.00) {
                        result = logicValues[1];
                    }
                } else {
                    if (attrPowerValue > 4.00) {
                        result = logicValues[1];
                    }
                }
                break;
            }
    }
    }
    return result;
}
 
 
 
 
function __ValidateRecommentedPakageLogic(logicData, attrPowerValue, hasCylinderValue, sumPowerCylinderValue) {
    console.log("ENTERRRRRRRRRRRRRRRRRRRRR")
var attrPowerValue=parseFloat(attrPowerValue)
  var hasCylinderValue=parseFloat(hasCylinderValue);
  var sumPowerCylinderValue=parseFloat(sumPowerCylinderValue);
 
    var result = '';
    var logicValues = logicData.split('=');
    if (logicValues?.length == 2 && logicValues[0] != '' && logicValues[1] != '') {
        console.log("11111111111")
        var logicID = logicValues[0];
        console.log(logicID)
        //Do not check attribute logic if not provided
        if (attrPowerValue) {
            console.log("2222222222222")
            switch (logicID) {
                case "R1":
                case "R10":
                case "R20":
                case "R30":
                    {
                        console.log("33333333333333")
                        if (hasCylinderValue) {
                            console.log("hasCylinderValue*****")
                            console.log(sumPowerCylinderValue)
                            if (sumPowerCylinderValue <= 0.00 && sumPowerCylinderValue >= -3.00) {
                                result = logicValues[1];
                            }
                        } else {
                            console.log("attrPowerValue*****")
                            console.log(attrPowerValue)
                            if (attrPowerValue <= 0.00 && attrPowerValue >= -3.00) {
                                result = logicValues[1];
                                console.log("result*****"+logicValues[1])
                            }
                        }
                        break;
                    }
                case "R2":
                case "R11":
                case "R21":
                case "R31":
                    {
                        console.log("4444444444444444")
                        if (hasCylinderValue) {
                            if (sumPowerCylinderValue >= 0.00 && sumPowerCylinderValue <= 3.00) {
                                result = logicValues[1];
                            }
                        } else {
                            if (attrPowerValue >= 0.00 && attrPowerValue <= 3.00) {
                                result = logicValues[1];
                            }
                        }
                        break;
                    }
                case "R3":
                case "R22":
                    {
                        console.log("5555555555555555")
                        if (hasCylinderValue) {
                            if (sumPowerCylinderValue <= -3.25 && sumPowerCylinderValue >= -4.00) {
                                result = logicValues[1];
                            }
                        } else {
                            if (attrPowerValue <= -3.25 && attrPowerValue >= -4.00) {
                                result = logicValues[1];
                            }
                        }
                        break;
                    }
                case "R4":
                case "R23":
                    {
                        console.log("6666666666666666666666")
                        if (hasCylinderValue) {
                            if (sumPowerCylinderValue >= 3.25 && sumPowerCylinderValue <= 4.00) {
                                result = logicValues[1];
                            }
                        } else {
                            if (attrPowerValue >= 3.25 && attrPowerValue <= 4.00) {
                                result = logicValues[1];
                            }
                        }
                        break;
                    }
                case "R12":
                case "R32":
                    {
                        console.log("77777777777777777777777")
                        if (hasCylinderValue) {
                            if (sumPowerCylinderValue < -3.00) {
                                result = logicValues[1];
                            }
                        } else {
                            if (attrPowerValue < -3.00) {
                                result = logicValues[1];
                            }
                        }
                        break;
                    }
                case "R13":
                case "R33":
                    {
                        console.log("88888888888888888888888")
                        if (hasCylinderValue) {
                            if (sumPowerCylinderValue > 3.00) {
                                result = logicValues[1];
                            }
                        } else {
                            if (attrPowerValue > 3.00) {
                                result = logicValues[1];
                            }
                        }
                        break;
                    }
                case "R5":
                case "R24":
                    {
                        console.log("999999999999999999")
                        if (hasCylinderValue) {
                            if (sumPowerCylinderValue < -4.00) {
                                result = logicValues[1];
                            }
                        } else {
                            if (attrPowerValue < -4.00) {
                                result = logicValues[1];
                            }
                        }
                        break;
                    }
                case "R6":
                case "R25":
                    {
                        console.log("21212121212121")
                        if (hasCylinderValue) {
                            if (sumPowerCylinderValue > 4.00) {
                                result = logicValues[1];
                            }
                        } else {
                            if (attrPowerValue > 4.00) {
                                result = logicValues[1];
                            }
                        }
                        break;
                    }
            }
        }
    }
    console.log("^^^^^^^^^^^^^^^"+result)
    return result;
}
 
 
function getExcludedPackage( logicData,  attrPowerValue,  hasCylinderValue,  sumPowerCylinderValue) {
    var result = "";
    var logicValues = [];
     logicValues = logicData.split("=");
    if (logicValues?.length == 2 && logicValues[0] != "" && logicValues[1] != "") {
        switch (logicValues[0]) {
            case "L1": {
                if (hasCylinderValue) {
                    if (sumPowerCylinderValue >= -8.0) {
                        result = logicValues[1];
                    }
                } else {
                    if (attrPowerValue >= -6.00) {
                        result = logicValues[1];
                    }
                }
 
                break;
            }
            case "L2": {
                if (hasCylinderValue) {
                    if (sumPowerCylinderValue <= 6.0) {
                        result = logicValues[1];
                    }
                } else {
                    if (attrPowerValue <= 6.00) {
                        result = logicValues[1];
                    }
                }
 
                break;
            }
            case "L10": {
 
                if (hasCylinderValue) {
                    if (sumPowerCylinderValue >= -6.0) {
                        result = logicValues[1];
                    }
                } else {
                    if (attrPowerValue >= -6.00) {
                        result = logicValues[1];
                    }
                }
                break;
            }
            case "L11": {
                if (hasCylinderValue) {
                    if (sumPowerCylinderValue <= 4.0) {
                        result = logicValues[1];
                    }
                } else {
                    if (attrPowerValue <= 4.00) {
                        result = logicValues[1];
                    }
                }
                break;
            }
            case "L12": {
                if (hasCylinderValue) {
                    if (sumPowerCylinderValue <= -6.00 && sumPowerCylinderValue <= -8.00) {
                        result = logicValues[1];
                    }
                } else {
                    if (attrPowerValue >= -6.00) {
                        result = logicValues[1];
                    }
                }
                break;
            }
            case "L13": {
                if (hasCylinderValue) {
                    if (sumPowerCylinderValue > 4.00 && sumPowerCylinderValue <= 6.00) {
                        result = logicValues[1];
                    }
                } else {
                    if (attrPowerValue > 4.00 && attrPowerValue <= 6.00) {
                        result = logicValues[1];
                    }
                }
                break;
            }
            case "L20": {
                if (hasCylinderValue) {
                    if (sumPowerCylinderValue <= -8.00) {
                        result = logicValues[1];
                    }
                } else {
                    if (attrPowerValue <= -6.00) {
                        result = logicValues[1];
                    }
                }
                break;
            }
            case "L21": {
                if (hasCylinderValue) {
                    if (sumPowerCylinderValue >= 0.00) {
                        result = logicValues[1];
                    }
                } else {
                    if (attrPowerValue >= 0.00) {
                        result = logicValues[1];
                    }
                }
                break;
            }
            case "L22": {
                if (hasCylinderValue) {
                    if (sumPowerCylinderValue <= -8.00) {
                        result = logicValues[1];
                    }
                } else {
                    if (attrPowerValue <= -6.00) {
                        result = logicValues[1];
                    }
                }
                break;
            }
            case "L23": {
                if (hasCylinderValue) {
                    if (sumPowerCylinderValue <= 4.00) {
                        result = logicValues[1];
                    }
                } else {
                    if (attrPowerValue <= 4.00) {
                        result = logicValues[1];
                    }
                }
                break;
            }
            case "L30": {
                if (hasCylinderValue) {
                    if (sumPowerCylinderValue >= -8.00) {
                        result = logicValues[1];
                    }
                } else {
                    if (attrPowerValue <= 6.00) {
                        result = logicValues[1];
                    }
                }
                break;
            }
            case "L31": {
                if (hasCylinderValue) {
                    if (sumPowerCylinderValue <= 4.00) {
                        result = logicValues[1];
                    }
                } else {
                    if (attrPowerValue <= 4.00) {
                        result = logicValues[1];
                    }
                }
                break;
            }
            case "L32": {
                if (hasCylinderValue) {
                    if (sumPowerCylinderValue >= -8.00) {
                        result = logicValues[1];
                    }
                } else {
                    if (attrPowerValue >= -6.00) {
                        result = logicValues[1];
                    }
                }
                break;
            }
            case "L33": {
                if (hasCylinderValue) {
                    if (sumPowerCylinderValue > 4.00 && sumPowerCylinderValue <= 6.00) {
                        result = logicValues[1];
                    }
                } else {
                    if (attrPowerValue > 4.00 && attrPowerValue <= 6.00) {
                        result = logicValues[1];
                    }
                }
                break;
            }
    }
 
}
    return result;
}
export const checkForError =(sphereLeft,sphereRight,cylinderLeft,cylinderRight)=> {
 console.log("inside the error  function", sphereLeft,sphereRight,cylinderLeft,cylinderRight)
    var error = false;
   
    if (parseFloat(sphereRight?.Value) > 0.00 && (parseFloat(sphereRight?.Value) + parseFloat(cylinderRight.Value)) > 8.00) {
       // AppUtil.Logs("presc error new", "4");
        error = true;
      console.log("************1")
         return  error1;
    }
 
    if (parseFloat(sphereRight?.Value) > 0.00 && (parseFloat(sphereRight?.Value) + parseFloat(cylinderLeft?.Value)) > 8.00) {
       // AppUtil.Logs("presc error new", "4");
        error = true;
       console.log("************2")
       return  error1;

    }
 
    if (sphereRight?.Value!=null && sphereRight?.Value !=null && !isEqualToDash(sphereRight?.Value) && !isEqualToDash(sphereRight?.Value)) {
     //   console.log("************INNNNNNN")
    if (parseFloat(sphereRight?.Value) > parseFloat(sphereRight?.Value)) {
        var d = parseFloat(sphereRight?.Value)-parseFloat(sphereRight?.Value);
        if (d>5){
            error = true;
           console.log("************3")
           return error2;

        }
    } else if (parseFloat(sphereRight?.Value) > parseFloat(sphereRight?.Value)) {
        var d = parseFloat(sphereRight?.Value)-parseFloat(sphereRight?.Value);
        if (d>5){
            error = true;
       console.log("************4set err")
       return  error2;

        }
    }
    }
 
    if (cylinderLeft?.Value!=null && cylinderRight.Value !=null &&!isEqualToDash(cylinderLeft?.Value) && !isEqualToDash(cylinderRight.Value)){
        if (((parseFloat(cylinderLeft?.Value)>0) && (parseFloat(cylinderRight.Value)<0)) || ((parseFloat(cylinderLeft?.Value)<0) && (parseFloat(cylinderRight.Value)>0))) {
            error = true;
           console.log("************5")
            return error3;
        }
    }
 
    return error;
}
const isEqualToDash=(str)=> {
    const compareValue = str?.localeCompare("---")
    if(compareValue ==0)
    return true;
    else
    return false;
 
}
 
 
 