const dotenv = require('dotenv').config();
const axios = require("axios");

const token = (process.env.GITHUB_TOKEN == undefined) ? '' : `?access_token=${process.env.GITHUB_TOKEN}`;

class User {
  constructor(name, email, picUrl) {
    this.name = (name && name.trim() !== "") ? name : console.log("name cannot be empty");
    this.email = (email) ? email : "No access";
    this.picUrl = picUrl ? picUrl : "";
  }
}

/** 
 * @param {username} username 
 * @return {User}
 */
async function getUser(username) {

  try {
    const userUrl = `https://api.github.com/users/${username}${token}`;
    const response = await axios.get(userUrl);

    if (response == undefined || !("data" in response)
      || !("repos_url" in response.data))
      return null;

    return new User(username, response.data.email, response.data.avatar_url);
  }
  catch (err) {
    console.log("user was not found...");
  }
}

module.exports = getUser;
