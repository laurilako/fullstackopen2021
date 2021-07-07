const _ = require("lodash")

const dummy = (blogs) => {
    if(blogs) {return 1}
}

const totalLikes = (blogs) => {
    return(
        blogs.reduce((tot, blog) => tot + blog.likes, 0)
    )
}

const favoriteBlog = (blogs) => {
    const fav = blogs.reduce((prev, curr) => (prev.likes > curr.likes) ? prev : curr, 1)
    return({
        title: fav.title,
        author: fav.author,
        likes: fav.likes
    })
}

const mostBlogs = (blogs) => {
    const authors = blogs.map((obj => obj.author))
    const result = _.values(_.groupBy(authors)).map(d => ({author: d[0], blogs: d.length}))
    return(
        result.pop()
    )
}

const mostLikes = (blogs) => {
    const authors = blogs.map((obj => (
        {
            author: obj.author,
            likes: obj.likes
        }
        )))
    const res = Array.from(authors.reduce(
        (x, {author, likes}) => x.set(author, (x.get(author) || 0) + likes), new Map
      ), ([author, likes]) => ({author, likes}))
    return(
        res.reduce((prev, curr) => (prev.likes > curr.likes) ? prev : curr, 1)
        )
}

module.exports = { dummy, totalLikes, favoriteBlog, mostBlogs, mostLikes }