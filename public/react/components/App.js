import React, { useEffect, useState } from 'react'


// import and prepend the api url to any fetch calls
import apiURL from '../api'

export const App = () => {
  const [pages, setPages] = useState([])
  const [currentPage, setCurrentPage] = useState(null)
  const [newPage, setNewPage] = useState(false)
  const [newTitle, setNewTitle] = useState("")
  const [newContent, setNewContent] = useState("")
  const [newAuthor, setNewAuthor] = useState("")
  const [newEmail, setNewEmail] = useState("")
  const [newTag, setNewTag] = useState("")

  async function fetchArticle (slug) {
    const response = await fetch(`${apiURL}/wiki/${slug}`)
    const articleData = await response.json()
    setCurrentPage(articleData)
  }

  function goHome() {
    setCurrentPage(null)
  }

  function createPage() {
    setNewPage(true)
  }

  useEffect(() => {
    async function fetchPages () {
      try {
        const response = await fetch(`${apiURL}/wiki`)
        const pagesData = await response.json()
        setPages(pagesData)
      } catch (err) {
        console.log('Oh no an error! ', err)
      }
    }

    fetchPages()
  }, [])

  if (!currentPage) {
    return (
      <main>
        <h1>WikiVerse</h1>
        <h2>An interesting 📚</h2>
        <ul>{pages.map((page) => (
          <li key = {page.id}>
            <button onClick={() => fetchArticle(page.slug)}>{page.title}</button>
          </li>
        ))}</ul>
        <button onClick={createPage}>Create Page</button>
      </main>
    )
  }
  if (setNewPage) {
    return (
      <>
        <h1>WikiVerse</h1>
        <h2>Add a page</h2>
        <form>
          <label>
            <input
            type = "text"
            name = "title"
            value = {newTitle}
            onChange = {(event) =>setNewTitle(event.target.value)}
            />
          </label>

          <label>
            <input
            type = "text"
            name = "content"
            value = {newContent}
            onChange = {(event) =>setNewContent(event.target.value)}
            />
          </label>

          <label>
            <input
            type = "text"
            name = "Author Name"
            value = {newAuthor}
            onChange = {(event) =>setNewAuthor(event.target.value)}
            />
          </label>

          <label>
            <input
            type = "text"
            name = "Author Email"
            value = {newEmail}
            onChange = {(event) =>setNewEmail(event.target.value)}
            />
          </label>

          <label>
            <input
            type = "text"
            name = "Tags"
            value = {newTag}
            onChange = {(event) =>setNewTag(event.target.value)}
            />
          </label>
        </form>
      </>
    )
  }
  return (
    <>
      <h1>{currentPage.title}</h1>
      <p><b>Author: </b> {currentPage.author.name}</p>
      <p><b>Published: </b> {new Date(currentPage.createdAt).toLocaleDateString()}</p>
      <p>{currentPage.content}</p>
      <p><b>Tags: </b></p>
      <ul>{currentPage.tags.map((tag) => (
        <li key={tag.id}>{tag.name}</li>
      ))}</ul>
      <button onClick={goHome}>Back to Wiki List</button>
    </>
  )
}