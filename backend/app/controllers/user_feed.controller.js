const db = require("../models");
const UserFeeds = db.userFeeds;
const { Op } = require("sequelize");
let Parser = require("rss-parser");

exports.create = async (req, res) => {
  const userFeed = await UserFeeds.create({
    feedUrl: req.body.url,
    userId: req.user.id
  });
  res.json(userFeed);
};

exports.getAll = async (req, res) => {
  const userFeeds = await UserFeeds.findAll({
    where: {
      userId: {
        [Op.eq]: req.user.id
      }
    }
  });

  /* Parsing XML */
  const formattedFeeds = {};
  const feedPromises = userFeeds.map(async feed => {
    const rssFeed = await getArticles(feed.feedUrl);
    formattedFeeds[feed.id] = {
      displayName: rssFeed.title,
      articles: rssFeed.articles
    };
  });
  await Promise.all(feedPromises);
  res.json(formattedFeeds);
};

const getArticles = async feedUrl => {
  let parser = new Parser();
  let feed = await parser.parseURL(feedUrl);
  let itemsArray = [];

  feed.items.forEach(item => {
    itemsArray.push({
      title: item.title,
      published: item.pubDate,
      description: item.contentSnippet,
      url: item.link
    });
  });

  return { title: feed.title, articles: itemsArray };
};
