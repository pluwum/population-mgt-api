# Population Management Application API

[![Build Status](https://travis-ci.org/pluwum/population-mgt-api.svg?branch=master)](https://travis-ci.org/pluwum/population-mgt-api) [![Coverage Status](https://coveralls.io/repos/github/pluwum/population-mgt-api/badge.svg?branch=master)](https://coveralls.io/github/pluwum/population-mgt-api?branch=master)

## What does it do

This API is Population Management System that contains a list of locations and the total number of residents in each location broken down by gender.
With this you can

- Create a new location containing data on the total number of male and female residents within it.
- List all available locations and their population summaries (total male residents, total female residents, sum total residents)
- Update data for a specific locations
- Delete a specified location

## requirements

- [Node (stable)](https://nodejs.org/en/)

- [MongoDB](https://www.mongodb.com/)

- [Postman](https://www.getpostman.com/)

- Some knowledge of terminal

## How to set it up

1. Clone the repository.

```

git clone git@github.com:pluwum/population-mgt-api.git

```

2. Install the dependencies:

```

yarn install

```

3. Set up some global variables

```

mv .env.example .env

```

4. Start you mongodb service

```

mongod & > /dev/null

```

5. Atlast, you are ready to go

```

yarn start

```

6. you can now access the application using postman

```

http://localhost:3000

```

## Testing

The application's tests can be executed by running the code below within the terminal at the application root directory:

```

yarn test

```

## Endpoints

## _Locations_

#### **\_/location**

description: Creates a Location
method : POST
headers: content-Type →application/json
sample payload:

    `{
        "name": "Nairobi",
        "female": "200",
        "male": "100"
     }`

#### **_/location_**

description: Updates location information
method : PUT
headers: content-Type →application/json
sample payload:

    `{
        "name": "Kampala"
     }`

#### **_/location_**

description: Retrieves all location information
method : GET
headers: content-Type →application/json
returns:

    `{
    "success": true,
    "data": [{
        "_id": "5c155afb60bf0f0518328497",
        "name": "Kampala",
        "female": "200",
        "male": "100",
        "parent_id": "5c155afb60bf0f0518328496"
        "created": "2018-12-15T19:50:19.775Z",
        "__v": 0
    }]

}`

#### **_/location/:locationId_**

description: Deletes a location along with fields in other locations associated to them
method : DELETE
headers: content-Type →application/json

## _User_

#### **_/user_**

description: Create a user
method : POST
headers: content-Type →application/json
sample payload:

    `{
        "name": "Patrick Alvin",
        "email": "patrick@gmail.com",
        "password": "abcdkh1233&32"
    }`

#### **_/user_**

description: Retrieves authenticated user information
method : GET
headers: content-Type →application/json
returns:

    `
    `{
        "success": true,
        "data": [
        {
            "_id": "5c162261bcaf48e17ca22c76",
            "name": "Patrick Alvin",
            "email": "patrick@gmail.com",
            "created": "2018-12-16T10:01:05.372Z",
            "__v": 0
        }
        ]
    }`

#### **_/user_**

description: Updates a User
method : PUT
headers: content-Type →application/json
sample payload:

    `{
        "name": "Jackie Chan"
    }`

## AUTHENTICATION

#### **_/authenticate_**

description: Log in the user
method : POST
headers: content-Type →application/json
sample payload:

     `{
    	"email": "patrick@gmail.com",
    	"passCode": "fhbjdafhbasfb134@"
      }`

returns

    {
        "success": true,
        "data": "eyJhpXVCJ9.eyiI6IjFTAxNjkwM30.NP79T474Yqs",
        "message": "Successfully authenticated" }
