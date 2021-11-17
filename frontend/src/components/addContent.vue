<template>
  <div class="content">
    <div class="content-backdrop"></div>
    <div class="content-panel">
      <h1 style="margin-top:20%">Add RSS Feed</h1>
      <input
        class="feedInput"
        type="url"
        id="url"
        name="url"
        placeholder="Enter Feed URL"
        v-model="feed.url"
      />
      <br />
      <router-link to="/">
        <button id="submitbtn" @click="saveFeed">
          Submit
        </button>
      </router-link>
    </div>
  </div>
</template>

<script>
import { saveFeed } from "../api.js";
export default {
  name: "AddContent",
  data() {
    return {
      feed: {
        url: "",
        userID: ""
      },
      submitted: false
    };
  },
  methods: {
    async saveFeed() {
      console.log(this.feed);
      const response = await saveFeed(this.feed);
      this.alertText = response;
      setTimeout(() => {
        this.alertText = "";
      }, 5000);
    }
  }
};
</script>

<style scoped>
button {
  border-radius: 20px;
  padding: 10px 40px;
}
#submitbtn {
  background-color: #009966;
  border: 1px solid white;
  color: white;
  margin-top: 10px;
}
button:hover {
  border-radius: 20px;
  padding: 10px 40px;
  transform: scale(1.1);
}
.feedInput {
  margin: 5px;
  border: none;
  border-radius: 2px;
  background-color: #e8e8e8;
  height: 30px;
  width: 200px;
}
.content-backdrop {
  background-color: black;
  opacity: 0.7;
  width: 100vw;
  height: 100vh;
  position: fixed;
  top: 0;
  left: 0;
  cursor: pointer;
  z-index: 999;
}

.content-panel {
  overflow-y: auto;
  background-color: #009966;
  position: absolute;
  top: 50vh;
  left: 50vw;
  transform: translate(-50%, -50%);
  height: 300px;
  width: 400px;
  z-index: 999;
  border-radius: 10px;
  text-align: center;
  color: white;
}
</style>
