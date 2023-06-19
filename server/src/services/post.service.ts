let posts: any = null

// export default parseRSSFeed;

export const setPosts = (newPosts: any) => {
  posts = newPosts
}

export const getPosts = () => {
  return posts
}
