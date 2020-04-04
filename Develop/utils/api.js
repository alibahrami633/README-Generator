const dotenv = require('dotenv').config();
const axios = require("axios");

const key = "3687b88944d5f7e6d389c97a8497e0bb19121e10";

class User {
  constructor(name, email, picUrl) {
    this.name = (name && name.trim() !== "") ? name : console.log("name cannot be empty");
    this.email = (email) ? email : "";
    this.picUrl = picUrl ? picUrl : "";
  }
}

const api = {
  /**
   * 
   * @param {username} username 
   * @return {User}
   */
  async getUser(username) {
    try {
      const userUrl = `https://api.github.com/users/${username}?access_token=${key}`;
      const response = await axios.get(userUrl);

      if (response.data) {
        const newUser = new User(username, response.data.email, response.data.avatar_url);
        return newUser;
      }
      else return null;
    }
    catch (err) {
      console.log("user was not found...");
    }
  }
};



const obj = api.getUser("alibahrami633");
console.log(obj.email);

module.exports = api.getUser;
