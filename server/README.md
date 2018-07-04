# API documentation




**1. Create User**
----
  Create a user.

* **URL**

  /user/createUser

* **Method:**

  `POST`
  
*  **URL Params**

  None

* **Data Params**

  None

* **Request Payload**

  `requestPayload` = `{"Name":"test1","Description":"erfew","Profile_photo_url":"xyz.jpg","CoatsAndJacketBudget":"100","DressesBudgets":"100","TrousersAndSkirtsBudget":"200","TopsBudget":"150","user_type":"Standard","ShoesAndBagsBudget":"150","ShopCategoriesID1":1,"ShopCategoriesID2":2,"ShopCategoriesID3":3,"ShopCategoriesID4":4}`

* **Success Response:**

  * **Code:** 200 <br />
    **Content:** ```{
    "status": 1,
		"data": {
        "id": 19,
        "Name": "test1",
        "Description": "erfew",
        "Profile_photo_url": "xyz.jpg",
        "CoatsAndJacketBudget": "100",
        "DressesBudgets": "100",
        "TrousersAndSkirtsBudget": "200",
        "TopsBudget": "150",
        "user_type": "Standard",
        "ShoesAndBagsBudget": "150",
        "ShopCategoriesID1": 1,
        "ShopCategoriesID2": 2,
        "ShopCategoriesID3": 3,
        "ShopCategoriesID4": 4,
        "updatedAt": "2018-07-03T11:25:38.160Z",
        "createdAt": "2018-07-03T11:25:38.160Z"
    }
}```
 
* **Error Response:**

  * **Code:** 400 BAD REQUEST <br />
    **Content:** `{ error :1, message: "User already exist" }`

* **Sample Call:**

  ```javascript
    $.ajax({
      url: "/user/createUser",
      dataType: "application/json",
      type : "POST",
      data: `requestPayload`,
      success : function(r) {
        console.log(r);
      }
    });
  ```



 **2. Show All Users**
----

 Shows all the users in an array of Json.

* **URL**

  /user/getAllusers

* **Method:**

  `GET`
  
*  **URL Params**

  None

* **Data Params**

  None

* **Success Response:**

  * **Code:** 200 <br />
    **Content:** ```{
    "status": 1,
    "data": [{
            "id": 13,
            "Name": "test2",
            "Description": "test2",
            "Profile_photo_url": "https://static.licdn.com/scds/common/u/images/themes/katy/ghosts/person/ghost_person_200x200_v1.png",
            "CoatsAndJacketBudget": null,
            "DressesBudgets": null,
            "TrousersAndSkirtsBudget": null,
            "TopsBudget": null,
            "user_type": null,
            "ShoesAndBagsBudget": null,
            "ShopCategoriesID1": null,
            "ShopCategoriesID2": 9,
            "ShopCategoriesID3": 6,
            "ShopCategoriesID4": 4,
            "ShopCategoriesID5": 8,
            "createdAt": "2018-06-05T10:26:05.000Z",
            "updatedAt": "2018-06-05T10:26:05.000Z"
        }]```
 
* **Error Response:**

  * **Code:** 400 BAD REQUEST <br />
    **Content:** `{ error :1, message: "<some db error default message>" }`

* **Sample Call:**

  ```javascript
    $.ajax({
      url: "/user/getAllusers",
      dataType: "application/json",
      type : "GET",
      success : function(r) {
        console.log(r);
      }
    });
  ```



 **3. Update User profile**
----

 Updates the profile of a particular user by his ID.

* **URL**

  /user/updateUser

* **Method:**

  `PUT`
  
*  **URL Params**

  None

* **Data Params**

  None

* **Request Payload**

  **Required:**
 
   `id=[integer]`

  `requestPayload` = `{"id":1, Name":"test1","Description":"erfew","Profile_photo_url":"xyz.jpg","CoatsAndJacketBudget":"100","DressesBudgets":"100","TrousersAndSkirtsBudget":"200","TopsBudget":"150","user_type":"Standard","ShoesAndBagsBudget":"150","ShopCategoriesID1":1,"ShopCategoriesID2":2,"ShopCategoriesID3":3,"ShopCategoriesID4":4}`

* **Success Response:**

  * **Code:** 200 <br />
    **Content:** ```{
    "status": 1,
    "data": [
        1
    ]
}```
 
