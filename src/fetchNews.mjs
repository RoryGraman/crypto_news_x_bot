import googleNewsScraper from "google-news-scraper";
import chalk from "chalk";

export const fetchAndSummarizeCryptoNews = async () => {
  console.log(chalk.blue("Fetching latest crypto news..."));

  try {
    const articles = await googleNewsScraper({
      searchTerm: "Latest crypto news",
      prettyURLs: true,
      queryVars: { hl: "en-US", gl: "US", ceid: "US:en" },
      timeframe: "1h",
    });

    console.log(
      articles.length > 0
        ? chalk.green(`Fetched ${articles.length} articles.`)
        : chalk.yellow("No articles found in the last hour.")
    );
    return articles;
  } catch (error) {
    console.error(chalk.red("Error fetching news:"), error);
    return [];
  }
};
