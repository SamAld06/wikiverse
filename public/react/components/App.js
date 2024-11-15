import React, { useEffect, useState } from 'react'


// import and prepend the api url to any fetch calls
import apiURL from '../api'

export const App = () => {
  const [pages, setPages] = useState([])
  const [currentPage, setCurrentPage] = useState(null)

  async function fetchArticle (slug) {
    const response = await fetch(`${apiURL}/wiki/${slug}`)
    const articleData = await response.json()
    setCurrentPage(articleData)
  }

  function goHome() {
    setCurrentPage(null)
  }

  function createPage() {
    
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

