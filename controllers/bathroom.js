/**
 * POST /bathroom/occupied
 * Login page.
 */
var BathroomStatus = require('../models/BathroomStatus');

exports.occupied = function(req, res) {
  BathroomStatus.findOne({br_id : req.query.bathroom_id}, function(err, br){
    console.log(br);
  	br.in_use = true;
  	br.start_time = new Date();
  	br.save()
  });
	res.status(200).end()
};

exports.unoccupied = function(req, res) {
  BathroomStatus.findOne({br_id : req.query.bathroom_id}, function(err, br){
    console.log(br);
  	br.in_use = false;
  	br.uses.push({start_time : br.start_time, end_time : new Date()})
    var summ = 0;
    for(var i = 0; i < br.uses.length; i++){
      summ += Math.round((br.uses[i].end_time - br.uses[i].start_time)/1000);
    }
    br.average = Math.round(summ/br.uses.length);
    br.total_burn = Math.round(summ*0.00961527777) //estimated
    br.start_time = new Date();
  	br.save()
  });
	res.status(200).end()
};

exports.like = function(req, res){
   BathroomStatus.findOne({br_id : req.query.bathroom_id}, function(err, br){
    if(br.total_likes != null){
      br.total_likes += 1;
    }
    else{
      br.total_likes = 1;
    }
    br.save()
  });
  res.status(200).end()
}

exports.dislike = function(req, res){
   BathroomStatus.findOne({br_id : req.query.bathroom_id}, function(err, br){
    if(br.total_dislikes != null){
      br.total_dislikes += 1;
    }
    else{
      br.total_dislikes = 1;
    }
    br.save()
  });
  res.status(200).end()

}