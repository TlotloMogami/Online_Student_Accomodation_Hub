import React from 'react';
import './footer.css';
import logo from '../../assets/icons/osah_logo-navbar.svg';

export const Footer = () => {
    return(
        <footer className='flex flex-row pt-16 pb-28'>
        
        <div className="ml-20">
           <img src={logo} alt=""/>
        </div>

       <div className='flex flex-row gap-20 ml-40'>
          <div className="flex flex-col">
              <h3 className="font-bold mb-4">LINKS</h3>
              <ul className='text-sm font-light flex flex-col gap-2'>
                <li><a className="text-neutral-400" href="#i">Universities</a></li>
                <li><a className="text-neutral-400" href="#i">Residences</a></li>
                <li><a className="text-neutral-400" href="#i">Contact Us</a></li>
              </ul>
            </div>

        <div className="flex flex-col">
          <h3 className="font-bold mb-4">SUPPORT</h3>
          <ul className='text-sm font-light flex flex-col gap-2'>
            <li><a className="text-neutral-400" href="#i">About us</a></li>
            <li><a className="text-neutral-400" href="#i">Contact us</a></li>
          </ul>
        </div>

        <div className="flex flex-col">
          <h3 className="font-bold mb-4">LEGAL</h3>
          <ul className='text-sm font-light flex flex-col gap-2'>
            <li><a className="text-neutral-400" href="#i">Privacy Policy</a></li>
            <li><a className="text-neutral-400" href="#i">Terms of Use</a></li>
          </ul>
        </div>
       </div>

    </footer>
    )
}

