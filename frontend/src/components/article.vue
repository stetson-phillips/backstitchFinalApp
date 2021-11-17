<template>
  <div style="margin-left:10px;">
    <div class="article-preview article">
      <!--Ideally this would be linked to RSS article image-->
      <div class="articleimg"><img src="../assets/logo.png" alt="" /></div>
      <div id="article-pub">
        <p>{{ formatDate(published) }}</p>
      </div>

      <div id="article-title">
        <p @click="$emit('open-article', title)">
          {{ title }}
        </p>
      </div>

      <p id="article-desc">{{ `${description.substring(0, 100)}... ` }}</p>
    </div>
  </div>
</template>
<script>
import DayJs from "dayjs";
export default {
  props: {
    feed: String,
    title: String,
    published: String,
    description: String
  },
  methods: {
    formatDate(date) {
      return DayJs(date).format("MM/DD/YYYY HH:mm");
    }
  }
};
</script>
<style>
.article-preview {
  float: left;
  width: 300px;
  height: 300px;
  background-color: white;
  margin: 10px;
  border-radius: 5px;
  display: flex;
  border: 1px solid black;
}

.article-preview:hover {
  background-color: rgb(240, 240, 240);
  transform: scale(1.1);
}

.articleimg {
  position: relative;
  overflow: hidden;
  margin: 5px;
  border-radius: 5px;
  width: 75px;
  height: 75px;
}

.article img {
  width: 100%;
  height: auto;
}

#article-feed {
  margin-left: 50px;
  position: absolute;
  left: 5px;
  font-weight: bold;
  font-size: 10pt;
  border: 5px solid black;
}

#article-pub {
  z-index: 999;
  color: black;
  position: absolute;
  margin-top: 300px;
  margin-left: 290px;
  width: 120px;
  height: 30px;
  transform: translate(-100%, -100%);
  font-size: 10pt;
  text-align: right;
}

#article-title {
  font-weight: bold;
  position: absolute;
  display: flex;
  margin-top: 120px;
  margin-left: 20px;
  font-size: 12pt;
  width: 270px;
}

#article-desc {
  position: absolute;
  margin-top: 200px;
  margin-left: 30px;

  font-size: 8pt;
  color: rgb(105, 105, 105);
  width: 240px;
  height: 35px;
}
</style>
