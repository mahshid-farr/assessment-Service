const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const assessmentTypeSchema = new Schema({
    title:{type: String, require: true},
    description:{type: String, require: true},
    category:{type: String, require: false},
    session:{
        type: mongoose.SchemaTypes.ObjectId,
        ref: "BotInterviewSession",
        require: false
    },
    estCompletionTime:{type: Number, min:1, require: true},
    avgCompletionTime:{type: Number, require: false},
    userAttempts:{type: Number, require: false},
    xp:{type: Number, min:0, require: false},
    allowedAttempts:{type: Number, require: false}
});

module.exports = mongoose.model('AssessmentType', assessmentTypeSchema);