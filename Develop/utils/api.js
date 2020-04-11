const dotenv = require('dotenv').config();
const axios = require("axios");

const key = "e5792a790a0959e57956359d90c34d0d6aff3c0d";

class User {
  constructor(name, email, picUrl) {
    this.name = (name && name.trim() !== "") ? name : console.log("name cannot be empty");
    this.email = (email) ? email : "";
    this.picUrl = picUrl ? picUrl : "";
  }
}

const api = {

  /** 
   * @param {username} username 
   * @return {User}
   */
  async getUser(username) {

    try {
      const userUrl = `https://api.github.com/users/${username}?access_token=${key}`;
      const response = await axios.get(userUrl);
      console.log(response.data.avatar_url);

      if (response.data) {
        const newUser = new User(username, response.data.email, response.data.avatar_url);
        // console.log(newUser.avatar_url);
        return newUser;
      }
      else return null;
    }
    catch (err) {
      console.log("user was not found...");
    }
  }
};

const user1 = api.getUser("alibahrami633");
console.log(user1.avatar_url);

module.exports = api.getUser;
