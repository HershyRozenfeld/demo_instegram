import { useState } from 'react';

type Props = {
  onCreate: (data: { imageUrl: string; caption: string }) => Promise<void>;
};

export default function NewPostForm({ onCreate }: Props) {
  const [imageUrl, setImageUrl] = useState('https://picsum.photos/seed/new/600/400');
  const [caption, setCaption] = useState('');
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!caption.trim() || !imageUrl.trim()) return;
    setLoading(true);
    try {
      await onCreate({ imageUrl, caption });
      setCaption('');
    } finally {
      setLoading(false);
    }
  }

  return (
    <form onSubmit={handleSubmit} style={styles.form}>
      <input
        style={styles.input}
        placeholder="Image URL"
        value={imageUrl}
        onChange={(e) => setImageUrl(e.target.value)}
      />
      <input
        style={styles.input}
        placeholder="כתוב/י כיתוב..."
        value={caption}
        onChange={(e) => setCaption(e.target.value)}
      />
      <button style={styles.button} disabled={loading}>
        {loading ? 'מפרסם...' : 'פרסם'}
      </button>
    </form>
  );
}

const styles: Record<string, React.CSSProperties> = {
  form: {
    display: 'flex',
    gap: 8,
    padding: 12,
    border: '1px solid #eee',
    borderRadius: 8,
    margin: '16px auto',
    maxWidth: 640,
    background: '#fff'
  },
  input: {
    flex: 1,
    padding: '8px 10px',
    border: '1px solid #ddd',
    borderRadius: 6
  },
  button: {
    padding: '8px 12px',
    border: '1px solid #ddd',
    background: '#fafafa',
    borderRadius: 6,
    cursor: 'pointer'
  }
};

