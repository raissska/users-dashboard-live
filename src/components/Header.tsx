
import { FC, useContext } from 'react';
import { AuthContext } from '../containers/AuthProvider';
import { AuthContextInterface, IUser } from '../models/models';


interface HeaderProps {
  user:IUser;
}

const Header:FC<HeaderProps> = ({user}) => {

const {logOut} = useContext(AuthContext) as AuthContextInterface;


  return(
    <header className="header">
       
          <div className="logo">Live Users</div>
          <div style={{margin: '20px 0', color: '#fff', fontWeight: 'bold'}}>
            {`Hi ${user.name}`}
          </div> 
          <div className="logo" style={{cursor:'pointer'}} onClick={logOut}>Logout</div>
    </header>
   )

 }

export default Header