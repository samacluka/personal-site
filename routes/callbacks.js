const rootDir = "../";

const views           = require(rootDir+"views/views.js");

var callbacks = {
  index: {
      get: {
        // landing
      },
  }
};

// ======================================== INDEX ========================================
// GET
callbacks.index.get.landing = function(req,res){
  return res.render(views.index.landing);
};

// ======================================== EXPORT ========================================
module.exports = callbacks;
