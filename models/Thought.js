const { Schema, model, Types } =require('mongoose');
const dateFormat = require('../utils/dateFormat');

const ReactionSchema = new Schema({   
    
    reactionId: {
        type: Schema.Types.ObjectId,
        default: () => new Types.ObjectId()
      },
    reactionBody: {
        type: String,
        required: true,
        trim: true,
        minLength: 1,
        maxLength: 280
    },
    username: {
        type: String,
        required: true,
        trim: true
    },
    createdAt: {        
        type: Date,
        default: Date.now,
        get: createdAtVal => dateFormat(createdAtVal)                
    },
    },
    {
        toJSON: {
            virtuals: true,
            getters: true
        },
        id: false
        
        
    }
)

const ThoughtSchema = new Schema ({
   
    thoughtText: {
    type: String,
    required: 'You must enter your Thought!',
    minLength: [1, 'Thats not enough of a thought'],
    maxLength: [280, 'You can only have 280 characters']
    },

    createdAt: {        
    type: Date,
    default: Date.now,
    get: createdAtVal => dateFormat(createdAtVal)
        
    },

    username: {
        type: String,
        required: "Please Enter a User name"
    },
    reactions: [ReactionSchema]
},
{
    toJSON: {
        virtuals: true,
        getters: true
    },
    id: false
}
);
ThoughtSchema.virtual('reactionCount').get(function(){
    return this.reactions.length
});


const Thought = model('Thought', ThoughtSchema);

module.exports = Thought;