* **Error Response:**

  * **Code:** 400 BAD REQUEST <br />
    **Content:** `{ error :1, message: "<some default error from db>" }`

* **Sample Call:**

  ```javascript
    $.ajax({
      url: "/user/updateUser",
      dataType: "application/json",
      type : "PUT",
      data: `requestPayload`,
      success : function(r) {
        console.log(r);
      }
    });
  ```




 **4. Delete a User**
----

 Delete a user by the ID.

* **URL**

  /user/deleteUser/:id

* **Method:**

  `DELETE`
  
*  **URL Params**


*  **Required:**
 
   `id=[integer]`

* **Data Params**

  None

* **Success Response:**

  * **Code:** 200 <br />
    **Content:** `{"status": 1,"data": 1}`
 
* **Error Response:**

  * **Code:** 400 BAD REQUEST <br />
    **Content:** `{ error :1, message: "<some db error default message>" }`

* **Sample Call:**

  ```javascript
    $.ajax({
      url: "/user/deleteUser/1",
      dataType: "application/json",
      type : "DELETE",
      success : function(r) {
        console.log(r);
      }
    });
  ```


**5. Show a User by id**
----

* **URL**

  /user/getUserById/:id

* **Method:**

  `GET`
  
*  **URL Params**

*  **Required:**
 
   `id=[integer]`

* **Data Params**

  None

* **Success Response:**

  * **Code:** 200 <br />
    **Content:** `{"status": 1,"data": 1}`
 
* **Error Response:**

  * **Code:** 400 BAD REQUEST <br />
    **Content:** `{ error :1, message: "<some db error default message>" }`

* **Sample Call:**

  ```javascript
    $.ajax({
      url: "/user/getUserById/1",
      dataType: "application/json",
      type : "GET",
      success : function(r) {
        console.log(r);
      }
    });
  ```



  **6. Create a NewsfeedPost**
----
  Create a newsFeedPost.

* **URL**

  /newsfeed_post/createNewsfeedPost

* **Method:**

  `POST`
  
*  **URL Params**

  None

* **Data Params**

  None

* **Request Payload**

  `requestPayload` = `{"inspirationalPhotoURL":"test.jpg","product1ID":"21","product2ID":"312","product3ID":"21","product4ID":"1212","title":"test", "userID":1}`

* **Success Response:**

  * **Code:** 200 <br />
    **Content:** ```{
    "status": 1,
    "data":
    {
        "id": 612,
        "title": "test",
        "userID": 1,
        "inspirationalPhotoURL": "test.jpg",
        "product1ID": "21",
        "product2ID": "312",
        "product3ID": "21",
        "product4ID": "1212",
        "updatedAt": "2018-07-03T12:44:27.147Z",
        "createdAt": "2018-07-03T12:44:27.147Z"
    }
}```
 
* **Error Response:**

  * **Code:** 400 BAD REQUEST <br />
    **Content:** `{ error :1, message: <some db error, default message>}`

* **Sample Call:**

  ```javascript
    $.ajax({
      url: "/newsfeed_post/createNewsfeedPost",
      dataType: "application/json",
      type : "POST",
      data: `requestPayload`,
      success : function(r) {
        console.log(r);
      }
    });
  ```

  **7. Show newsFeedPost with its user details**
----

 Shows all the newsFeedPost in an array of Json.

* **URL**

  /newsfeed_post/getNewsfeedPost/:limit/:page

* **Method:**

  `GET`
  
*  **URL Params**

*  **Required:**
 
   `limit=[integer]`
   `page=[integer]`


* **Data Params**

  None

* **Success Response:**

  * **Code:** 200 <br />
    **Content:** ```{
    "status": 1,
    "data": [
        {
            "id": 577,
            "title": "this is test 1 post :)",
            "userID": "16",
            "inspirationalPhotoURL": "https://assets.myntassets.com/h_240,q_90,w_180/v1/assets/images/2025442/2018/5/21/a8c6577e-8d97-45e9-ad10-280e72a306cc1526892861949-Biba-Women-Charcoal-Grey-Printed-Kurta-with-Churidar--Dupatta-1941526892861756-1_mini.jpg",
            "product1ID": "1",
            "product2ID": "2",
            "product3ID": "3",
            "product4ID": "4",
            "createdAt": "2018-06-23T07:14:13.000Z",
            "updatedAt": "2018-06-23T07:21:01.000Z",
            "userData":
            {
                "id": 16,
                "Name": "Kim",
                "Description": "Kim isn't real but is a user",
                "Profile_photo_url": "http://www.kimberlypearl.co/wp-content/uploads/2015/04/profile-pic-circle.gif",
            }
        }
    }
}```
 
