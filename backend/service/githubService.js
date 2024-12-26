const axios = require("axios");

class GithubService {
  constructor(personalAccessToken) {
    this.personalAccessToken = personalAccessToken;
  }

  async uploadFileToRepo(filePath, encodedContent) {
    try {
      const url = `https://api.github.com/repos/Salomo309/Game-Assets/contents/${filePath}`;

      const response = await axios.put(
        url,
        {
          message: "New Asset Upload",
          content: encodedContent,
          branch: "main",
        },
        {
          headers: {
            Authorization: `Bearer ${this.personalAccessToken}`,
            "Content-Type": "application/json",
          },
        }
      );

      return response.data;
    } catch (error) {
      throw new Error(
        `Failed to upload file to GitHub: ${error.response?.data?.message || error.message}`
      );
    }
  }
}

module.exports = GithubService;
