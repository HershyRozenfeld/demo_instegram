const users = new Array(10).fill(0).map((_, i) => ({
  id: i + 1,
  username: `user_${i + 1}`,
  avatar: `https://i.pravatar.cc/64?img=${i + 10}`
}));

export default function StoryBar() {
  return (
    <div style={styles.wrap}>
      {users.map((u) => (
        <div key={u.id} style={styles.item}>
          <img src={u.avatar} alt={u.username} style={styles.avatar} />
          <small>{u.username}</small>
        </div>
      ))}
    </div>
  );
}

const styles: Record<string, React.CSSProperties> = {
  wrap: {
    display: 'flex',
    gap: 12,
    overflowX: 'auto',
    padding: '8px 12px',
    border: '1px solid #eee',
    borderRadius: 8,
    margin: '16px auto',
    maxWidth: 640,
    background: '#fff'
  },
  item: { display: 'grid', justifyItems: 'center' },
  avatar: { width: 56, height: 56, borderRadius: '50%', border: '2px solid #e1306c' }
};

