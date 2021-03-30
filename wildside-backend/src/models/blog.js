import mongoose from 'mongoose';
const { Schema } = mongoose;
const Color = new Schema({
    r :{
        required: true,
        type: Number,
        default: 255,
        min: 0,
        max: 255
    },
    g :{
        required: true,
        type: Number,
        default: 255,
        min: 0,
        max: 255
    },
    b :{
        required: true,
        type: Number,
        default: 255,
        min: 0,
        max: 255
    },
    a :{
        required: true,
        type: Number,
        default: 1,
        min: 0,
        max: 1
    }
})
const Font = new Schema({
  name: {
      type: String,
      required: true,
      unique: true,
  },
  label: {
    type: String,
    required: true,
    unique: true,
} 
})
const blogSchema = new Schema({
    name: {
        type: String,
        required: true,
        unique: true
    },
    style: {
        color: {
            type: Color,
            required: false
        },
        fonts: {
            type:[Font],
            required: false,
        }
    },
    logo: String,
})

export default mongoose.model('Blog', blogSchema);