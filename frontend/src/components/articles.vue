<template>
  <div>
    <div style="margin-left:333px">
      <Article
        v-for="article in articles"
        :key="article"
        :title="article.title"
        :published="article.published"
        :description="article.description"
        :bookmark="article.bookmark"
        v-on="$listeners"
      />
    </div>
  </div>
</template>
<script>
import Article from "./article";
export default {
  components: { Article },
  props: {
    articles: {
      type: Array,
      default: () => []
    },
    methods: {}
  }
};
</script>

<style></style>
