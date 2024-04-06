import {Link} from 'react-router-dom'
import React from 'react'

export default function NotFound() {
  return (
	<div>
		This page doesn't exist. Go <Link to={"/page1"} >home</Link>
	</div>
  )
}
