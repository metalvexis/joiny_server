# CATALYST
REST API Server for a Travel and Tours Hub.

# Requirements

- MongoDb
- Node
- Yarn

# Usage
To start the application

1. ` yarn install `
2. ` yarn build `
3. ` yarn start `

To generate dummy data

` yarn generate-dummies  `

Access frontend on [localhost:3000](localhost:3000)

---

# API

## Authentication

### Authenticate Guest
  * method:

    `POST`
  
  * URL:

    `api/auth/guest`

  * Body:

    ```
    {
      "username": "user@mail.com",
      "password": "password"
    }
    ```

### Authenticate Travel Agency
  * method:

    `POST`
  
  * URL:

    `api/auth/travelAgency`

  * Body:

    ```
    {
      "username": "agency@mail.com",
      "password": "password"
    }
    ```

---

## Tour Packages

### Get all Tour Packages

  * method: 
  
    `GET`

  * URL: 
      
    `api/tourPackages/allTourPackages`

### Create a Regular Tour Package
  
  * Method: 
  
    `POST`

  * URL: 
  
    `api/tourPackages/createRegularPackage`

  * Body:
  
    ```
    {
      "agencyId": "_id of agency",
      "name" : "Name of Package",
      "price" : 100,
      "details" : "Paragraph of details",
    }
    ```

### Create a Joiner Tour Package
  
  * Method:
  
    `POST`

  * URL: 
    
    `api/tourPackages/createJoinerPackage`

  * Body:
  
    ```
    {
      "agencyId": "_id of agency",
      "name" : "Name of Package",
      "price" : 100,
      "details" : "Paragraph of details",
    }
    ```

---

## Chat

### Get all chat

  * method: 
  
    `GET`

  * URL: 
      
    `api/chat/allChat`

### Send a message
  
  * Method:
  
    `POST`

  * URL: 
    
    `api/chat/sendMessage`

  * Body:
  
    ```
    {
      "agencyId": "0",
      "guestId" : "0",
      "sender" : "0", // valid values: "guest" , "travelAgency"
      "message" : "Your message
    }
    ```

---

## Guests

### Get all Guests

  * method: 
  
    `GET`

  * URL: 
      
    `api/guests/allGuests`

### Create an Account

  * method: 
  
    `POST`

  * URL: 
      
    `api/guests/createAccount`
  
  * Body:

    ```
    {
      "email": "name@mail.com",
      "username": "user",
      "password": "password",
      "firstName": "Hello",
      "lastName": "World,
      "middleName": "comma",
      "contact": "0912345123"
    }
    ```

---

## Travel Agency

### Get all Travel Agencies

  * method: 
  
    `GET`

  * URL: 
      
    `api/travelAgencies/allTravelAgencies`

### Create a Travel Agency

  * method: 
  
    `POST`

  * URL: 
      
    `api/travelAgencies/createTravelAgency`
  
  * Body:

    ```
    {
      "email": "name@mail.com",
      "password": "password",
      "contact": "0912345123"
      "name": "Name Of Agency",
      "address": "Address of Agency"
    }
    ```
