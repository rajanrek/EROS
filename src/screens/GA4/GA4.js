import React, { useEffect, useState } from "react";
import analytics from '@react-native-firebase/analytics';

const GA4=(eventName, data, category1, category2)=>{
    // const [dataGA, setData] = useState({});

  // console.log("ga4 eventName data=================>",eventName);
  

    switch (eventName) {
      
        case "view_item_list":
          {
            var newData = {
                item_list_id:"related_products",
                item_list_name:"Related products",
                items: []
            }
            data.map((item,index)=>{
                var gaData = 
                    {
                    item_id:item.ID,
                    item_name:item.Name,
                    affiliation:"FGC UK Website Google Merchandise Store",
                    currency:"GBP",
                    index:index,
                    item_brand:item.BrandName,
                    item_category:category1,
                    item_category2:category2,
                    item_list_name:"Related Products",
                    price:item.Price,
                    quantity:1
                    }
                
                    newData.items.push(gaData);
            
            })

            analytics().logEvent(eventName,newData)
            .then(() => console.log('Custom event sent to GA4====='))
            .catch(error => console.error('Error sending custom event:', error));

            break;
          }

          case "view_item":
            {
              var newData = {
                currency: "GBP",
                value:parseFloat(data.Price),
                  items: [
                    {
                        item_list_id:"related_products",
                        item_list_name:"Related products",
                        item_id:data.BrandID,
                        item_name:data.Name,
                        affiliation:"FGC UK Website Google Merchandise Store",
                        index:1,
                        item_brand:data.BrandName,
                        item_category:data.ProductCategoryName,
                        item_category2:data.ProductCategoryName,
                        item_list_name:"Related Products",
                        price:data.Price,
                        quantity:1
                    }
                  ]
              }
                analytics().logEvent(eventName,newData)
                .then(() => console.log('Custom event sent to GA4====='))
                .catch(error => console.error('Error sending custom event:', error));

              break;
            }

            case "view_cart":
            {
              var newData = {
                currency: "GBP",
                value:parseFloat(data.BasketItem.BasketTotalText.replace('£','')),
                  items: []
              }
              data?.BasketItem?.Items?.map((item, index)=>{
                console.log("view cart ga 4=====",item);
                var gaData =  {
                        
                    item_id:item.ProductID,
                    item_name:item.ProductName,
                    affiliation:"FGC UK Website Google Merchandise Store",
                    index:index,
                    item_brand:'',
                    item_category:item.CategoryName,
                    item_category2:item.CategoryName,
                    item_list_name:"Related Products",
                    price:item.TotalPrice,
                    quantity:item.Quantity
                }

                newData.items.push(gaData);

              })
                analytics().logEvent(eventName,newData)
                .then(() => console.log('Custom event sent to GA4====='))
                .catch(error => console.error('Error sending custom event:', error));
                // console.log("view_cart========")

              break;
            }

            case "add_to_cart":
                {
                    var newData = {
                      currency: "GBP",
                      value:parseFloat(data.Price),
                        items: [
                          {
                              item_list_id:"related_products",
                              item_list_name:"Related products",
                              item_id:data.BrandID,
                              item_name:data.Name,
                              affiliation:"FGC UK Website Google Merchandise Store",
                              index:1,
                              item_brand:data.BrandName,
                              item_category:data.ProductCategoryName,
                              item_category2:data.ProductCategoryName,
                              item_list_name:"Related Products",
                              price:data.Price,
                              quantity:1
                          }
                        ]
                    }
                      analytics().logEvent(eventName,newData)
                      .then(() => console.log('Custom event sent to GA4====='))
                      .catch(error => console.error('Error sending custom event:', error));
      
                    break;
                  }

                  case "remove_from_cart":
                    {
                      var newData = {
                        currency: "GBP",
                        value:parseFloat(data.BasketItem.BasketTotalText.replace('£','')),
                          items: []
                      }
                      data?.BasketItem?.Items?.map((item, index)=>{
                        console.log("view cart ga 4=====",item);
                        var gaData =  {
                                
                            item_id:item.ProductID,
                            item_name:item.ProductName,
                            affiliation:"FGC UK Website Google Merchandise Store",
                            index:index,
                            item_brand:'',
                            item_category:item.CategoryName,
                            item_category2:item.CategoryName,
                            item_list_name:"Related Products",
                            price:item.TotalPrice,
                            quantity:item.Quantity
                        }
        
                        newData.items.push(gaData);
        
                      })
                        analytics().logEvent(eventName,newData)
                        .then(() => console.log('Custom event sent to GA4====='))
                        .catch(error => console.error('Error sending custom event:', error));
                        // console.log("view_cart========")
        
                      break;
                    }

                    case "begin_checkout":
                    {
                      var newData = {
                        currency: "GBP",
                        value:parseFloat(data.BasketItem.BasketTotalText.replace('£','')),
                          items: []
                      }
                      data?.BasketItem?.Items?.map((item, index)=>{
                        console.log("view cart ga 4=====",item);
                        var gaData =  {
                                
                            item_id:item.ProductID,
                            item_name:item.ProductName,
                            affiliation:"FGC UK Website Google Merchandise Store",
                            index:index,
                            item_brand:'',
                            item_category:item.CategoryName,
                            item_category2:item.CategoryName,
                            item_list_name:"Related Products",
                            price:item.TotalPrice,
                            quantity:item.Quantity
                        }
        
                        newData.items.push(gaData);
        
                      })
                        analytics().logEvent(eventName,newData)
                        .then(() => console.log('Custom event sent to GA4====='))
                        .catch(error => console.error('Error sending custom event:', error));
                        // console.log("view_cart========")
        
                      break;
                    }

                    case "purchase":
                        {
                          var newData = {
                            transaction_id:category1,
                            value: parseFloat(data?.BasketSummary?.BasketSubTotalText?.replace('£','')),
                            tax: .00,
                            shipping: parseFloat(data?.BasketSummary?.ShippingCostText?.replace('£','')),
                            currency: "GBP",
                            coupon: data?.BasketSummary?.CouponCode,
                              items: []
                          }
                          data?.BasketItem?.Items?.map((item, index)=>{
                            console.log("view cart ga 4=====",item);
                            var gaData =  {
                                    
                                item_id:item.ProductID,
                                item_name:item.ProductName,
                                affiliation:"FGC UK Website Google Merchandise Store",
                                index:index,
                                item_brand:'',
                                item_category:item.CategoryName,
                                item_category2:item.CategoryName,
                                item_list_name:"Related Products",
                                price:item.TotalPrice,
                                quantity:item.Quantity
                            }
            
                            newData.items.push(gaData);
            
                          })
                            analytics().logEvent(eventName,newData)
                            .then(() => console.log('Custom event sent to GA4===== purchase'))
                            .catch(error => console.error('Error sending custom event:', error));
                            console.log("Purchase=======>=>=>=>",category1);
            
                          break;
                        }
        }

   
    console.log("GA4===========>",newData);
    
}

export default GA4;