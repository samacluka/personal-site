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
Array.prototype.chunk = function(perChunk){
  return this.reduce((resultArray, item, index) => { 
    const chunkIndex = Math.floor(index/perChunk);

    if(!resultArray[chunkIndex]) {
      resultArray[chunkIndex] = [];
    }

    resultArray[chunkIndex].push(item);

    return resultArray;
  }, []);
}

Array.prototype.groupBy = function(group){
  var resultArray = {};
  
  this.forEach(val => {
    if(typeof val[group] !== 'undefined'){
      if(typeof resultArray[val[group]] !== 'undefined'){
        resultArray[val[group]].push(val);
      }
      else {
        resultArray[val[group]] = [val];
      }
    }
  });

  return resultArray;
}

// ======================================== INDEX ========================================
// GET
callbacks.index.get.landing = function(req,res){
  var abouts = require(rootDir+'data/about.js').groupBy('group');
  var socials = require(rootDir+'data/socials.js');
  var skills = require(rootDir+'data/skills.js').groupBy('group');

  return res.render(views.index.landing, {
    abouts: abouts,
    socials: socials,
    skills: skills
  });
};

// ======================================== EXPORT ========================================
module.exports = callbacks;
