import React from 'react';
import { Route } from 'react-router';
import WebFont from 'webfontloader';
import { Helmet } from 'react-helmet';
/* Components */
import { AccountFeed } from './components/AccountFeed';
import { Home } from './components/Home';
/* Sources */
import favicon from './images/favicon.png';

export const UnsplashApp = () => {
   WebFont.load({
      google: {
         families: ['Poppins:400,500,600,700']
      }
   });

   return (
      <>
         <Helmet>
            <link
               rel="shortcut icon"
               href={favicon}
               sizes="32x32"
               type="image/x-icon"
            />
         </Helmet>

         <main className="app">
            <Route path="/" exact={ true }>
               <Home />
            </Route>
            <Route path="/artist/:username">
               <AccountFeed />
            </Route>
         </main>
      </>
   );
};