* **Error Response:**

  * **Code:** 400 BAD REQUEST <br />
    **Content:** `{ error :1, message: "<some db error default message>" }`

* **Sample Call:**

  ```javascript
    $.ajax({
      url: "/newsfeed_post/getNewsfeedPost/1/1",
      dataType: "application/json",
      type : "GET",
      success : function(r) {
        console.log(r);
      }
    });
  ```



  **8. Update a newsFeedPost**
----

 Updates the field of a newsFeedPost

* **URL**

  /newsfeed_post/updateNewsfeedPost

* **Method:**

  `PUT`
  
*  **URL Params**

  None

* **Data Params**

  None

* **Request Payload**

  **Required:**
 
   `id=[integer]`

  `requestPayload` = `{"id":1,inspirationalPhotoURL":"test.jpg","product1ID":"21","product2ID":"312","product3ID":"21","product4ID":"1212","title":"test", "userID":19}`

* **Success Response:**

  * **Code:** 200 <br />
    **Content:** ```{
    "status": 1,
    "data": [
        1
    ]
}```
 
* **Error Response:**

  * **Code:** 400 BAD REQUEST <br />
    **Content:** `{ error :1, message: "<some default error from db>" }`

* **Sample Call:**

  ```javascript
    $.ajax({
      url: "/newsfeed_post/updateNewsfeedPost",
      dataType: "application/json",
      type : "PUT",
      data: `requestPayload`,
      success : function(r) {
        console.log(r);
      }
    });
  ```



  **9. Delete a newsFeedPost**
----

 Deletes a newsFeedPost by his ID. 

* **URL**

  /newsfeed_post/deleteNewsfeedPost/:id

* **Method:**

  `DELETE`
  
*  **URL Params**


*  **Required:**
 
   `id=[integer]`

* **Data Params**

  None

* **Success Response:**

  * **Code:** 200 <br />
    **Content:** `{"status": 1,"data": 1}`
 
* **Error Response:**

  * **Code:** 400 BAD REQUEST <br />
    **Content:** `{ error :1, message: "<some db error default message>" }`

* **Sample Call:**

  ```javascript
    $.ajax({
      url: "/newsfeed_post/deleteNewsfeedPost/1",
      dataType: "application/json",
      type : "DELETE",
      success : function(r) {
        console.log(r);
      }
    });
  ```



 **10. Show a newsFeedPost with associated products**
----

  Show a newsFeedPost with associated user and products

* **URL**

  /newsfeed_post/NewsfeedPostwithProducts/:id

* **Method:**

  `GET`
  
*  **URL Params**

*  **Required:**
 
   `id=[integer]`

* **Data Params**

  None

* **Success Response:**

  * **Code:** 200 <br />
    **Content:** ```{
    "status": 1,
    "data": {
        "id": 577,
        "title": "this is test 1 post :)",
        "userID": "16",
        "inspirationalPhotoURL": "https://assets.myntassets.com/h_240,q_90,w_180/v1/assets/images/2025442/2018/5/21/a8c6577e-8d97-45e9-ad10-280e72a306cc1526892861949-Biba-Women-Charcoal-Grey-Printed-Kurta-with-Churidar--Dupatta-1941526892861756-1_mini.jpg",
        "product1ID": "1",
        "product2ID": "2",
        "product3ID": "3",
        "product4ID": "4",
        "createdAt": "2018-06-23T07:14:13.000Z",
        "updatedAt": "2018-06-23T07:21:01.000Z",
        "products": [],
        "userData": {
            "id": 16,
            "Name": "Kim",
            "Description": "Kim isn't real but is a user",
            "Profile_photo_url": "http://www.kimberlypearl.co/wp-content/uploads/2015/04/profile-pic-circle.gif",
            "CoatsAndJacketBudget": null,
            "DressesBudgets": null,
            "TrousersAndSkirtsBudget": null,
            "TopsBudget": null,
            "user_type": null
        }
    }
}```
 
* **Error Response:**

  * **Code:** 400 BAD REQUEST <br />
    **Content:** `{ error :1, message: "<some db error default message>" }`

