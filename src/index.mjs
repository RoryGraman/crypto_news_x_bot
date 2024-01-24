import { fetchAndSummarizeCryptoNews } from "./fetchNews.mjs";
import { evaluateArticlesWithChatGPT } from "./evaluateArticles.mjs";
import { postTweet } from "./postTweet.mjs";
import cron from "node-cron";
import chalk from "chalk";

const calculateNextRunTime = () => {
  const now = new Date();
  const nextHour = new Date(
    now.getFullYear(),
    now.getMonth(),
    now.getDate(),
    now.getHours() + 1
  );
  return nextHour.toLocaleTimeString();
};

const runTask = async () => {
  const articles = await fetchAndSummarizeCryptoNews();
  const jsonResponse = await evaluateArticlesWithChatGPT(articles);

  if (
    "generatedTitle" in jsonResponse &&
    "originalLink" in jsonResponse &&
    "relevantHashtags" in jsonResponse
  ) {
    const formattedPost = `${jsonResponse.generatedTitle}\n${
      jsonResponse.originalLink
    }\n${jsonResponse.relevantHashtags.join(" ")}`;
    await postTweet(formattedPost);
  } else {
    console.log(chalk.red("Required fields not found in JSON response"));
  }

  console.log(chalk.green(`Next run will be at: ${calculateNextRunTime()}`));
};

// Schedule the task to run every hour on the hour
cron.schedule("0 * * * *", () => {
  console.log(chalk.magenta("Running the task every hour on the hour"));
  runTask();
});

console.log(chalk.green(`First run will be at: ${calculateNextRunTime()}`));
