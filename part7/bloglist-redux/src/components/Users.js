import React, { useEffect } from 'react'
import { userService } from '../services/serviceMaker'
import { useDispatch, useSelector } from 'react-redux'
import { initializeUsers } from '../reducers/allUsersReducer'
import { Link } from 'react-router-dom'

const Users = () => {
  const dispatch = useDispatch()
  const users = useSelector(state => state.users)

  useEffect(() => {
    userService.getAll().then(res => dispatch(initializeUsers(res)))
  }, [dispatch])
  console.log('users: ', users)

  return (
    <div>
      <h2>users</h2>
      <table>
        <tbody>
          <tr>
            <th><b>name</b></th>
            <th><b>username</b></th>
            <th><b>blogs created</b></th>
          </tr>
          { users.map(user => (
            <tr key={user.id}>
              <td><Link to={`/user/${user.id}`}>{ user.name }</Link></td>
              <td>{ user.username }</td>
              <td>{ user.blogs.length }</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export default Users