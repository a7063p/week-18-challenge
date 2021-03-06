const { Schema, model } = require ('mongoose');


const UserSchema = new Schema ({
    username: {
        type: String,
        unique: true,
        required: 'Username cannot be empty',
        trim: true
    },

    email: {
        type: String,
        required: 'A valid email is required', 
        unique: true,
        match: [/.+@.+\..+/],
        trim: true

    },
    
    thoughts: [
        {
            type: Schema.Types.ObjectId,
            ref: 'Thought'
        }
    ],
    friends: [
        {
            type: Schema.Types.ObjectId,
            ref: 'User',
            unique: true
        }
    ]
},
{
    toJSON: {
        virtuals: true,
        
    },
    id: false
}
);
//get total count of thoughts
UserSchema.virtual('thoughtsCount').get(function() {
    return this.thoughts.length    
});
//get total count of friends
UserSchema.virtual('friendCount').get(function() {
    return this.friends.length    
});

const User= model('User', UserSchema)

module.exports = User;