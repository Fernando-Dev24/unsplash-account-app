import React, { useState, useEffect } from 'react';
import { useParams, useHistory } from 'react-router-dom';
/* Icons */
import {
   FaInstagram,
   FaTwitter,
   FaCamera,
   FaTimes
} from 'react-icons/fa';

export const AccountFeed = () => {
   /* Contexts variables */
   const {username} = useParams();
   const history = useHistory();
   const API_KEY = process.env.REACT_APP_API_KEY;

   /* States variables */
   const [showWork, setShowWork] = useState(false);
   const [userData, setUserData] = useState({});

   /* handleFullScreen function */
   const handleFullScreen = (e) => {
      console.log(e);
   };

   /* Getting corresponding data from url username */
   useEffect(() => {
      if(username) {
         fetch(`https://api.unsplash.com/users/${username}?client_id=${API_KEY}`)
            .then((response) => response.json())
            .then(({
               name, 
               username,
               bio,
               profile_image,
               instagram_username, 
               twitter_username,
               total_photos,
               downloads,
               followers_count,
               photos
            }) => {
               setUserData({
                  name: name,
                  username: username,
                  bio: bio,
                  user_pic: profile_image.large,
                  instagram: instagram_username,
                  twitter: twitter_username,
                  photos_count: total_photos,
                  downloads: downloads,
                  followers: followers_count,
                  photos: photos
               });
            });
      } else {
         history.push('/');
      }
   }, [username, API_KEY, history]);

   return (
      <>
         <header className="header">
            <section>
               <h1>I am<strong className="important"> {userData.name}</strong></h1>
               <h3>This is my profile</h3>
            </section>

            <nav className="social-media">
               {userData.instagram &&
                  <a 
                     href={`https://www.instagram.com/${userData.instagram}`}className="btn">
                     @{userData.instagram}
                     <FaInstagram className="icon" />
                  </a>
               }
               {userData.twitter &&
                  <a
                     href={`https://twitter.com/${userData.twitter}`}
                     className="btn">
                     @{userData.twitter}
                  <FaTwitter className="icon" />
               </a>
               }
            </nav>
         </header>

         <section className="container account__wrapper">
            <article className="account__info">
               <article className="account__image">
                  <img
                     src={userData.user_pic}
                     alt="Account profile"
                  />
               </article>
               <header className="account__name">
                  <div className="user-name">
                     <h2>{userData.name}</h2>
                     <span>@{userData.username}</span>
                  </div>
                  {userData.bio && <p>{userData.bio}</p>}
               </header>
               <article className="stats__grid">
                  <article className="stat">
                     <h3>{userData.photos_count}</h3>
                     <div className="stat__label">
                        <span>Photos</span>
                     </div>
                  </article>
                  <article className="stat">
                     <h3>{userData.downloads}</h3>
                     <div className="stat__label">
                        <span>Downloads</span>
                     </div>
                  </article>
                  <article className="stat">
                     <h3>{userData.followers}</h3>
                     <div className="stat__label">
                        <span>Followers</span>
                     </div>
                  </article>
               </article>
               <button className="btn__show" onClick={() => setShowWork(!showWork)}>
                  {!showWork ?
                     <FaCamera />
                     :
                     <FaTimes />
                  }
               </button>
            </article>
         </section>

         {showWork &&
            <section className="photos__grid container">
               {userData.photos.map((photo) => {
                  return (
                     <article className="photo" key={photo.id}>
                        <img
                           onClick={handleFullScreen}
                           src={photo.urls.regular}
                           alt={`Work by ${username} from Unsplash.com`}
                        />
                     </article>
                  );
               })}
            </section>
         }
      </>
   )
};