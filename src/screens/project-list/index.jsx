import React from 'react'
import { useState, useEffect } from 'react'
import { List } from './list'
import { SearchPanel } from './search-panel'
import qs from 'qs'
import { cleanObject } from "./utils";

const apiUrl=process.env.REACT_APP_API_URL

export const ProjectListScreen = () => {
  const [param, setParam] = useState({
    name: '',
    personId: '',
  })
  const [users, setUsers] = useState([])
  const [list, setList] = useState([])

  useEffect(() => {
    fetch(`${apiUrl}/projects?${qs.stringify(cleanObject(param))}`).then(async (res) => {
      if (res.ok) {
        setList(await res.json())
      }
    })
  }, [param])
  useEffect(() => {
    fetch(`${apiUrl}/users`).then(async (res) => {
      if (res.ok) {
         setUsers(await res.json())
      }
    })
  }, [])
  return (
    <div>
      <SearchPanel param={param} setParam={setParam} users={users}></SearchPanel>
      <List list={list} users={users}></List>
    </div>
  )
}
