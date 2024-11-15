import React, { useState } from 'react'
import { Page } from './Page'

export const PagesList = ({ pages }) => {
	const [page, setPage] = useState("")

	const handleClick = async () => {
	const res = await fetch("/wiki/:slug")
	const data = await res.json()
	setPage(data)
	
  }
  return <>
		{
			pages.map((page, idx) => {
				return <button onClick = {handleClick}><Page page={page} key={idx} /></button>
			})
		}
	</>
}
