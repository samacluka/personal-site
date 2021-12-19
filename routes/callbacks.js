const rootDir = "../";

const views           = require(rootDir+"views/views.js");

var callbacks = {
  index: {
      get: {
        // landing
      },
  }
};
// ======================================= HELPER ========================================
Array.prototype.chunk = function(groupsize){
  var sets = [], chunks, i = 0;
  chunks = Math.ceil(this.length / groupsize);

  while(i < chunks){
      sets[i++] = this.splice(0, groupsize);
  }

  return sets;
};


// ======================================== INDEX ========================================
// GET
callbacks.index.get.landing = function(req,res){
  var team = require(rootDir+'data/team.js').chunk(3);
  return res.render(views.index.landing, {team: team});
};

// ======================================== EXPORT ========================================
module.exports = callbacks;
