import 'bootstrap/dist/css/bootstrap.min.css';
import { useState } from 'react';
import { Button, Form } from 'react-bootstrap';
import './App.css';
import { createUserWithEmailAndPassword, FacebookAuthProvider, getAuth, GithubAuthProvider, GoogleAuthProvider, sendEmailVerification, sendPasswordResetEmail, signInWithEmailAndPassword, signInWithPopup, signOut, updateProfile } from "firebase/auth";
import app from './firebase.init';


const auth = getAuth(app);
const googleProvider = new GoogleAuthProvider();
const githubProvider = new GithubAuthProvider();
const facebookProvider = new FacebookAuthProvider();


function App() {
  const [validated, setValidated] = useState(false);
  const [registered, setRegistered] = useState(false);
  const [fullName, setFullName] = useState('')
  const [email, setEmail] = useState('')
  const [pass, setPass] = useState('')
  const [error, setError] = useState('')
  const [user, setUser] = useState('')


  const handleFullName = e => {
    setFullName(e.target.value)
  }
  const handleEmail = e => {
    setEmail(e.target.value)
  }
  const handlePass = e => {
    setPass(e.target.value)
  }
  const handleRegister = e => {
    setRegistered(e.target.checked)
  }



  const handleSubmit = e => {
    e.preventDefault();
    const form = e.currentTarget;
    if (form.checkValidity() === false) {
      e.stopPropagation();
      return;
    }

    if (!/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/.test(pass)) {
      setError('Password should contain minimum eight characters, at least one letter and one number')
      return;
    }

    setValidated(true);
    setError('')

    if (!registered) {
      // signUp with email pass
      createUserWithEmailAndPassword(auth, email, pass)
        .then(result => {
          const user = result.user
          setUser(user)
          console.log(user)
          emailVarification()
          updateProfileName()
        })
        .catch(error => {
          console.error(error)
          setError(error.message)
        })
    }
    else {
      //sign in with email
      signInWithEmailAndPassword(auth, email, pass)
        .then(result => {
          const user = result.user
          setUser(user)
          console.log(user)
        })
        .catch(error => {
          console.error(error)
          setError(error.message)
        })
    }
  };

  const forgetPass = () => {
    sendPasswordResetEmail(auth, email)
      .then(() => {
        console.log('password reset link sent')
      })
  }

  const handleSignOut = () => {
    signOut(auth)
      .then(() => {
        setUser('')
        console.log('sign out successfull')
      })
      .catch(error => {
        console.error(error)
      })
  }

  const emailVarification = () => {
    sendEmailVerification(auth.currentUser)
      .then(() => {
        console.log('email sent')
      })
  }
  const updateProfileName = () => {
    updateProfile(auth.currentUser, {
      displayName: fullName
    })
      .then(() => {
        console.log('name updated')
      })
      .catch(error => {
        console.error(error)
      })
  }

  // sign in with google, facebook or github
  const handleGoogleSignIn = () => {
    signInWithPopup(auth, googleProvider)
      .then(result => {
        const user = result.user;
        setUser(user)
        console.log(user)
      })
      .catch(error => {
        console.error(error)
      })
  }
  const handleGitHubSignIn = () => {
    signInWithPopup(auth, githubProvider)
      .then(result => {
        const user = result.user;
        setUser(user)
        console.log(user)
      })
      .catch(error => {
        console.error(error)
      })
  }
  const handleFacebookSignIn = () => {
    signInWithPopup(auth, facebookProvider)
      .then(result => {
        const user = result.user;
        setUser(user)
        console.log(user)
      })
      .catch(error => {
        console.error(error)
      })
  }

  return (
    <div className='container'>
      {
        !user.uid ?
          <section className='form w-50 mx-auto mt-5'>
            <h3 className='text-primary text-center mb-4'>Pleaser {registered ? 'Login' : 'Register'}</h3>
            <Form noValidate validated={validated} onSubmit={handleSubmit}>
              {
                registered ||
                <div>
                  <Form.Group className="mb-3" controlId="formBasicEmail">
                    <Form.Label>Full name</Form.Label>
                    <Form.Control onBlur={handleFullName} type="text" placeholder="Your full name" required />
                    <Form.Control.Feedback type="invalid">
                      Please provide your full name.
                    </Form.Control.Feedback>
                  </Form.Group>
                </div>
              }

              <Form.Group className="mb-3" controlId="formBasicEmail">
                <Form.Label>Email address</Form.Label>
                <Form.Control onBlur={handleEmail} type="email" placeholder="Enter email" required />
                {
                  registered ||
                  <div>
                    <Form.Text className="text-muted">
                      We'll never share your email with anyone else.
                    </Form.Text>
                  </div>
                }
                <Form.Control.Feedback type="invalid">
                  Please provide a valid email.
                </Form.Control.Feedback>
              </Form.Group>

              <Form.Group className="mb-3" controlId="formBasicPassword">
                <Form.Label>Password</Form.Label>
                <Form.Control onBlur={handlePass} type="password" placeholder="Password" required />
                <Form.Control.Feedback type="invalid">
                  Please provide a valid password.
                </Form.Control.Feedback>
              </Form.Group>

              <p className='text-danger'><small>{error}</small></p>

              <Form.Group controlId="formBasicCheckbox">
                <Form.Check onClick={handleRegister} type="checkbox" label="Already Registered" />
              </Form.Group>

              {
                registered &&
                <Button onClick={forgetPass} className='px-0' variant="link">Forget password</Button>
              }
              <br />
              <Button variant="primary" type="submit">
                {registered ? 'Login' : 'Register'}
              </Button>

              {/* login with google, github, facebook */}

              <div className='my-4 row row-cols-2 g-2'>
                <Button className='col' onClick={handleGoogleSignIn} variant="success" type="submit">
                  Login with Google
                </Button>
                <Button className='col' onClick={handleFacebookSignIn} variant="primary" type="submit">
                  Login with Facebook
                </Button>
                <Button className='col' onClick={handleGitHubSignIn} variant="info text-white" type="submit">
                  Login with Twitter
                </Button>
                <Button className='col' onClick={handleGitHubSignIn} variant="secondary text-white" type="submit">
                  Login with GitHub
                </Button>
              </div>
            </Form>
          </section> :
          <section>
            <div className='text-center mt-5 pt-5'>
              <h2>Hello {user.displayName}</h2>
              <button onClick={handleSignOut} className='btn btn-danger my-3'>Logout</button>
            </div>
          </section>
      }
    </div>
  );
}

export default App;
