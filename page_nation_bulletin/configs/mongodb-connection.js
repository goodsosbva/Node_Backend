const { MongoClient } = require("mongodb");

// 환경변수에서 MongoDB URI 가져오기 (app.js에서 이미 dotenv 로드됨)
const uri = process.env.MONGODB_URI;

module.exports = function (callback) {
  return MongoClient.connect(uri, callback);
};
