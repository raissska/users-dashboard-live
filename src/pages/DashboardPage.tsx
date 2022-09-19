import {
  collection, doc, getDoc, onSnapshot,
  query
} from "firebase/firestore";
import React, { FC, useContext, useEffect, useState } from "react";
import { Navigate } from "react-router";
import Header from "../components/Header";
import { AuthContext } from "../containers/AuthProvider";
import { AuthContextInterface, IUser, UserProps } from "../models/models";



const UserItem: FC<UserProps> = (props) => {

  const { user, onClick } = props;

  let entranceDate = user.entrancetime
    ? user.entrancetime.toDate().toLocaleDateString()
    : "";
  let entranceTime = user.entrancetime
    ? user.entrancetime.toDate().toLocaleTimeString()
    : "";
  let lastUpdateDate = user.lastupdatetime
    ? user.lastupdatetime.toDate().toLocaleDateString()
    : "";
  let lastUpdateTime = user.lastupdatetime
    ? user.lastupdatetime.toDate().toLocaleTimeString()
    : "";
  return (
    <div
      style={{
        borderBottom: "1px solid #ccc",
        paddingBottom: 14,
        cursor: "pointer",
      }}
      onClick={() => onClick(user)}
    >
      {" "}
      <div className="displayName">
        <div className="displayPic">
          <img
            src="https://user-images.githubusercontent.com/334891/29999089-2837c968-9009-11e7-92c1-6a7540a594d5.png"
            alt=""
          />
        </div>
        <div
          style={{
            display: "flex",
            flex: 1,
            justifyContent: "space-between",
            margin: "0 10px",
            alignItems: "center",
          }}
        >
          <span style={{ fontWeight: 500 }}>{user.name}</span>
          <span
            className={user.isOnline ? `onlineStatus` : `onlineStatus off`}
          ></span>
        </div>
      </div>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          padding: "5px 10px",
        }}
      >
        <span>
          Entrance time: {entranceDate} {entranceTime}
        </span>
        <span>
          Last update time: {lastUpdateDate} {lastUpdateTime}
        </span>
      </div>
    </div>
  );
};

export default function DashboardPage() {
  
  const { database, user, currentUser, setCurrentUser } = useContext(AuthContext) as AuthContextInterface;
  
  const [users, setUsers] = useState<IUser[]>([]);

  
  const [userInfo, setUserInfo] = useState<IUser | null>(null);

  useEffect(() => {

    //Get realtime updates
    const q = query(
      collection(database, "users")
    );
    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      const users: any[] = [];
      querySnapshot.forEach((doc) => {
        users.push(doc.data());
      });
      setUsers(users);
    });
    //cleanup
    return () => {
      unsubscribe();
    };
   
  }, [user,database]);

  useEffect(() => {
    if (!user) return;
    //get current user for database
    const fetchData = async () => {
      const docRef = doc(database, "users", user.uid);
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
        return docSnap.data();
      } 
    };

    fetchData().then((res) => setCurrentUser(res as IUser));
    
  }, [user,database,setCurrentUser]);

  if (!user) {
    return <Navigate to={"/login"} />;
  }
  const handleClick = (user: IUser) => {
    setUserInfo(user);
  };

  return (
    <div>
      <Header user={currentUser} />
      <section className="container">
        <div className="listOfUsers">
          {/* List users */}
          {users.length > 0
            ? users
                .filter((f) => f.uid !== currentUser.uid)
                .map((user) => {
                  return (
                    <UserItem onClick={handleClick} key={user.uid} user={user} />
                  );
                })
            : null}
        </div>
        {/* User Info */}
        {userInfo && (
          <div className="userInfoContainer"
            onClick={() => setUserInfo(null)}
          >
            <div
            className="userInfo"
             
            >
              <span>Name: {userInfo.name}</span>
              <span>Email: {userInfo.email}</span>
              <span>
                Entrance time:{" "}
                {userInfo.entrancetime &&
                  userInfo.entrancetime.toDate().toLocaleDateString()}{" "}
                {userInfo.entrancetime &&
                  userInfo.entrancetime.toDate().toLocaleTimeString()}
              </span>
              <span>
                Last update time:{" "}
                {userInfo.lastupdatetime &&
                  userInfo.lastupdatetime.toDate().toLocaleDateString()}{" "}
                {userInfo.lastupdatetime &&
                  userInfo.lastupdatetime.toDate().toLocaleTimeString()}
              </span>
              <span>Visits count: {+userInfo.visitsCount+1}</span>
            </div>
            <div className={"close"}></div>
          </div>
        )}
      </section>
    </div>
  );
}
