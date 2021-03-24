# mouse-presentation

## Intro

This application is a service written in Vue on the client side and Express on the server side, which can flow characters on the screen using electron.  
For example, we can display text on the screen of the presentation so that speaker and listeners can communicate.
This application can only be used on the local network.

## Install and Run
From your console, clone the repository and run the following commands:

```
npm install
copy .env.example .env
npm run build:prod
npm run serve:electron
```

The server will listen at port 3000.

Once the application is launched, the users can log in from the QR code.
The administrator's default acoount is username: admin, password: pass  
If you want to change it, please modify .env.

## If you want to Read the comment aloud
This application can also read the comments sent by users.  
To read the comment aloud, use the exeternal tools [棒読みちゃん(BouyomiChan)](https://chi.usamimi.info/Program/Application/BouyomiChan/) and [this person](https://github.com/chocoa/BouyomiChan-WebSocket-Plugin/blob/master/Plugin_WebSocket.dll) dll.  
Download BouyomiChan and dll, and put the dll in the same hierarchy as BouyomiChan.exe.  
After launching BouyomiChan, launch this application, and if you enable the setting, the comments will be read aloud.