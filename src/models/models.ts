import { Auth, User } from "@firebase/auth";
import { Firestore } from "@firebase/firestore";


export interface AuthContextInterface {
  user:User | null | undefined;
  database: Firestore;
  auth:Auth;
  logOut:() => void;
  errorMessages:string;
  setErrorMessages:any,
  currentUser:IUser;
  setCurrentUser:any;
}

export interface IUser {
  name: string;
  isOnline: boolean;
  email: string;
  uid: string;
  visitsCount: number;
  entrancetime: any;
  lastupdatetime: any;
}

export interface UserProps {
  user: IUser;
  onClick: (user: IUser) => void;
}

export interface FormProps {
  errorMessages:string;
  title: string;
  handleSubmit: (email: string, password: string, name: string) => void;
}