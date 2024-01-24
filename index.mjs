import { fetchAndSummarizeCryptoNews } from "./src/fetchNews.mjs";
import { evaluateArticlesWithChatGPT } from "./src/evaluateArticles.mjs";
import { postTweet } from "./src/postTweet.mjs";
import cron from "node-cron";
import chalk from "chalk";

const calculateNextRunTime = () => {
  const now = new Date();
  return new Date(
    now.getFullYear(),
    now.getMonth(),
    now.getDate(),
    now.getHours() + 1
  ).toLocaleTimeString();
};

const runTask = async () => {
  try {
    const articles = await fetchAndSummarizeCryptoNews();

    if (articles.length > 0) {
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
    } else {
      console.log(chalk.red("No articles available to evaluate."));
    }
  } catch (error) {
    console.error(chalk.red("An error occurred:"), error);
  }

  console.log(chalk.green(`Next run will be at: ${calculateNextRunTime()}`));
};

cron.schedule("0 * * * *", () => {
  console.log(chalk.magenta("Running the task every hour on the hour"));
  runTask();
});

console.log(chalk.green(`First run will be at: ${calculateNextRunTime()}`));
