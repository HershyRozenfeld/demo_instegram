import { useState } from 'react';
import type { Post } from '../types';

type Props = {
  post: Post;
  onLike: (id: string) => Promise<void>;
  onComment: (id: string, text: string) => Promise<void>;
};

export default function PostCard({ post, onLike, onComment }: Props) {
  const [comment, setComment] = useState('');
  const [liking, setLiking] = useState(false);
  const [commenting, setCommenting] = useState(false);

  async function handleLike() {
    setLiking(true);
    try {
      await onLike(post.id);
    } finally {
      setLiking(false);
    }
  }

  async function handleComment(e: React.FormEvent) {
    e.preventDefault();
    if (!comment.trim()) return;
    setCommenting(true);
    try {
      await onComment(post.id, comment);
      setComment('');
    } finally {
      setCommenting(false);
    }
  }

  return (
    <article style={styles.card}>
      <header style={styles.header}>
        <img src={post.user.avatarUrl} alt={post.user.username} style={styles.avatar} />
        <strong>{post.user.username}</strong>
      </header>
      <img src={post.imageUrl} alt={post.caption} style={styles.image} />
      <div style={styles.actions}>
        <button onClick={handleLike} disabled={liking} style={styles.actionBtn}>
          ❤️ {post.likes}
        </button>
      </div>
      <div style={styles.caption}>
        <strong>{post.user.username}</strong> {post.caption}
      </div>
      {post.comments.length > 0 && (
        <ul style={styles.comments}>
          {post.comments.map((c) => (
            <li key={c.id}><strong>{c.user.username}</strong> {c.text}</li>
          ))}
        </ul>
      )}
      <form onSubmit={handleComment} style={styles.commentForm}>
        <input
          placeholder="הוסיפו תגובה..."
          value={comment}
          onChange={(e) => setComment(e.target.value)}
          style={styles.commentInput}
        />
        <button style={styles.postBtn} disabled={commenting}>שליחה</button>
      </form>
    </article>
  );
}

const styles: Record<string, React.CSSProperties> = {
  card: {
    border: '1px solid #eee',
    borderRadius: 8,
    margin: '16px auto',
    maxWidth: 640,
    background: '#fff',
    overflow: 'hidden'
  },
  header: { display: 'flex', alignItems: 'center', gap: 8, padding: 12 },
  avatar: { width: 32, height: 32, borderRadius: '50%' },
  image: { width: '100%', display: 'block' },
  actions: { padding: '8px 12px' },
  actionBtn: { border: '1px solid #eee', background: '#fafafa', padding: '6px 10px', borderRadius: 6, cursor: 'pointer' },
  caption: { padding: '0 12px 8px' },
  comments: { listStyle: 'none', padding: '0 12px 8px', margin: 0, display: 'grid', gap: 4 },
  commentForm: { display: 'flex', padding: 12, gap: 8, borderTop: '1px solid #f2f2f2' },
  commentInput: { flex: 1, border: '1px solid #ddd', borderRadius: 6, padding: '8px 10px' },
  postBtn: { border: '1px solid #ddd', background: '#fafafa', borderRadius: 6, padding: '8px 10px' }
};

