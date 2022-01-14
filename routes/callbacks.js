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
  var team = require(rootDir+'data/team.js');
  var services = require(rootDir+'data/services.js').groupBy('group');

  return res.render(views.index.landing, {
    team: team,
    services: services
  });
};

// ======================================== EXPORT ========================================
module.exports = callbacks;
