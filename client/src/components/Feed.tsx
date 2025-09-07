import { useEffect, useState } from 'react';
import { addComment, getPosts, likePost } from '../api';
import type { Post } from '../types';
import PostCard from './PostCard';

export default function Feed() {
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  async function refresh() {
    try {
      setLoading(true);
      const data = await getPosts();
      setPosts(data);
      setError(null);
    } catch (e) {
      setError('שגיאה בטעינת הפיד');
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    refresh();
  }, []);

  async function handleLike(id: string) {
    const res = await likePost(id, 'like');
    setPosts((prev) => prev.map((p) => (p.id === id ? { ...p, likes: res.likes } : p)));
  }

  async function handleComment(id: string, text: string) {
    await addComment(id, text);
    await refresh();
  }

  if (loading) return <p style={{ textAlign: 'center', marginTop: 40 }}>טוען...</p>;
  if (error) return <p style={{ textAlign: 'center', marginTop: 40 }}>{error}</p>;

  return (
    <section>
      {posts.map((p) => (
        <PostCard key={p.id} post={p} onLike={handleLike} onComment={handleComment} />)
      )}
    </section>
  );
}

