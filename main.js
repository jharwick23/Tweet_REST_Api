const axios = require(`axios`);
const express = require(`express`);
const app = express();

const PORT = 3001;

app.get(`/tweets`, async (req, res) => {
  try {
    // Fetch JSON data from URL
    const response = await axios.get(
      `https://foyzulhassan.github.io/files/favs.json`
    );
    const tweets = response.data;

    // Map over the array to create a new array with create time, id, and tweet text
    const newTweetGet = tweets.map((tweet) => ({
      created_at: tweet.created_at,
      id: tweet.id,
      text: tweet.text,
    }));

    // Respond with filtered JSON data
    res.json(newTweetGet);
  } catch (error) {
    console.error(`Error fetching JSON:`, error);
    res.status(500).json({ error: `Failed to fetch JSON data` });
  }
});

app.get(`/external-links`, async (req, res) => {
  try {
    const response = await axios.get(
      `https://foyzulhassan.github.io/files/favs.json`
    );
    const tweets = response.data;

    // Create an object to hold all the links by tweet Id
    const linksByTweetId = {};

    // Create a regular expression to check if text in tweets has URL
    // Checks for https or https links
    const urlRegExp = /https?:\/\/[^\s]+/g;

    tweets.forEach((tweet) => {
      // Store tweet text in variable
      const tweetText = tweet.text || ``;

      // Use our regular expression to find URL's within the tweet's text
      const tweetLinks = tweetText.match(urlRegExp) || [];

      // Group links by tweet id
      linksByTweetId[tweet.id] = tweetLinks;
    });

    // Respond with links grouped by id
    res.json(linksByTweetId);
  } catch (error) {
    console.error(`Error fetching JSON:`, error);
    res.status(500).json({ error: `Failed to fetch JSON data` });
  }
});

app.get(`/tweets/:id`, async (req, res) => {
  try {
    // Fetch JSON data from URL
    const response = await axios.get(
      `https://foyzulhassan.github.io/files/favs.json`
    );
    const tweets = response.data;

    // Extract id from the parameters
    const tweetId = req.params.id;

    // Find the tweet whose id matches the requested ID
    const tweet = tweets.find((t) => t.id.toString() === tweetId);

    if (!tweet) {
      return res.status(404).json({ error: `Tweet not found` });
    }

    // Directly extract the desired properties
    const tweetDetails = {
      created_at: tweet.created_at,
      text: tweet.text,
      user_screen_name: tweet.user.screen_name,
    };

    res.json(tweetDetails);
  } catch (error) {
    console.error(`Error fetching JSON:`, error);
    res.status(500).json({ error: `Failed to fetch JSON data` });
  }
});

app.get(`/user/:screen_name`, async (req, res) => {
  try {
    // Fetch JSON data from URL
    const response = await axios.get(
      `https://foyzulhassan.github.io/files/favs.json`
    );
    const tweets = response.data;

    // Extract screen name directly from the route parameter
    const userScreenName = req.params.screen_name;

    // Find a tweet where the user screen name matches the requested one
    const userTweet = tweets.find(
      (tweet) => tweet.user && tweet.user.screen_name === userScreenName
    );

    if (!userTweet) {
      return res.status(404).json({ error: `Tweet not found` });
    }

    const user = userTweet.user;

    // Extract profile details from the user object
    const profile = {
      screen_name: user.screen_name,
      location: user.location,
      description: user.description,
      followers_count: user.followers_count,
      friends_count: user.friends_count,
    };

    res.json(profile);
  } catch (error) {
    console.error(`Error fetching JSON:`, error);
    res.status(500).json({ error: `Failed to fetch JSON data` });
  }
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
