module.exports = (sequelize, Sequelize) => {
  const UserFeed = sequelize.define("user_feed", {
    feedUrl: {
      type: Sequelize.STRING
    }
  });

  return UserFeed;
};
