import mongoose from 'mongoose';
import bcrypt from 'bcrypt';

const SALT_ROUNDS = 8;

const usersSchema = new mongoose.Schema({
    firstName: {
        type: String,
        required: true
      },
      lastName: {
        type: String,
        required: true
      },
    username: {
        type: String,
        minLength: 3,
        maxLength: 20
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        // minLength: 8,
       
        required: true
    },
    dateOfBirth: {
        type: Date,
        required: true
    },
 
},{
    timestamps: true,
    toJSON: {
        transform: function(doc, retDoc) {
            delete retDoc.password; //removes passowrd from the json doc
            return retDoc;
        }
    }
});

usersSchema.index({email: 1});
usersSchema.index({username: 1});


// to encrypt password for frontend
usersSchema.pre('save', async function(next) {
    // if the password has not change continue
    if (!this.isModified("password")) return next();

    this.password = await bcrypt.hash(this.password, SALT_ROUNDS);
    return next();
});

export default mongoose.model('Users', usersSchema);
