// api.js
// - allows us to handle our API catch() all in one place
// - allows us to define settings for all our API requests
// - allows us to define reusable API functions

import axios from "axios";

const WordpressApi = axios.create({
    baseURL: "http://localhost/wordpress",
    // send cookies to the backend on every request (for logged-in users)
    withCredentials: true
  });
  
  function errorHandler(err) {
    // console.log() error info for debugging
    if (err.response && err.response.data) {
      console.log("API Error", err.response.data);
    } else {
      console.log("React Code Error", err);
    }
  
    // alert a generic message for the user
    alert("Sorry! Something went wrong. Try again later.");
  
    // cause the error again so the .then() won't be called
    throw err;
  }

  export function getPostsList() {
    return WordpressApi.get("/wp-json/wp/v2/posts/").catch(errorHandler);
  }
  export function getPostDetails(postid) {
    return WordpressApi.get(`/wp-json/wp/v2/posts/${postid}`).catch(errorHandler);
  }


  
  const backendApi = axios.create({
    baseURL: "http://localhost:5555",
    // send cookies to the backend on every request (for logged-in users)
    withCredentials: true
  });
  
  export function postSignUp(userSubmission) {
    return backendApi
      .post("/api/process-signup", userSubmission)
      .catch(errorHandler);
  }

  export function postLogIn(loginCredentials) {
    return backendApi
      .post("/api/process-login", loginCredentials)
      .catch(errorHandler);
  }

  export function getLogOut() {
    return backendApi.get("/api/logout").catch(errorHandler);
  }