import Parser from 'rss-parser'
import { setPosts } from 'services/post.service'

const parser = new Parser()

let posts = null

async function parseRSSFeed() {
  try {
    posts = await parser.parseURL(process.env.RSS_URL as string)
    setPosts(posts)
  } catch (error) {
    console.error('Error parsing RSS feed:', error)
  }
}

export default parseRSSFeed