* **Sample Call:**

  ```javascript
    $.ajax({
      url: "/newsfeed_post/NewsfeedPostwithProducts/1",
      dataType: "application/json",
      type : "GET",
      success : function(r) {
        console.log(r);
      }
    });
  ```



**11. Create products**
----
  Create products.

* **URL**

  /products/createProducts

* **Method:**

  `POST`
  
*  **URL Params**

  None

* **Data Params**

  None

* **Request Payload**

  `requestPayload` = `{"file": "<file in multipart form data>"}`

* **Success Response:**

  * **Code:** 200 <br />
    **Content:** ```{
    "status": 1,
	"message":"success"
}```
 
* **Error Response:**

  * **Code:** 400 BAD REQUEST <br />
    **Content:** `{ error :1, message: "please upload tsv file" }`
    or 
    **Content:** `{ error :1, message: "file not recieved" }`

* **Sample Call:**

  ```javascript
    $.ajax({
      url: "/products/createProducts",
      dataType: "multipart/form-data",
      type : "POST",
      data: `requestPayload`,
      success : function(r) {
        console.log(r);
      }
    });
  ```





 **12. Search Products**
----
  Search products based on its productID.

* **URL**

  /products/searchProducts/:productID

* **Method:**

  `GET`
  
*  **URL Params**

*  **Required:**
 
  `id=[integer]`

* **Data Params**

  None

* **Success Response:**

  * **Code:** 200 <br />
    **Content:** ```{
    "status": 1,
    "data": [
        {
            "id": 252,
            "ProductID": "card-prd50",
            "Category": "Tops",
            "Subcategory": "Cardigans",
            "Colour1": "Multicoloured",
            "Colour2": "",
            "Colour3": "",
            "ProductName": "polka dot cardigan",
            "Designer": "Carolina Herrera",
            "Description": "Red and blue polka dot cardigan from Carolina Herrera.",
            "Retailer": "Farfetch",
            "Price": 1180,
            "RetailerURL": "https://www.farfetch.com/uk/shopping/women/carolina-herrera-polka-dot-cardigan-item-12044100.aspx?storeid=9982&from=listing&tglmdl=1",
            "ImageThumbnaiURL": "card-prd50.jpg",
            "ImageFullsizeURL": "http://res.cloudinary.com/dtgbbrxs0/image/upload/v1530351967/Products/card-prd50_f1ao7c.png",
            "createdAt": "2018-06-24T10:49:35.000Z",
            "updatedAt": "2018-06-30T09:46:08.000Z"
        }
    ]
}```
 
* **Error Response:**

  * **Code:** 400 BAD REQUEST <br />
    **Content:** `{ error :1, message: "<some db error default message>" }`

* **Sample Call:**

  ```javascript
    $.ajax({
      url: "/products/searchProducts/card-prd50",
      dataType: "application/json",
      type : "GET",
      success : function(r) {
        console.log(r);
      }
    });
  ```




 **13. Upload Images on Cloudinary**
----
  Upload images on cloudinary from a zip file. Image name must match with a productID to assign that image to a particular product. It upload an image to cloudinary if a matching productID is found in db else image will not get uploaded on cloudinary and returned in errors in the response.

* **URL**

  /imageProcess/uploadImage

* **Method:**

  `POST`
  
*  **URL Params**

  None

* **Data Params**

  None

* **Request Payload**

  `requestPayload` = `{"file": "<file in multipart form data>"}`

* **Success Response:**

  * **Code:** 200 <br />
    **Content:** ```{
    "status": 1,
    "data": [
        {
            "imageUrl": "http://res.cloudinary.com/dtgbbrxs0/image/upload/v1530680621/Products/card-prd50.png",
            "ProductId": "card-prd50"
        }
    ],
    "errors": [
        {
            "Pid": "4466366",
            "entry": "Test/4466366.png"
        },
        {
            "Pid": "sweat-prd112",
            "entry": "Test/sweat-prd112.png"
        }
    ]
}```
 
* **Error Response:**

  * **Code:** 400 BAD REQUEST <br />
    **Content:** `{ error :1, message: "please upload zip file" }`
    or 
    **Content:** `{ error :1, message: "file not recieved" }`

* **Sample Call:**

  ```javascript
    $.ajax({
      url: "/imageProcess/uploadImage",
      dataType: "multipart/form-data",
      type : "POST",
      data: `requestPayload`,
      success : function(r) {
        console.log(r);
      }
    });
  ```