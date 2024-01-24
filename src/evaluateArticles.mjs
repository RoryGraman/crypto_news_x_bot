import OpenAI from "openai";
import dotenv from "dotenv";
import chalk from "chalk";

dotenv.config();

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export const evaluateArticlesWithChatGPT = async (articles) => {
  console.log(
    chalk.blue("Evaluating articles for newsworthiness using OpenAI...")
  );

  const formattedArticles = articles
    .map((article) => `Title: "${article.title}", Link: "${article.link}"`)
    .join("\n");

  const prompt = `
Ignore all previous prompts. Pretend you are a senior editor at a non-biased news station. You are provided these articles. 

${formattedArticles}

Assess which of these articles is most newsworthy. Try and find similarities between articles, and if there are, use that as a higher weight towards which news is more "breaking". News about recent developments in the crypto space are more impactful. news about crypto hacks, crypto scams, crypto regulations, crypto adoption, crypto price, etc. are all important.

Generate create a catchy title for the tweet to compliment the article, but make it straight to the point. regarding the usage of hashtags, select 3-5 relevant hashtags to the article. they should be simple such as #crypto #defi #bitcoin, etc, but should reflect the article regarding the title you select. respond in json format following this structure, and do not use code blocks. 

  {
    "articleTitle": [original article title], 
    "generatedTitle": [generated title], 
    "originalLink": [original link to the post],
    "relevantHashtags": [relevant hashtags to the article]
  }
  
provide the json above and nothing else. your response is used in an api so any deviation from the above will break the API, so do not deviate from the example above unless its to fill in the bracketed examples. instead of brackets though, use double quotes.
  `;
  // console.log(`Formatted Articles: ${formattedArticles}`);
  try {
    const response = await openai.chat.completions.create({
      model: "gpt-4-1106-preview",
      messages: [{ role: "system", content: prompt }],
      max_tokens: 150,
    });
    const jsonResponse = JSON.parse(response.choices[0].message.content);
    console.log(chalk.green("Successfully evaluated articles."));
    return jsonResponse;
  } catch (error) {
    console.error(chalk.red(`Error querying OpenAI:`), error.message);
    return null;
  }
};
