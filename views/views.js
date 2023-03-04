var path = require("path");

const viewsDir = path.join(__dirname, "/");

const views = {
    index: {
      landing: viewsDir + "index/landing"
    }
};

module.exports = views;
