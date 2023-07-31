import { IRequest } from 'middlewares/autentificate'
import { PostService } from '../services/post.service'
import { Request, Response } from 'express'
const puppeteer = require('puppeteer')

export const getAllPosts = async (req: Request) => {
  const { search, skip, limit, sort } = req.query
  const posts = await PostService.getPosts({
    search: search ? String(search) : undefined,
    skip: skip ? Number(skip) : undefined,
    limit: limit ? Number(limit) : undefined,
    sort: sort ? String(sort) : undefined
  })
  return posts
}

export const addPost = async (req: IRequest, res: Response) => {
  const user = req.user
  if (!user) return res.status(401).end('User not found')
  const { title, content } = req.body
  const post = await PostService.createPost(user.id, title, content)
  return post
}

export const updatePost = async (req: IRequest, res: Response) => {
  const { title, content, postId } = req.body
  const post = await PostService.updatePost(postId, title, content)
  if (!post) return res.status(400).end('Something went wrong')
  return post
}

export const mail = async (_req: IRequest, _res: Response) => {
  const browser = await puppeteer.launch(); // або const browser = await chromium.launch();
  const page = await browser.newPage();

  await page.goto('https://accounts.google.com/signin/v2/identifier', { waitUntil: 'networkidle2' });
    // Only needed if sign in requires you to click 'sign in with google' button.
    // await page.waitForSelector('button[data-test="google-button-login"]');
    // await page.waitFor(1000);
    // await page.click('button[data-test="google-button-login"]');

    // Wait for email input.
    await page.waitForSelector('#identifierId');
    let badInput = true;
  
    // Keep trying email until user inputs email correctly.
    // This will error due to captcha if too many incorrect inputs.
    while (badInput) {
      // const email = await prompt('Email or phone: ');
      await page.type('#identifierId', 'lyasota.andriy@gmail.com');
      await page.waitForTimeout(1000);
      await page.keyboard.press('Enter');
      await page.waitForTimeout(2000);
      badInput = await page.evaluate(() => document.querySelector('#identifierId[aria-invalid="true"]') !== null);
      if (badInput) {
        console.log('Incorrect email or phone. Please try again.');
        await page.click('#identifierId', { clickCount: 3 });
      }
    }
    // const password = await prompt('Enter your password: ', true);
    console.log('Finishing up...');
    // Wait for password input
    await page.type('input[type="password"]', '1Zxcvbn7890')
    await page.waitForTimeout(1000);
    await page.keyboard.press('Enter');

    // Отримання кількості непрочитаних листів
    await page.waitForSelector('[aria-label="Inbox"]');
    const unreadCount = await page.evaluate(() => {
      const inboxElement = document.querySelector('[aria-label="Inbox"]');
      const unreadCountText = inboxElement?.getAttribute('aria-label');
      const countMatch = unreadCountText?.match(/\d+/);
      return countMatch ? parseInt(countMatch[0]) : 0;
    });

    console.log(`Кількість непрочитаних листів: ${unreadCount}`);
  return unreadCount
}

export const deletePost = async (req: Request, res: Response) => {
  const { postId } = req.params
  const post = await PostService.deletePost(postId)
  if (!post) return res.status(400).end('Something went wrong')
  return post
}
