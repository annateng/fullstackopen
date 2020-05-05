import React, { useEffect } from 'react'
import { userService } from '../services/serviceMaker'
import { useDispatch, useSelector } from 'react-redux'
import { initializeUsers } from '../reducers/allUsersReducer'
import { Link } from 'react-router-dom'
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Typography } from '@material-ui/core'

const Users = () => {
  const dispatch = useDispatch()
  const users = useSelector(state => state.users)

  useEffect(() => {
    userService.getAll().then(res => dispatch(initializeUsers(res)))
  }, [dispatch])

  return (
    <div>
      <Typography variant='h3'>users</Typography>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>name</TableCell>
              <TableCell>username</TableCell>
              <TableCell>blogs created</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            { users.map(user => (
              <TableRow key={user.id}>
                <TableCell><Link to={`/user/${user.id}`}>{ user.name }</Link></TableCell>
                <TableCell>{ user.username }</TableCell>
                <TableCell>{ user.blogs.length }</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  )
}

export default Users