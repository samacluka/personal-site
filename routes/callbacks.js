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

Array.prototype.bsReduction = function(cls){
  var i = this.indexOf(cls);
  if(i == -1) return '';

  var before = i !== 0 ? 'd-none' : '';
  var after = typeof this[i+1] !== 'undefined' ? `d${this[i+1]}-none` : '';
  return `${before} d${cls}-flex ${after}`;
}


// ======================================== INDEX ========================================
// GET
callbacks.index.get.landing = function(req,res){
  var bss = ['', '-sm', '-md', '-lg' /*, '-xl' */];
  var sizes = [{ chunk: 3, bs: '-lg' }, { chunk: 2, bs: '-md' }, { chunk: 1, bs: '-sm' }];

  const arr = require(rootDir+'data/team.js'); 
  var team = [];

  sizes.forEach(size => {
    team[size.chunk] = arr.chunk(size.chunk);  
  });

  return res.render(views.index.landing, {
    team: team,
    sizes: sizes,
    bss: bss
  });
};

// ======================================== EXPORT ========================================
module.exports = callbacks;
