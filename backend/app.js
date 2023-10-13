import createError from 'http-errors';
import express from 'express';
import cookieParser from 'cookie-parser';
import logger from 'morgan';
import {admin, signInWithEmailAndPassword} from "./firebase.js"
import nodemailer from "nodemailer"
import google from 'google-auth-library'
import fs from 'fs'
import readline from 'readline'
import bodyParser from 'body-parser';
import cors from 'cors';

var app = express();

// view engine setup
//app.set('views', path.join(__dirname, 'views'));
//app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
//app.use(express.static(path.join(__dirname, 'public')));

//Middleware
//app.use(bodyParser.json())
//app.use(cors())

//useful functions
function isAuthenticated(req, res, next) {
  const user = req.user; // This should be set when the user is authenticated
  if (!user) {
    return res.status(401).json({ message: 'Unauthorized' });
  }
  req.user = user;
  next();
}

var credentials = JSON.parse(fs.readFileSync('google_client_secret.json')).web 
const oAuth2Client = new google.OAuth2Client(
  credentials.client_id,
  credentials.client_secret,
  credentials.redirect_uri,
);

oAuth2Client.setCredentials({
  refresh_token: credentials.refresh_token,
});
const accessToken = await oAuth2Client.getAccessToken();

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    type: 'OAuth2',
    user: 'inazuma.staff.00@gmail.com',
    pass: credentials.password,
    clientId: credentials.client_id,
    clientSecret: credentials.client_secret,
    refreshToken: credentials.refresh_token,
    accessToken: accessToken,
  },
});

//API endpoints
app.post('/api/login', async(req, res) => {
  try{
  var credentials = req.body;
  console.log(credentials)
  console.log(typeof credentials)
  console.log(credentials.email)
  console.log(credentials.password)



  // Authenticate the user with Firebase Authentication
  signInWithEmailAndPassword(credentials.email, credentials.password).then((user)=>{
    //The promise sends me a user object, now I get the token, and refresh it by sending true (obviously another promise)            
    user.getIdToken(true).then((token)=>{
      rsp.writeHead(200, {"Content-Type": "application/json"});
      rsp.end(JSON.stringify({token:token}));
    }).catch((err)=>{
      rsp.writeHead(500, {"Content-Type": "application/json"});
      rsp.end(JSON.stringify({error:err}));
    })
  }).catch(function(error) {
  // Handle Errors here.
  var errorCode = error.code;
  var errorMessage = error.message;
  console.log(error);
  if (errorCode === 'auth/wrong-password') {
    alert('Wrong password.');
    res.status(401).json({ message: 'Wrong credentials' });
  } else {
    alert(errorMessage);
    res.status(401).json({ message: 'Authentication failed' });
  }
  return;
  });

  // For security, it's recommended to use a library like bcrypt to hash and compare passwords.

  // Return the token to the client
  res.status(200).json({ message: 'Login successful'});
  } catch (error) {
    console.error('Error during login:', error);
    res.status(401).json({ message: 'Login failed', error: error.message });
  }
})
/* POST signup api */
app.post('/api/signup', async(req, res) => {
try {
  var user = req.body;
  console.log(user)
  console.log(typeof user )

  // Register the user with Firebase api
  var userRecord = await admin.auth().createUser(
    {
      username: user.username,
      email: user.email,
      emailVerified: false,
      password: user.password,
      phoneNumber: user.phonenumber,
      birthDate: user.birthdate,
    }
  )
  console.log("User created with uid:", userRecord.uid);

  // Send verification email
  const emailVerificationLink = `https://localhost:3000/verify?token=${userRecord.emailVerificationToken}`;
  const mailOptions = {
    from: 'inazuma.staff.00@gmail.com',
    to: userRecord.email,
    subject: 'Email Verification',
    text: `Please click the following link to verify your email: ${emailVerificationLink}`,
  };

  await transporter.sendMail(mailOptions);
  res.status(200).send('Verification email sent successfully');

} catch (error) {
  console.error('Error during registration:', error);
  res.status(401).json({ message: 'Registration failed', error: error.message });
}
})
app.use('/api/user-info', isAuthenticated, async(req, res) => {
  // Retrieve user data from Firebase or your database
  const userData = {
    id: req.user.uid, // Firebase user ID
    email: req.user.email,
    // Add more user-specific data here
  };

  res.json(userData);
});

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

export { app } 
