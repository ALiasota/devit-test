import Post from 'models/post'

interface IGetPosts {
  search?: string
  skip?: number
  limit?: number
  sort?: string
}

export class PostService {
  static rssPosts: any

  static async setPosts(newPosts: any) {
    this.rssPosts = newPosts
  }

  static async getPosts({ search, skip, limit, sort }: IGetPosts) {
    let model = null
    console.log(typeof search)
    if (!search) {
      model = { title: { $regex: search, $options: 'i' } }
    } else {
      model = {}
    }
    console.log(model)
    const result = await Post.aggregate([
      { $match: model },
      {
        $facet: {
          stage1: [{ $group: { _id: null, count: { $sum: 1 } } }],
          stage2: [
            { $sort: sort === 'title' ? { title: 1 } : { createdAt: -1 } },
            { $skip: skip ? skip : 0 },
            { $limit: limit ? limit : 10 },
            { $lookup: { from: 'users', localField: 'user', foreignField: '_id', as: 'userData' } },
            { $unwind: '$userData' },
            { $addFields: { name: '$userData.name' } },
            {
              $project: {
                title: 1,
                content: 1,
                _id: 1,
                name: 1
              }
            }
          ]
        }
      },
      { $unwind: '$stage1' },
      {
        $project: {
          totalCount: '$stage1.count',
          loans: '$stage2'
        }
      }
    ])
    console.log(result)
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
