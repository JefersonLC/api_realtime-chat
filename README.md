# API Realtime Chat

This is the backend of a project about a real-time chat application that uses the MERN stack.

## How to Install and Run

To run the application, follow these steps:

1. Clone the repository or download it as a ZIP file.
2. In a terminal, navigate to the folder where the application is located.
3. Run the `npm install` command to install all the necessary dependencies.
4. Run the `npm run dev` command to start the application in development mode.
5. Open your browser and navigate to `http://localhost:3000` to use the calculator.

## Environment

Before running the application it is necessary to configure the environment variables

```javascript
// .env

PORT=3000

DATABASE_URL='mysql://root:admin@localhost:3306/mydb'

GOOGLE_CLIENT_ID=/* Your Google client id */
GOOGLE_CLIENT_SECRET=/* Your Google client secret */
GOOGLE_CALLBACK_URL='http://localhost:3000/api/auth/google/callback'

SECRET_KEY='MyS3creTK3y'

CLIENT_APP_URL='http://localhost:5173/'
```

## Enpoints

<center>

| Method | Endpoint                        | Description                                                                                                                                                                               |
| ------ | ------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `GET`  | **_/api/auth/google_**          | Returns the page to select the google account.                                                                                                                                            |
| `GET`  | **_/api/auth/google/callback_** | Redirects to our client application sending the authentication token as query parameter.                                                                                                  |
| `GET`  | **_/api/profile_**              | Requires an authentication token.<br> Returns the session data of the authenticated user.                                                                                                 |
| `GET`  | **_/api/messages_**             | Requires an authentication token.<br> Returns all messages registered in the database.<br> You can send the query parameters `limit` and `offset` for pagination, but it is not required. |
| `POST` | **_/api/messages_**             | Requires an authentication token.<br>Creates a message and returns it.                                                                                                                    |

</center>

## Contributions

I appreciate contributions and suggestion to improve my API.
If you have any ideas or encounter any issues, feel free to open an issue or submit a pull request.
