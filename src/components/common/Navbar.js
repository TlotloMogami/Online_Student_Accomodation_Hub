import React from 'react';
import './Navbar.css';
import logo from '../../assets/icons/osah_logo-navbar.svg';
import { useLocation, useNavigate } from 'react-router-dom';
import { NavBarLinks } from '../../data/links/links';
import { useAuth } from '../auth/AuthProvider';

export const Navbar = () => {

  const {user, SignOut} = useAuth()
  const navigate = useNavigate()

  // console.log(user?.user_metadata)

  const location = useLocation()

    return(
      <nav className="sticky top-0 bg-white flex flex-row justify-between items-center pr-10 py-1 shadow-sm border-b-[#f9f9f9] z-[99999]">
      <div className='flex flex-row items-center gap-16'>
        <div className="bg-black rounded-tr-full rounded-br-full pl-10 py-2 pr-5">
          <a href='/'><img src = {logo} alt=''/></a>
        </div>
        <ul className="flex flex-row self-center items-center gap-10 text-sm font-light">
          {NavBarLinks.map((link) => {
            return(
              <li key={link.id}><a href={link.path} className={location.pathname === link.path ? 'text-[#9f3fff] no-underline' : 'no-underline text-black'}>{link.name}</a></li>
            )
          })}
        </ul>
      </div>
      <button onClick={user ? ()=>SignOut() : ()=>navigate('/auth/sign-in')} className='rounded-full bg-[#B365FF] hover:bg-[#9f3fff] text-white flex items-center justify-center h-8 px-8 text-sm transition-all duration-300'>{user ? 'Sign out' : 'Sign In'}</button>
    </nav>
    );
}
