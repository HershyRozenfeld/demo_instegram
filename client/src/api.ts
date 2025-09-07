import type { Post, Comment } from './types';

const base = '';

export async function getPosts(): Promise<Post[]> {
  const res = await fetch(`${base}/api/posts`);
  if (!res.ok) throw new Error('Failed to fetch posts');
  return res.json();
}

export async function createPost(input: { imageUrl: string; caption: string }): Promise<Post> {
  const res = await fetch(`${base}/api/posts`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(input)
  });
  if (!res.ok) throw new Error('Failed to create post');
  return res.json();
}

export async function likePost(id: string, action: 'like' | 'unlike' = 'like'): Promise<{ id: string; likes: number }> {
  const res = await fetch(`${base}/api/posts/${id}/like`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ action })
  });
  if (!res.ok) throw new Error('Failed to like');
  return res.json();
}

export async function addComment(id: string, text: string): Promise<Comment> {
  const res = await fetch(`${base}/api/posts/${id}/comments`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ text })
  });
  if (!res.ok) throw new Error('Failed to comment');
  return res.json();
}

