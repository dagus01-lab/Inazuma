import createError from 'http-errors';
import express from 'express';
import cookieParser from 'cookie-parser';
import logger from 'morgan';
import {admin, signInWithEmailAndPassword} from "./firebase.js"
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

//API endpoints
app.post('/api/login', async(req, res) => {
  credentials = JSON.parse(req.body);

  // Authenticate the user with Firebase Authentication
  signInWithEmailAndPassword(credentials.email, credentials.password).catch(function(error) {
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


  // Check if the provided password is correct (You may need to implement this)
  // For security, it's recommended to use a library like bcrypt to hash and compare passwords.

  // Return the token to the client
  res.status(200).json({ message: 'Login successful'});
})
/* POST signup api */
app.post('/api/signup', async(req, res) => {
try {
  user = JSON.parse(req.body);

  // Register the user with Firebase api
  admin.auth().createUser(
    {
      username: user.username,
      email: user.email,
      emailVerified: false,
      password: user.password,
      phoneNumber: user.phonenumber,
      birthDate: user.birthdate,
    }
  ).then(function(userRecord) {
    console.log("User created with uid:", userRecord.uid);
  }).catch(function(error) {
    console.log("Error creating user:", error);
  });

  //send email for verification
  admin.auth().getUserByEmail(email).sendEmailVerification().then({
    function(){
      console.log("Email sent");
    }
  }).catch(
    function(error) {
      console.log("Error sending email:", error);
    }
  )

  // Return the token to the client
  res.status(200).json({ message: 'Registration successful', token });
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
