# Node-Chat
This is a chat room app built with HTML, CSS, JavaScript, jQuery, and Node. The app allows users from any location to join a chat room and send messages to eachother in real time. A user can also share their location using the Geolocation API. The app is templated using the mustache.js library. The app uses the npm packages express, socket.io, and moment for production and the packages mocha and expect for testing.

---
 - The user is first brought to a chat login page. Here they can enter the name they would like to be displayed as and enter the name of the chat room they would like to enter or create. In this example I use my name Jacob, and decide to create a new room where I can chat with other users about Game of Thrones.
 ![LOGIN](/read_me/1-login.png)
 
 - Once the user is logged in they are brought to the chat room page. Here I am the first user logged in so on the left I am the only name displayed in the room and I am greeted with the welcome message from NodeBot.
  ![WELCOME](/read_me/2-welcome.png)

- Below is an example of a flowing conversation on the Node Chat app. The NodeBot alerts the users in the chatroom when a new user enters the chat or leaves the chat. There is also a panel on the left side of the page that displays the current users logged into the chat room.
![CONVERSATION](/read_me/3-convo.png)

- four
![SEND LOCATION](/read_me/4-send-location.png)

- five
![GOOGLE MAPS](/read_me/5-google-maps.png)
