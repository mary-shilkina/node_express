
const {Schema,model}= require ('mongoose');

const course = new Schema({
   title:{
     type:String,
     required:true
   },
   price:{
     type: Number,
     required:true
   },
   img: String,
   desc:{
     type:String,
     required:true
   },
   userId:{
    type: Schema.Types.ObjectId,
    ref:'User'
  },
   level:{
     type:String,
   },
  type:{
    type:String,
  }

})

course.method('toClient',function(){
  const course = this.toObject()
  course.id=course._id
  delete course._id
  return course
})
 
/*course.methods.updateReviewsData =  function (review,course_id,user_id) {
  const items=[...this.reviews];
  const coursee=
  const Index = .findIndex((id) => id._id.toString() === course_id.toString());
  if (Index === -1) {
    items.push({
      userId: user_id,
      review:review
    });
    if (review) {
      items.countReviews += 1;
    }
  } else {
   items.splice(Index, 1);
    if (review) {
      items.countReviews -= 1;
    }
  }
  this.reviews={items}
  return  this.save();
};

/*course.method.increaseCountReviews = async function () {
  this.countReviews += 1;
  return await this.save();
};*/
 
 module.exports = model('Course',course) 