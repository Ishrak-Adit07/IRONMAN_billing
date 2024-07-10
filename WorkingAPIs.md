# Working API Endpoints

## User

### Register User
- **Endpoint:** `http://localhost:4000/api/user/register`
- **Method:** `POST`
- **Body:**
  ```json
  {
    "name": "Jon Snow",
    "password": "jonsnow"
  }

### Login User
- **Endpoint:** `http://localhost:4000/api/user/login`
- **Method:** `POST`
- **Body:**
  ```json
  {
    "name": "Jon Snow",
    "password": "jonsnow"
  }

### Delete User
- **Endpoint:** `http://localhost:4000/api/user/delete`
- **Method:** `DELETE`
- **Body:**
  ```json
  {
    "name": "Jon Snow",
  }


## Product

### Get Product by Name and Type
- **Endpoint:** `http://localhost:4000/api/product/get/:name/:type`
- **Method:** `GET`
- **Parameters:**
  - `name` (string): The name of the product
  - `type` (string): The type of the product

### Get Products by Name
- **Endpoint:** `http://localhost:4000/api/product/name/:name`
- **Method:** `GET`
- **Parameters:**
  - `name` (string): The name of the product

### Get Products by Type
- **Endpoint:** `http://localhost:4000/api/product/type/:type`
- **Method:** `GET`
- **Parameters:**
  - `type` (string): The type of the product

### Add Product
- **Endpoint:** `http://localhost:4000/api/product/add`
- **Method:** `POST`
- **Body:**
  ```json
  {
    "name": "Product Name",
    "type": "Product Type",
    "price": 100,
    "description": "Product Description"
  }

### Edit Product Price
- **Endpoint:** `http://localhost:4000/api/product/price`
- **Method:** `PUT`
- **Body:**
  ```json
  {
    "name": "Product Name",
    "type": "Product Type",
    "newPrice": 100
  }

### Delete Product
- **Endpoint:** `http://localhost:4000/api/product/delete`
- **Method:** `DELETE`
- **Body:**
  ```json
  {
    "name": "Product Name",
    "type": "Product Type",
  }

## Bill

### Get All Bills
- **Endpoint:** `http://localhost:4000/api/bill/get`
- **Method:** `GET`

### Get Bill By ID
- **Endpoint:** `http://localhost:4000/api/bill/get/id/:id`
- **Method:** `GET`
- **Parameters:**
  - `id` (string): The id of the bill

### Get Bills By Employee
- **Endpoint:** `http://localhost:4000/api/bill/get/employee/:employee`
- **Method:** `GET`
- **Parameters:**
  - `employee` (string): The employee of the bills

### Get Bills By Client
- **Endpoint:** `http://localhost:4000/api/bill/get/client/:client`
- **Method:** `GET`
- **Parameters:**
  - `client` (string): The client of the bills

### Delete Bill
- **Endpoint:** `http://localhost:4000/api/bill/delete`
- **Method:** `DELETE`
- **Body:**
  ```json
  {
    "id": "Bill id",
  }

### These last two are ready yet

### Get Bills Of A Certain Date
- **This is not ready yet**
- **Endpoint:** `http://localhost:4000/api/bill/get/date`
- **Method:** `POST`
- **Body:**
  ```json
  {
    "name": "Product Name",
    "type": "Product Type",
    "price": 100,
    "description": "Product Description"
  }

### Get All Bills Within Two Dates
- **This is not ready yet**
- **Endpoint:** `http://localhost:4000/api/bill/get/dates`
- **Method:** `POST`
- **Body:**
  ```json
  {
    "name": "Product Name",
    "type": "Product Type",
    "price": 100,
    "description": "Product Description"
  }

