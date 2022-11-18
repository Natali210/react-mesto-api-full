const MONGO_DB_CODE = 11000;
const regex = /https?:\/\/(www\.)?[-a-z0-9A-Z:%._~#=]{1,150}\.[a-z0-9A-Z()]{1,10}\b([-a-z0-9A-Z()@:%_.~#?&//=]*)/;

module.exports = {
  MONGO_DB_CODE,
  regex,
};
