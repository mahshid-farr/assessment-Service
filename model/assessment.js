const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const assessmentSchema = new Schema({
    assessment_type:{
        type: mongoose.SchemaTypes.ObjectId,
        ref: "AssessmentType",
        require: true
    },
    candidate:{
        type: mongoose.SchemaTypes.ObjectId,
        ref: "Candidate",
        require: true
    },
    compelete:{type: Boolean, require: false},
    start:{type: Date, require: false},
    end:{type: Date, require: false},
    remainedAttempts:{type: Number, require: false},
    timeCreated:{type: Date, require: false}
});

module.exports = mongoose.model('Assessment', assessmentSchema);