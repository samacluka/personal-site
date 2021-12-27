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
  // var team = require(rootDir+'data/team.js').chunk(3);

  var team = ([
    {
        name: "Luka Samac",
        image: "/images/luka_samac.png",
        description: "Graduating with a degree in Mechatronics Engineering and Management from McMaster University Luka consistently trades knowledge depth for breadth. Exemplified by his past experiences from working on drone research and the automation industry to managing funds over $200,000 Luka draws on an array of experiences to develop unique solutions. Personally, Luka enjoys being outside and active. If you can't find him portaging he may be rock climbing instead."
    },
    {
        name: "Justin Ballaro",
        image: "",
        description: "Coolest guy alive."
    },
    {
        name: "Dan Pietrangelo",
        image: "",
        description: "Coolest guy alive."
    },
    {
        name: "Max",
        image: "",
        description: "Coolest guy alive."
    },
    {
        name: "Flavio",
        image: "",
        description: "Coolest guy alive."
    },
    {
        name: "Stephon",
        image: "",
        description: "Coolest guy alive."
    },
    {
        name: "Chris Adams",
        image: "",
        description: "Coolest guy alive."
    },
  ]).chunk(3);

  return res.render(views.index.landing, {team: team});
};

// ======================================== EXPORT ========================================
module.exports = callbacks;
