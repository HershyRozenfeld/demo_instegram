export default function Header() {
  return (
    <header style={styles.header}>
      <span style={styles.logo}>InstaLite</span>
    </header>
  );
}

const styles: Record<string, React.CSSProperties> = {
  header: {
    position: 'sticky',
    top: 0,
    zIndex: 10,
    background: '#fff',
    borderBottom: '1px solid #eee',
    padding: '10px 16px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center'
  },
  logo: {
    fontWeight: 700,
    fontSize: 20
  }
};

