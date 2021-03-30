import mongoose from 'mongoose';
const { Schema } = mongoose;
const imageSchema = new Schema({
    name: String,
    
    
})
const Image = new Schema({
    name: {
        type:String,
        required: true,
    },
    type: {
        type: String,
        enum: ['svg', 'jpeg', 'jpg', 'png'],
        required: true,
    },
    uploaded: {
        type: Date,
        required: true,
        default: Date.now()
    },
    owner: {
        type: Schema.Types.ObjectId,
        required: true,
        ref: 'User'
    },
    kind: {
        type: String,
        enum: ["profile", "story_default", "story_content", "logo"],
        required: true,
    }
})

export default mongoose.model('Image', Image);