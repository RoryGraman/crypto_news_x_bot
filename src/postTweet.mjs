import { TwitterApi } from "twitter-api-v2";
import dotenv from "dotenv";
import chalk from "chalk";

dotenv.config();

const twitterClient = new TwitterApi({
  appKey: process.env.TWITTER_API_KEY,
  appSecret: process.env.TWITTER_API_SECRET,
  accessToken: process.env.TWITTER_ACCESS_TOKEN,
  accessSecret: process.env.TWITTER_ACCESS_SECRET,
});

const rwClient = twitterClient.readWrite;

export const postTweet = async (content) => {
  try {
    console.log(chalk.blue("Attempting to post tweet..."));

    // Log the tweet content before posting
    console.log(chalk.yellow("Tweet Content:"));
    console.log(chalk.white(content));

    const tweetResponse = await rwClient.v2.tweet(content);
    console.log(
      chalk.green("Tweet posted successfully! Tweet ID: "),
      tweetResponse.data.id
    );
  } catch (error) {
    console.error(chalk.red("Error posting tweet:"), error);
  }
};
