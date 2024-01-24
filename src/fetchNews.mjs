import googleNewsScraper from "google-news-scraper";
import chalk from "chalk";

export const fetchAndSummarizeCryptoNews = async () => {
  console.log(chalk.blue("Fetching latest crypto news..."));

  try {
    const articles = await googleNewsScraper({
      searchTerm: "Latest crypto news",
      prettyURLs: true,
      queryVars: {
        hl: "en-US",
        gl: "US",
        ceid: "US:en",
      },
      timeframe: "1h",
      puppeteerArgs: [],
    });

    console.log(chalk.green(`Fetched ${articles.length} articles.`));
    return articles;
  } catch (error) {
    console.error(chalk.red("Error fetching news:"), error);
    return []; // Return an empty array in case of an error
  }
};
