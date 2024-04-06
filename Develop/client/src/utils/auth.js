// use this to decode a token and get the user's information out of it
import decode from 'jwt-decode';

// Lily's changes 
import { userMutation } from '@apollo/client' //import apollo
import { LOGIN_USER, ADD_USER } from '../utils/mutations'; // Import GraphQL mutations


// create a new class to instantiate for a user
class AuthService {
  // get user data
  getProfile() {
    return decode(this.getToken());
  }

  // check if user's logged in
  loggedIn() {
    // Checks if there is a saved token and it's still valid
    const token = this.getToken();
    return !!token && !this.isTokenExpired(token); // handwaiving here
  }

  // check if token is expired
  isTokenExpired(token) {
    try {
      const decoded = decode(token);
      if (decoded.exp < Date.now() / 1000) {
        return true;
      } else return false;
    } catch (err) {
      return false;
    }
  }

  getToken() {
    // Retrieves the user token from localStorage
    return localStorage.getItem('id_token');
  }

  // Lily's changes | handle user logins:
  async login(email, password) {
    try {
      const [login] = userMutation(LOGIN_USER);
      const {data} = await login({
        variables: {email, password}
      });
      const { token } = data.login;
      localStorage.setItem('id_token', token);
      window.location.assign('/');   
    } catch (err) {
      console.log(err)
    }
  }

  // Lily's changes | Handle user sign up 
  async signup(username, email, password) {
    try {
      const [addUser] = useMutation(ADD_USER);
      const { data } = await addUser({
        variables: { username, email, password }
      });
      const { token } = data.addUser;
      localStorage.setItem('id_token', token);
      window.location.assign('/');
    } catch (err) {
      console.log(err)
    }
  }

  //login(idToken) {
    // Saves user token to localStorage
   // localStorage.setItem('id_token', idToken);
   // window.location.assign('/');
 // }

  logout() {
    // Clear user token and profile data from localStorage
    localStorage.removeItem('id_token');
    // this will reload the page and reset the state of the application
    window.location.assign('/');
  }
}

export default new AuthService();
