import Post from 'models/post'
import { ObjectId } from 'mongodb'

interface IGetPosts {
  search?: string
  skip?: number
  limit?: number
  sort?: string
}

interface IPost {
  _id?: typeof ObjectId
  title: string
  content: string
  creator: string
  createdAt: Date | string
}

export class PostService {
  static rssResponse: any

  static async setRssPosts(newPosts: any) {
    this.rssResponse = newPosts
  }

  static async getPosts({ search, skip = 0, limit = 10, sort }: IGetPosts) {
    console.log({ search, skip, limit, sort })
    let allPosts: IPost[] = []
    // let finallyPosts: IPost[] = []
    let totalCount = 0
    const rssPosts: IPost[] =
      this.rssResponse && this.rssResponse.items
        ? this.rssResponse.items.map((item: any) => ({
            title: item.title,
            content: item.content,
            creator: item.creator,
            createdAt: new Date(item.isoDate)
          }))
        : []

    const postsDB = await this.getPostsDB({ search, skip, limit, sort })
    if (!postsDB) {
      allPosts = rssPosts
    } else {
      allPosts = [...postsDB.posts, ...rssPosts]
    }
    if (search) allPosts = allPosts.filter(post => post.title.includes(search))
    if (sort === 'title') allPosts.sort((a, b) => (a.title > b.title ? 1 : -1))
    totalCount = allPosts.length
    allPosts = allPosts.slice(skip, skip + limit)
    return { allPosts, totalCount }
  }

  static async getPostsDB({ search, skip, limit, sort }: IGetPosts) {
    const result = await Post.aggregate([
      { $match: search ? { title: { $regex: search, $options: 'i' } } : {} },
      {
        $facet: {
          stage1: [{ $group: { _id: null, count: { $sum: 1 } } }],
          stage2: [
            { $sort: sort === 'title' ? { title: 1 } : { createdAt: -1 } },
            { $skip: skip ? skip : 0 },
            { $limit: limit ? limit : 10 },
            { $lookup: { from: 'users', localField: 'user', foreignField: '_id', as: 'userData' } },
            { $unwind: '$userData' },
            { $addFields: { creator: '$userData.name' } },
            {
              $project: {
                title: 1,
                content: 1,
                _id: 1,
                creator: 1,
                createdAt: 1
              }
            }
          ]
        }
      },
      { $unwind: '$stage1' },
      {
        $project: {
          totalCount: '$stage1.count',
          posts: '$stage2'
        }
      }
    ])
    console.log(result[0])
    return result[0]
  }

  static async createPost(userId: string, title: string, content: string) {
    const post = await Post.create({ user: userId, title, content })
    return post
  }

  static async updatePost(postId: string, title?: string, content?: string) {
    const post = await Post.findByIdAndUpdate(postId, { title, content })
    return post
  }

  static async deletePost(postId: string) {
    const post = await Post.findByIdAndDelete(postId)
    return post
  }
}
