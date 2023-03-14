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
  return this.reduce((retObj, item, index) => { 
    const chunkIndex = Math.floor(index/perChunk);

    if(!retObj[chunkIndex]) {
      retObj[chunkIndex] = [];
    }

    retObj[chunkIndex].push(item);

    return retObj;
  }, {});
}

Array.prototype.groupBy = function(field){
  return this.reduce((retObj, item) => {
    if(typeof item[field] === 'undefined') return retObj;

    if(typeof retObj[item[field]] === 'undefined') {
      retObj[item[field]] = [];
    }

    retObj[item[field]].push(item);

    return retObj;
  }, {});
}

Array.prototype.simpleSort = function(field){
  return this.sort((a, b) => {
    return a[field] > b[field] ? 1 : -1;
  });
}

// ======================================== INDEX ========================================
// GET
callbacks.index.get.landing = function(req,res){
  var abouts = require(rootDir+'data/about.js').groupBy('group');
  var socials = require(rootDir+'data/socials.js');
  var skills = require(rootDir+'data/skills.js').simpleSort('strength').reverse().groupBy('group');

  return res.render(views.index.landing, {
    abouts: abouts,
    socials: socials,
    skills: skills
  });
};

// ======================================== EXPORT ========================================
module.exports = callbacks;
