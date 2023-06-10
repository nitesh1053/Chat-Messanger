# Chat-Messanger

# Problem Statement
Develop the backend of a Social Network Application using Node.js and other helpful technologies.

# Libraries Used: 

1 "bcrypt": (to encryt the password)

2 "dotenv": (to use appropriate envirnment while running the code)

3 "express": (to handle HTTP requests)

4 "jsonwebtoken": (to create & verify the jwt token for authentication in middleware)

5 "mongoose": (Database)

6 "nodemon": (to monitor changes in source code and automatically)

7 restart the application if any changes detected)

8 "socket.io": (to handle real-time communication)

9 "underscore": (to manipulate and iterate over data easily)


# Functionalities:- 

# 1.Signup:-

check for email id added at front end & backend both

an additional checkbox for marking profile private which will be unchecked by default all fields are compulsory at signup page

password is being encrypted using bcrypt library of Node.js.

# 2.Login:-

email and password should be correct

jwt-token is created and send in response of login API (if successful) and this token is send in every other request header as authorization.

# 3.Profile:-

User can update the profile( also can change - private to public or public to private )

user can change the password

User can see the full Profile of other users with whom he/she is chatting/talking only if their account is not private.

# 4.Messanger: -

API’s are mentioned above to to store the messages in the Database. have the option of searching for users by name/email/phone

socket.io is used for real time communication

# 5.Middlewares:- 

Auth middleware is applied on every route except signup and login route.

jwt-token for verification is created after login and will be send in response of login api.




# How to use code:- 

Download project as zip or git clone https://github.com/nitesh1053/Chat-Messanger.git

Project Initialize


# Opening Assingment folder


# To Run the Backend/Server code:-

cd Backend

npm i/ npm install (to install all the required libraries)

node index.js


# Now to run the frontend:-

 cd Frontend
 
 npm i / npm install
 
 npm run start

  
  

