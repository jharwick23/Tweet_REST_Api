# Tweet REST API

This project is a class assignment focused on practicing the creation of REST APIs using Node.js and Express.

## Prerequisites

Before you begin, ensure you have the following installed on your system:
- **Node.js**
- **npm** (comes bundled with Node.js)

## Installation

1. **Install Dependencies**
   ```sh
   npm install
   ```

## Running the Server

Start the API server with:
   ```sh
   node main.js
   ```

By default, the server will run on `http://localhost:3000/`.

## Available Endpoints

### Get All Tweets
   ```sh
   GET /tweets
   ```
   Fetches all tweets with creation date, id, and text.
   
### Get All Tweets External Links
   ```sh
   GET /external-links
   ```
   Fetches all tweets external dates grouped by id.

### Get Specific Tweets by ID
   ```sh
   GET /tweets/:id
   ```
   Fetches tweets by id and provides creation date, tweet, and user screen name.

### Get User Profile
   ```sh
   GET /user/:screenName
   ```
   Fetches Twitter user profile information (location, description, followers count, and friends count) based on the provided screen name.

### Example Request
   Using Postman input
   ```
   http://localhost:3000/user/timoreilly
   ```

### Example Response
   ```json
   {
     "screen_name": "timoreilly",
     "location": "Sebastopol, CA",
     "description": "Founder and CEO, O'Reilly Media. Watching the alpha geeks, sharing their stories, helping the future unfold.",
     "followers_count": 1679016,
     "friends_count": 1012
   }
   ```

## Notes
- Ensure that **Node.js and npm** are installed before running `npm install`.
- Modify the port in `main.js` if needed.
- The API fetches Twitter user data from a provided JSON file and filters it accordingly.

