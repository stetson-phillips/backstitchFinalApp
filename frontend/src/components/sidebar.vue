<template>
  <div class="sidebar">
    <div class="sidebar-backdrop"></div>

    <div class="sidebar-panel">
      <slot>
        <div class="container" style="">
          <div class="user-container">
            <p id="username">Welcome, {{ userName }}</p>
            <a href="/logout">
              <button id="logoutbtn" @click="$emit('login-changed', openLogin)">
                Log Out
              </button>
            </a>
          </div>
        </div>

        <hr style="margin-top:20px" />
        <div>
          <router-link
            to="/AddContent"
            style="color:black;text-decoration:none"
          >
            <p class="add-content" @click="$emit('add-content', addContent)">
              <span style="float:left">&#43;</span>
              <span style="float:center">Add content</span>
            </p>
          </router-link>
        </div>
        <div style="padding:8px 0">
          <div class="dropdown">
            <button class="dropbtn">
              SORT BY
            </button>
            <div class="dropdown-content">
              <button class="dropbtn" @click="$emit('sort-by-titles')">
                Title
              </button>
              <button class="dropbtn" @click="$emit('sort-by-date')">
                Publish
              </button>
              <button class="dropbtn" @click="$emit('sort-by-description')">
                Description
              </button>
            </div>
          </div>
        </div>
        <h3 class="sidebar-headers">Feeds</h3>
        <button
          v-for="feed in feeds"
          :key="feed.feedKey"
          class="feedbtn"
          @click="$emit('feed-changed', feed.feedKey)"
        >
          {{ feed.displayName }}
        </button>
      </slot>
    </div>
  </div>
</template>

<script>
import axios from "axios";
export default {
  props: {
    loginStatus: Boolean,
    openLogin: Boolean,
    addContent: Boolean,
    feeds: {
      type: Array,
      default: () => []
    }
  },
  data() {
    return {
      userName: ""
    };
  },
  mounted() {
    axios
      .get("https://radiant-dusk-26016.herokuapp.com/username")
      .then(response => (this.userName = response.data));
  }
};
</script>

<style>
.container {
  display: flex;
}

.sidebar-panel {
  overflow-y: auto;
  background-color: #009966;
  position: fixed;
  left: 0;
  top: 0;
  height: 100vh;
  border-right: 1px solid black;
  /* z-index: 999; */
  padding: 3rem 20px 2rem 20px;
  width: 300px;
}

.sidebar-headers {
  color: rgb(192, 192, 192);
}

* {
  font-family: "Trebuchet MS", Helvetica, sans-serif;
  /* color: rgb(192, 192, 192); */
}

.user-container {
  height: 50px;
  width: 200px;
  position: relative;
  /* border: 3px solid green; */
  /* display: flex; */
  /* border: 1px solid black; */
}

.add-content {
  width: 250px;
  padding: 12px;
  align-content: center;
  text-align: center;
  border-color: rgb(112, 112, 112);
  background-color: white;
  font-family: "Trebuchet MS", sans-serif;
  /* color: rgb(105, 105, 105); */
  border-radius: 8px;
  cursor: default;
}

.dropbtn {
  background-color: transparent;
  /* color: rgb(192, 192, 192); */
  padding: 10px;
  font-size: 16px;
  border: none;
  width: 260px;
  text-align: left;
}

.dropbtn:hover {
  /* background-color: #009966; */
  transform: scale(1.1);
  transform: translateX(2%);
  display: block;
}

.feedbtn {
  background-color: transparent;
  /* color: rgb(192, 192, 192); */
  padding: 10px;
  font-size: 16px;
  border: none;
  width: 280px;
  text-align: left;
}

.feedbtn:hover {
  /* background-color: #009966; */
  transform: scale(1.1);
  transform: translateX(2%);
  display: block;
}

.dropdown {
  display: inline-block;
  position: relative;
}

.dropdown-content {
  display: none;
  position: absolute;
  width: 100%;
  overflow: auto;
  box-shadow: 0px 10px 10px 0px rgba(0, 0, 0, 0.4);
  background-color: white;
  border-radius: 10px;
}

.dropdown:hover .dropdown-content {
  display: block;
}

.dropdown-content a {
  display: block;
  color: #000000;
  padding: 5px;
  text-decoration: none;
}

.dropdown-content a:hover {
  color: #ffffff;
  background-color: #00a4bd;
}

#username {
  font-weight: bold;
  width: 260px;
  position: relative;
  top: 30%;
  transform: translateY(-50%);
}

#logoutbtn {
  position: absolute;
  top: 73%;
  left: 02%;
  transform: translateY(-50%);
  border: none;
  background: transparent;
  font-size: 10pt;
}

#signupbtn {
  border-radius: 20px;
  padding: 10px 40px;
}
</style>
