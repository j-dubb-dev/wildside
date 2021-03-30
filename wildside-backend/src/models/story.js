import mongoose from 'mongoose';
const { Schema } = mongoose;

const StyledText = new Schema({
    to: {
        type: String,
        required: () => this.type === 'link'
    },
    type: {
        type:String,
        enum: ['link', 'code', 'bold', 'italic']
    },
    start: {
        type: Number,
        required: true,
        default: 0,
        min: 0,
        validate: {
            validator: () => {
                let ref = []
                let invalid_index = false;
                if (this.type === 'link') {
                    ref = this.parent().links
                    invalid_index = refs.map((link)=> {
                        if( link.to == this.to) return false;
                        else return this.start > link.start && this.start <= this.link.end;
                    }).reduce((sum, next) => sum || next, false);
                }  
                return this.start <= this.parent().content.length - 1 && !invalid_index
            },
            message: props => `Start index ${props.start} overlaps with another style's indices or is out of bounds`
        },
        integer: true,
    },
    end:{
        type: Number,
        required: true,
        default: 0,
        min: 0,
        integer: true,
        validate: {
            validator: () => {
                let ref = []
                let invalid_index = false;
                if (this.type === 'link') {
                    ref = this.parent().links
                    invalid_index = refs.map((link)=> {
                        if( link.to == this.to) return false;
                        else return this.end > link.start && this.end <= this.link.end;
                    }).reduce((sum, next) => sum || next, false);
                }  
                return this.end <= this.parent().content.length && !invalid_index
            },
            message: props => `End index ${props.end} overlaps with another style's indices or is out of bounds`
        },
    }
   
})
const Image = new Schema({
    id_ref: {
        type: Schema.Types.ObjectId,
        ref: 'Image',
        required: true,
    },
    order: {
        type: Number,
        required: true,
        integer: true,
    }

})
const Paragraph = new Schema({
    content: {
        type: String,
        required: true,
    },
    styled_text: [
        StyledText
    ],
    order: {
        type: Number,
        required: true,
        integer: true,
    },
    style: {
        accent: {
            type: Boolean,
            required: true,
            default: false,
        },
        indent: {
            type: Boolean,
            required: true,
            default: false,
        },
        roundedCorners: {
            type: Boolean,
            required: true,
            default: false,
        },
        font: String,
        weight: {
            type: String,
            enum: ['light', 'normal', 'semi-bold', 'bold', 'extra-bold'],
            default: 'normal'
        },
        size: {
            type: String,
            enum: ['xxs', 'xs', 'sm', 'md', 'lg', 'xl', 'xxl'],
            default: 'normal'
        },
        padding: String,
        margin: String,
        backgroundColor: String,
    }
})
const storySchema = new Schema({
    title: {
        type: String,
        required: true
    },
    subtitle: {
        type: String,
        required: true,
    },
    
    author: {
        type: Schema.Types.ObjectId,
        required:true,
        ref: 'User'
    },
    draft: {
        type: Boolean,
        required: true,
        default: true,
    },
    blog: {
        type: Schema.Types.ObjectId,
        required:true,
        ref: 'Blog'
    },
    published_date: {
        type: Date,
        required: false,
    },
    last_updated: {
        type: Date,
        required: true,
        default: Date.now()
    },
    paragraphs: {
        type: [
            Paragraph
        ],
        required: true,
        default: []
    },
    images: {
        type: [
            Image
        ],
        required: true,
        default: []
    },
    style: {
        font: String,
    }
    
})
storySchema.index({title:1, blog:1})

export default mongoose.model('Story', storySchema);