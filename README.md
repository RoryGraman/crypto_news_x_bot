# Crypto News Twitter (X) Bot

This bot posts crypto news hourly to the X handle @AnHourInCrypto 👉 https://x.com/anhourincrypto </br>
A follow lets me know you like the project and that I should continue to dedicate more time and effort to it.

## Overview
I like reading up on crypto news, and spend a good portion of my day on X. So I made a simple javascript bot that aggregates news articles every hour, and then posts the most "newsworthy" one on X. The goal of this is to be openly developed, and code contributors are very welcome 🙂. It's currently very basic, but I look forward to it growing and improving overtime as LMM's get more sophisticated and better (free) news api endpoints are implemented. The goal is for this to become the most up to date crypto twitter news source.

### Under The Hood

**News Aggregator API:** Google News API </br>
**Title Generation:** OpenAI API </br>
**Posting:** Twitter V2 API </br>

## Roadmap
- [ ] Add tests that simulate posting without actually posting
- [ ] Improve news source search query
- [ ] Improve chatGPT prompt
- [ ] Allow users to tag the bot on twitter to feed it additional news sources

### Installation
- make sure node is up to date </br>
```npm install``` </br>
```npm start``` </br>







