import Parser from 'rss-parser'
import { PostService } from 'services/post.service'

const parser = new Parser()

let posts = null

async function parseRSSFeed() {
  try {
    posts = await parser.parseURL(process.env.RSS_URL as string)
    PostService.setRssPosts(posts)
  } catch (error) {
    console.error('Error parsing RSS feed:', error)
  }
}

export default parseRSSFeed
