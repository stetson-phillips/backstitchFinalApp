import axios from "axios";

export const saveFeed = async feed => {
  console.log(feed);
  const { data } = await axios.post(
    "https://radiant-dusk-26016.herokuapp.com/userFeeds",
    feed
  );
  console.log(data);
  return data;
};
