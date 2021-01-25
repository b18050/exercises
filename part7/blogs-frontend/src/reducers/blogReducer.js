import blogService from '../services/blogs'

export const intializeBlogs = (blogs) => {
    return {
        type: 'INIT_BLOGS',
        data: blogs,
    }
}

export const createBlog = (blog) => {
    return {
        type: 'NEW_BLOG',
        data: blog 
    }
}

export const likeBlog = (id) => {
    return {
        type: 'LIKE_BLOG',
        data: {id}
    }
}

export const removeBlog = (id) => {
    return {
        type: 'REMOVE_BLOG',
        data: {id}
    }
}

export const addComment = ({comment,id}) => {
    return {
        type: 'COMMENT_BLOG',
        data: { comment,id }
    }
}

const blogReducer = ( state = [], action ) => {

    console.log('state now',state)
    console.log(action)
    switch (action.type){
        case 'INIT_BLOGS':
            return action.data
        case 'NEW_BLOG':
            return [...state, action.data]
        case 'LIKE_BLOG':
            const id = action.data.id
            const blogToLike = state.find(b => b.id === id)
            const likedBlog = {
                ...blogToLike,
                likes: blogToLike.likes + 1
            }
            return state.map(blog => blog.id !== id ? blog : likedBlog
                )
        case 'REMOVE_BLOG':
            const blogid = action.data.id
            const newState = state.filter(b => b.id !== blogid) 
            return newState
        case 'COMMENT_BLOG':
            const comment = action.data.comment
            const blogToComment = state.find(b => b.id = action.data.id)
            const commentedBlog = {
                ...blogToComment,
                comments: [...blogToComment.comments,comment]
            }
            blogService.comment(commentedBlog)
            return state.map(blog => blog.id !== action.data.id ? blog : commentedBlog)
        default :
            return state
    }
}
export default blogReducer

