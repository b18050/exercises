const blogReducer = ( state = [], action ) => {

    console.log('state now',state)
    console.log(action)
    switch (action.type){
        case 'INIT_BLOGS':
            return action.data
        case 'NEW_BLOG':
            return [...state, action.data]
        default :
            return state
    }
}
export default blogReducer

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