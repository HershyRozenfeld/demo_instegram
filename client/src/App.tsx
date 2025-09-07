import './index.css'
import Header from './components/Header'
import StoryBar from './components/StoryBar'
import NewPostForm from './components/NewPostForm'
import Feed from './components/Feed'
import { createPost } from './api'

function App() {
  async function handleCreate(data: { imageUrl: string; caption: string }) {
    await createPost(data)
  }

  return (
    <div>
      <Header />
      <main style={{ padding: 12 }}>
        <NewPostForm onCreate={handleCreate} />
        <StoryBar />
        <Feed />
      </main>
    </div>
  )
}

export default App
