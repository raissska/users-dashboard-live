import { doc, updateDoc } from "@firebase/firestore";
import { signInWithEmailAndPassword } from "firebase/auth";
import React, { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import Form from "../components/Form";
import { AuthContext } from "../containers/AuthProvider";
import { AuthContextInterface } from "../models/models";

export default function LoginPage() {
  
  const { auth,database,setErrorMessages,errorMessages} = useContext(AuthContext) as AuthContextInterface;

  let navigate = useNavigate();

//Sign In With Email And Password and update User
  const handleSubmit = (email:string,password:string,name:string) => {
    signInWithEmailAndPassword(
      auth,
      email,
      password
    )
      .then(({ user }) => {
        const washingtonRef = doc(database, "users", user.uid);
        updateDoc(washingtonRef, {
          isOnline: true,entrancetime:new Date(),lastupdatetime:new Date()
        }).then(() => {
          localStorage.setItem('user',JSON.stringify(user))
          navigate("/");
        });
      })
      .catch((error) => {
        const errorMessage = error.message;
        setErrorMessages(errorMessage)
        
      });
  };


  return (
    <div className="form-container">
      <span className="container-label">Login</span>
      <Form errorMessages={errorMessages} title={"Sign in"} handleSubmit={handleSubmit} />
      <p>
        Or <Link to="/signup">Sign up</Link>
      </p>
    </div>
  );
}
