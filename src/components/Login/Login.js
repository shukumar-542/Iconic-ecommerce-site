import React, { useContext, useState } from 'react';
import './Login.css';
import { initializeApp } from 'firebase/app';
import firebaseConfig from './firebase.config';
import { getAuth, GoogleAuthProvider, signInWithPopup, updateProfile, signOut, createUserWithEmailAndPassword, signInWithEmailAndPassword } from "firebase/auth";
import { userContext } from '../../App';
import { useLocation, useNavigate } from 'react-router-dom';


const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

const Login = () => {
      const navigate = useNavigate()
      const location = useLocation()
      const {from} = location.state || {from : {pathname:'/'}}

      const [loggedInUser, setloggedInUser]= useContext(userContext)

      const [signUpUser, setSignupUser] = useState(false)
      const [userInfo, setUserInfo] = useState({
            isLoggedIn: false,
            name: '',
            email: '',
            password: '',
            photo: '',
            success: false,

      })

      const handleLogOut = () => {
            const auth = getAuth();
            signOut(auth).then(() => {
                  const userSignOut = {
                        isLoggedIn: false,
                        name: '',
                        email: '',
                        photo: ''
                  }
                  setUserInfo(userSignOut)
            }).catch((error) => {
                  // An error happened.
            });
      }


      const provider = new GoogleAuthProvider();
      const handleLogin = () => {
            const auth = getAuth();
            signInWithPopup(auth, provider)
                  .then((result) => {
                        const credential = GoogleAuthProvider.credentialFromResult(result);
                        const token = credential.accessToken;
                        const user = result.user;
                        const { displayName, email, photoURL } = user;
                        const userInfo = {
                              isLoggedIn: true,
                              name: displayName,
                              email: email,
                              photo: photoURL,
                        }
                        setUserInfo(userInfo)
                        setloggedInUser(userInfo)
                        navigate(from)
                        
                  }).catch((error) => {
                        const errorCode = error.code;
                        const errorMessage = error.message;
                        console.log(errorCode, errorMessage);

                  });

      }
      const handleBlur = (e) => {
            let isFieldValid = true;
            if (e.target.name === 'email') {
                  isFieldValid = /\S+@\S+\.\S+/.test(e.target.value)

            }
            if (e.target.name === 'password') {
                  isFieldValid = e.target.value.length > 6

            }
            if (isFieldValid) {
                  const newUser = { ...userInfo }
                  newUser[e.target.name] = e.target.value;
                  setUserInfo(newUser)
            }
      }

      const handldeSubmit = (e) => {
            if (signUpUser && userInfo.name && userInfo.email) {
                  const auth = getAuth();
                  createUserWithEmailAndPassword(auth, userInfo.email, userInfo.password)
                        .then((userCredential) => {
                              // Signed in 
                              const user = userCredential.user;
                              const newUser = { ...userInfo }
                              newUser.error = false;
                              newUser.success = true;
                              setUserInfo(newUser)
                              updateUser(newUser.name)

                              console.log(user);      
                        })
                        .catch((error) => {
                              // const errorCode = error.code;
                              // const errorMessage = error.message;
                              const newUser = { ...userInfo }
                              newUser.error = error.code;
                              newUser.success = false;
                              setUserInfo(newUser)
                              // console.log(errorCode, errorMessage);
                        });
            }
            if (!signUpUser && userInfo.email && userInfo.password) {
                  const auth = getAuth();
                  signInWithEmailAndPassword(auth, userInfo.email, userInfo.password)
                        .then((userCredential) => {
                              // Signed in 
                              const user = userCredential.user;
                              const newUser = { ...userInfo }
                              newUser.error = false;
                              newUser.success = true;
                              setUserInfo(newUser)
                              setloggedInUser(newUser)
                              navigate(from);
                        })
                        .catch((error) => {
                              const errorCode = error.code;
                              const errorMessage = error.message;
                              const newUser = { ...userInfo }
                              newUser.error = error.code;
                              newUser.success = false;
                              setUserInfo(newUser)
                        });
            }



            e.preventDefault()
      }

      const updateUser = name => {
            const auth = getAuth();
            updateProfile(auth.currentUser, {
                  displayName: name
            }).then(() => {
                  console.log('user Name Update Successfully');
            }).catch((error) => {
                  console.log(error);
            });
      }
      return (
            <div className='Login'>
                  {
                        userInfo.isLoggedIn ? <button onClick={handleLogOut} className='google-btn'>LogOut</button> : <button onClick={handleLogin} className='google-btn'>Login</button>
                  }


                  {
                        userInfo.isLoggedIn && <div>
                              <p>{userInfo.name}</p>
                              <p>{userInfo.email}</p>
                              <img src={userInfo.photo} alt="" />
                        </div>
                  }

                  <h1>SingUp With Email And Password</h1>
                  <input type="checkbox" onClick={() => setSignupUser(!signUpUser)} name="signUpUser" id="" />
                  <label htmlFor="signUpuser">New User Sign Up </label>
                  <form onSubmit={handldeSubmit}>
                        {signUpUser && <input type="text" name='name' onBlur={handleBlur} placeholder='Enter Your Name' required />} <br />
                        <input type="text" name='email' onBlur={handleBlur} placeholder='Enter Your Email' required /> <br />
                        <input type="password" name="password" onBlur={handleBlur} placeholder='Enter Your password' id="" /> <br />
                        <input type="submit" value="Submit" />
                  </form>

                  <p style={{ color: 'red' }}>{userInfo.error}</p>
                  {userInfo.success && <p style={{ color: 'green' }}>Account {signUpUser ? 'Create' : 'LoggedIn'} Successfully</p>}
            </div>
      );
};

export default Login;