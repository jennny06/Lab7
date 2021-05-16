// script.js

import { router } from './router.js'; // Router imported so you can use it to manipulate your SPA app here
const setState = router.setState;

// Make sure you register your service worker here too

document.addEventListener('DOMContentLoaded', () => {
  let idx = 0;
  fetch('https://cse110lab6.herokuapp.com/entries')
    .then(response => response.json())
    .then(entries => {
      entries.forEach(entry => {
        let newPost = document.createElement('journal-entry');
        newPost.entry = entry;
        document.querySelector('main').appendChild(newPost);

        idx++;
        newPost.id = idx;
        
        newPost.addEventListener("click", () => {
          setState({entry: newPost.entry, id: newPost.id});
        });

      });
    });
});

document.querySelector("h1").addEventListener("click", () => {
  setState(null);
});

document.querySelector("img").addEventListener("click", () => {
  setState("settings");
});

window.addEventListener("popstate", (event) => {
  setState(event.state);
});


if ('serviceWorker' in navigator) {
  window.addEventListener('load', function() {
    navigator.serviceWorker.register('/sw.js').then(function(registration) {
      // Registration was successful
      console.log('ServiceWorker registration successful with scope: ', registration.scope);
    }, function(err) {
      // registration failed :(
      console.log('ServiceWorker registration failed: ', err);
    });
  });
}