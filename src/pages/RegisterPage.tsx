import { createUserWithEmailAndPassword } from "firebase/auth";
import { doc, setDoc } from "firebase/firestore";
import React, { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import Form from "../components/Form";
import { AuthContext } from "../containers/AuthProvider";
import { AuthContextInterface } from "../models/models";

export default function LoginPage() {
  
  let navigate = useNavigate();
  
  const { auth, database,errorMessages,setErrorMessages } = useContext(AuthContext)as AuthContextInterface;

  //Create User With Email And Password
  const handleSubmit = (email: string, password: string, name: string) => {
    createUserWithEmailAndPassword(auth, email, password)
      .then(({ user }) => {
        localStorage.setItem("user", JSON.stringify(user));
        const docData = {
          name,
          email: user.email,
          entrancetime: new Date(),
          lastupdatetime: new Date(),
          uid: user.uid,
          isOnline: true,
          visitsCount: 0,
        };
        setDoc(doc(database, "users", user.uid), docData);
        setTimeout(() => {
          navigate('/');
        },300)
      })
      .catch((error) => {
        const errorMessage = error.message;
        setErrorMessages(errorMessage)
      });
  };

  return (
    <div className="form-container">
      <span className="container-label">Registration</span>
      <Form errorMessages={errorMessages} title={"Sign up"} handleSubmit={handleSubmit} />
      <p>
        Or <Link to="/login">Sign in</Link>
      </p>
    </div>
  );
}
