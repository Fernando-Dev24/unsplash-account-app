import React, {useState} from 'react';
import { useHistory } from 'react-router-dom';
/* Contexts */
import { useAccountsContext } from '../contexts/AccountsContext';
/* Icons */
import { FaSearch, FaHeart, FaUser } from 'react-icons/fa';
import {ReactComponent as UnsplashIcon} from '../images/unsplash-logo.svg';

export const Home = () => {
   /* Context variables */
   const history = useHistory();
   const {accounts, setAccounts} = useAccountsContext();
   console.log(accounts);

   /* States variables */
   const [searchUser, setSearchUser] = useState('');

   /* API variables */
   const API_KEY = process.env.REACT_APP_API_KEY;
   const API_ENDPOINT = `https://api.unsplash.com`;

   /* handeUserState function */
   const handleUserState = ({target}) => {
      const usernameRef = target.attributes[1].textContent;
      history.push(`/artist/${usernameRef}`);
   };

   /* handleSubmit */
   const handleSubmit = async (e) => {
      e.preventDefault();
      
      /* Validation */
      if(searchUser === '') {
         return;
      }

      if(searchUser.length < 3) {
         return;
      }

      try {
         const response = await fetch(`${API_ENDPOINT}/search/users?page=1&query=${searchUser}&client_id=${API_KEY}`)
         const {results} = await response.json();
         if(response.ok) {
            setAccounts(results);
            setSearchUser('');
         } else {
            return;
         }
      } catch (error) {
         console.log(error);
      }
   };

   return (
      <section className="home">
         <header className="home-header">
            <nav className="container home__navbar">
               <div className="app__name">
                  <UnsplashIcon className="unsplash-icon" />
                  <h2>Unsplash Accounts Feed</h2>
               </div>
               <form className="form" onSubmit={handleSubmit}>
                  <input
                     type="text"
                     className="search__bar"
                     placeholder="Search any username. Eg: Mike..."
                     value={searchUser}
                     onChange={({target}) => setSearchUser(encodeURI(target.value))}
                  />
                  <button type="submit" className="btn__submit">
                     <FaSearch />
                  </button>
               </form>
            </nav>
         </header>

         <section className="home__accounts container">
            <h2 className="subtitle">Discover unbelievable profiles</h2>
            <section className="accounts__grid">
               {accounts.map((account) => {
                  return (
                     <article className="account" key={account.id} id={account.username}>
                        <div className="user__image">
                           <img
                              src={account.profile_image.large}
                              alt="Unsplash User profile"
                           />
                        </div>
                        <article className="user__content">
                           <div className="user__info">
                              <h2>{account.name}</h2>
                              <span>@{account.username}</span>
                           </div>
                           <span className="user__likes">
                              <FaHeart className="like__icon" />
                              {account.total_likes}
                           </span>
                           <button
                              className="btn__profile"
                              username={account.username}
                              onClick={handleUserState}
                           >
                              Check out this profile
                              <FaUser className="user__icon" />
                           </button>
                        </article>
                     </article>
                  );
               })}
            </section>
         </section>
      </section>
   );
};