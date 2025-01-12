<h2>Real-Time Multi-User Chat</h2>

This project is a real-time multi-user chat application that allows users to exchange messages. It is based on WebSockets to provide real-time communication, making the chat experience smooth and dynamic.


<h2>Project Setup Instructions</h2>

Follow these steps to set up and run the project:

<h3>Prerequisites</h3>

Ensure you have the following installed on your system:

* Docker
* Docker Compose

<h3>Setup Steps</h3>
<br><b>1. Clone the repository:</b>

```
git clone https://github.com/tHolubets/Multi-User-Chat.git
```

```
cd Multi-User-Chat
```


<br><b>2. Rename the environment file:</b>

Rename the .env_example file to .env


<br><b>3. Start the project:</b>

```
docker-compose up
```
<i>The backend service may take some time to start as it waits for the database to be fully operational.</i>


<br><b>4. Access the application.</b> Open your browser and navigate to:

```
http://localhost:4200
```


<br><b>5. Login to the application:</b>

Use the following default credentials to log in:

## Default Login Credentials

| User    | Username | Password |
|---------|----------|----------|
| User 1  | user1    | password |
| User 2  | user2    | password |
| User 3  | user3    | password |



<h2>Features</h2>


* Real-Time Messaging: Users can send and receive messages instantly.
* Message Content: Each message contains the text, author, and timestamp.
* System Notifications: The chat system generates notifications when a user connects or disconnects from the chat.
* Message Length Limitation: Each message is limited to 200 characters.
* Message History: The last 50 messages are loaded when a user joins the chat, and additional messages can be loaded as needed.


<h2>Interface</h2>

<h3>Login page</h3>

![Login page](https://github.com/tHolubets/Multi-User-Chat/blob/master/assets/login.png)


<h3>Chat page</h3>

![Chat page](https://github.com/tHolubets/Multi-User-Chat/blob/master/assets/chat.png)


<h3>Example of Running Containers</h3>

![Running Docker Containers](https://github.com/tHolubets/Multi-User-Chat/blob/master/assets/docker)




