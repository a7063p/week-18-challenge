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

    }
    // thoughts: [
    //     {
    //         type: Schema.Types.ObjectId,
    //         ref: 'Thoughts'
    //     }
    // ]
}
// {
//     toJSON: {
//         virtuals: true,
//         getters: true
//     },
//     id: false
// }
)

// get total count of thoughts and friends on retrieval
// UserSchema.virtual('thoughtsCount').get(function() {
//     return this.thoughts.length    
// });

const User= model('User', UserSchema)

module.exports = User