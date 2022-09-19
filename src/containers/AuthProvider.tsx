import { getAuth, signOut } from "@firebase/auth";
import { getFirestore } from "@firebase/firestore";
import { doc, updateDoc } from "firebase/firestore";
import React, {
  FC,
  useCallback,
  useEffect,
  useState
} from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { useNavigate } from "react-router";
import { AuthContextInterface, IUser } from "../models/models";
import app from "../utils/base";

export const AuthContext =
  React.createContext<AuthContextInterface | null>(null);

type AuthProviderProps = {
  children: JSX.Element;
};

export const AuthProvider: FC<AuthProviderProps> = ({ children }) => {
  
  const auth = getAuth(app);

  //Auth Hook to read  auth user
  const [user, loading] = useAuthState(auth);

  //Firestore Database
  const database = getFirestore(app);

  let navigate = useNavigate();
  const [errorMessages, setErrorMessages] = useState("");
  const [currentUser, setCurrentUser] = useState<IUser>({
    name: "",
    isOnline: false,
    email: "",
    uid: "",
    entrancetime: "",
    lastupdatetime: "",
    visitsCount: 0,
  });


  
  //sign out and update user data
  const logOut = useCallback(() => {
    if (!user) navigate("/login");
    const washingtonRef = user?.uid && doc(database, "users", user.uid);
    washingtonRef &&
      updateDoc(washingtonRef, {
        isOnline: false,
        visitsCount: +currentUser.visitsCount + 1,
        lastupdatetime: new Date(),
      }).then(() => {
        signOut(auth);
        setTimeout(() => {
          localStorage.removeItem("user");
          navigate("/login");
        }, 300);
      });
  },[user,currentUser,database,auth,navigate]);

  //before unload 
  useEffect(() => {
    window.addEventListener("beforeunload", logOut);
    return () => {
      window.removeEventListener("beforeunload", logOut);
    };
  }, [logOut]);


  if (loading) {
    return <>Loading...</>;
  }

  return (
    <AuthContext.Provider
      value={{
        user,
        database,
        auth,
        logOut,
        errorMessages,
        setErrorMessages,
        currentUser,
        setCurrentUser,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
