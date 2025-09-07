import express from 'express';
import cors from 'cors';
import { nanoid } from 'nanoid';

const app = express();
const PORT = process.env.PORT || 3001;

app.use(cors());
app.use(express.json());

const you = {
  id: 'you',
  username: 'you',
  avatarUrl: 'https://i.pravatar.cc/100?img=15'
};

let posts = [
  {
    id: 'p1',
    user: { username: 'alice', avatarUrl: 'https://i.pravatar.cc/100?img=1' },
    imageUrl: 'https://picsum.photos/seed/insta1/600/400',
    caption: 'Hello from the beach 🏖️',
    likes: 12,
    comments: [
      { id: 'c1', user: { username: 'bob' }, text: 'וואו נראה מדהים!' }
    ],
    createdAt: Date.now() - 1000 * 60 * 60 * 24
  },
  {
    id: 'p2',
    user: { username: 'charlie', avatarUrl: 'https://i.pravatar.cc/100?img=5' },
    imageUrl: 'https://picsum.photos/seed/insta2/600/400',
    caption: 'קפה של בוקר ☕',
    likes: 5,
    comments: [],
    createdAt: Date.now() - 1000 * 60 * 60 * 6
  }
];

app.get('/api/health', (_req, res) => {
  res.json({ ok: true });
});

app.get('/api/posts', (_req, res) => {
  const sorted = [...posts].sort((a, b) => b.createdAt - a.createdAt);
  res.json(sorted);
});

app.post('/api/posts', (req, res) => {
  const { imageUrl, caption } = req.body || {};
  if (!imageUrl || !caption) {
    return res.status(400).json({ error: 'imageUrl and caption are required' });
  }
  const post = {
    id: nanoid(),
    user: { username: you.username, avatarUrl: you.avatarUrl },
    imageUrl,
    caption,
    likes: 0,
    comments: [],
    createdAt: Date.now()
  };
  posts.unshift(post);
  res.status(201).json(post);
});

app.post('/api/posts/:id/like', (req, res) => {
  const { id } = req.params;
  const { action } = req.body || {};
  const post = posts.find(p => p.id === id);
  if (!post) return res.status(404).json({ error: 'Post not found' });
  if (action === 'unlike') {
    post.likes = Math.max(0, post.likes - 1);
  } else {
    post.likes += 1;
  }
  res.json({ id: post.id, likes: post.likes });
});

app.post('/api/posts/:id/comments', (req, res) => {
  const { id } = req.params;
  const { text } = req.body || {};
  if (!text) return res.status(400).json({ error: 'text is required' });
  const post = posts.find(p => p.id === id);
  if (!post) return res.status(404).json({ error: 'Post not found' });
  const comment = { id: nanoid(), user: { username: you.username }, text };
  post.comments.push(comment);
  res.status(201).json(comment);
});

app.listen(PORT, () => {
  console.log(`API listening on http://localhost:${PORT}`);
});

