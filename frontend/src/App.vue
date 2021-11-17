<template>
  <div id="app">
    <!-- <Login></Login> -->
    <Sidebar
      :feeds="formattedFeeds"
      :addContent="this.addContent"
      @feed-changed="setCurrentFeed"
      @sort-by-titles="sortByTitles"
      @sort-by-date="sortByDate"
      @sort-by-description="sortByDescription"
      @add-content="changeContent"
    ></Sidebar>
    <div>
      <Articles
        :articles="currentArticles"
        @open-article="openSelectedArticle"
      />
    </div>
    <router-view />
  </div>
</template>

<script>
import Sidebar from "./components/sidebar";
import Articles from "./components/articles";
import axios from "axios";
export default {
  name: "app",
  components: { Sidebar, Articles },
  data() {
    return {
      selectedFeed: "all",
      currentSort: "",
      openArticle: false,
      loginStatus: false,
      addContent: false,
      feeds: {}
    };
  },
  mounted() {
    axios
      .get("https://radiant-dusk-26016.herokuapp.com/userFeeds")
      .then(response => (this.feeds = response.data));
    console.log(this.feeds);
  },
  computed: {
    currentArticles() {
      const articles =
        this.selectedFeed === "all"
          ? Object.values(this.feeds).flatMap(feed => feed.articles)
          : this.feeds[this.selectedFeed].articles;

      if (!this.currentSort) return articles;

      return articles.sort((a, b) =>
        a[this.currentSort] > b[this.currentSort] ? 1 : -1
      );
    },

    formattedFeeds() {
      return [
        {
          feedKey: "all",
          displayName: "Show All Feeds"
        }
      ].concat(
        Object.entries(this.feeds).map(([feedKey, feed]) => ({
          feedKey,
          displayName: feed.displayName
        }))
      );
    }
  },
  methods: {
    setCurrentFeed(feedKey) {
      this.selectedFeed = feedKey;
      this.currentSort = "";
    },
    openSelectedArticle(selectedTitle) {
      console.log(selectedTitle);
      this.openArticle = true;
      window.open(
        Object.values(this.feeds)
          .flatMap(feed => feed.articles)
          .filter(obj => {
            return obj.title === selectedTitle;
          })[0].url
      );
    },
    sortByTitles() {
      this.currentSort = "title";
    },
    sortByDate() {
      this.currentSort = "published";
    },
    sortByDescription() {
      this.currentSort = "description";
    },
    changeContent() {
      this.addContent = this.addContent ? false : true;
    }
  }
};
</script>
