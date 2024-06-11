## About

- **ExitPro** is a student entry and exit management system designed for the main gate of IIIT Una. The system includes an **Android application developed in Java** and a **server-side component built with Node.js**. ExitPro streamlines the process of tracking student movements, enhancing security and efficiency. The application allows students to register their entries and exits seamlessly, while the server manages and records this data. This project integrates various technologies through APIs, providing a practical solution to a real-world problem faced by the institute. **The refactoring and testing of the product is still ongoing**. ExitPro is currently in the process of official adoption by IIIT Una.

## Prerequisites

- Node.js installed on your machine.
- `npm` (Node Package Manager) installed on your machine.

## Setup

1. **Install dependencies:**

   ```bash
   npm install
   ```

## Packages used (essential only)

    "body-parser": "^1.20.2",
    "date-fns": "^3.6.0",
    "dotenv": "^16.4.5",
    "express": "^4.19.2",
    "mongoose": "^8.4.0",
    "node-cron": "^3.0.3",
    "nodemailer": "^6.9.13",
    "nodemon": "^3.1.2",
    "twilio": "^5.1.0"

## Running the Server

1. **Start the server:**

   ```bash
   node server.js
   ```

   The server will start running on port 3000.

## Unit testing

1. **Running all the jest test files(./__tests__/):**

   ```bash
   npm run test
   ```

## API Endpoint

### Fight Endpoint

- **URL:** `/fight`
- **Method:** `POST`
- **Content-Type:** `application/json`

**Sample Request Body:**

```json
{
  "player1": {
    "playerNumber": 1,
    "health": 50,
    "strength": 5,
    "attack": 10
  },
  "player2": {
    "playerNumber": 2,
    "health": 100,
    "strength": 10,
    "attack": 5
  }
}
```

**Sample Response Body:**

```json
{
  "result": "Player 1 wins!"
}
```
