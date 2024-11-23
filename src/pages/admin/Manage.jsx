import React, { useState, useEffect } from 'react'
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import useEcomStore from '@/store/ecom-store'
import { toast } from 'react-toastify'

const Manage = () => {
  const [users, setUsers] = useState([])
  const token = useEcomStore(state => state.token)

  useEffect(() => {
    fetchUsers()
  }, [])

  const fetchUsers = async () => {
    try {
      const response = await fetch('http://localhost:8000/user/users', {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      })
      if (!response.ok) {
        throw new Error('Network response was not ok')
      }
      const data = await response.json()
      setUsers(data)
    } catch (error) {
      console.error('Error fetching users:', error)
    }
  }

  const changeUserRole = async (userId, newRole) => {
    try {
      const response = await fetch('http://localhost:8000/user/change-role', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({ id: userId, role: newRole }),
      })
      
      if (!response.ok) {
        throw new Error('Failed to update role');
      }
      
      const data = await response.text();
      console.log(data); 
      fetchUsers();
      toast.success('User role updated successfully!');
    } catch (error) {
      console.error('Error changing user role:', error.message);
      toast.error('Failed to update user role');
    }
  }

  const changeUserStatus = async (userId, newStatus) => {
    try {
      const response = await fetch('http://localhost:8000/user/change-status', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({ id: userId, enabled: newStatus }),
      })
      
      if (!response.ok) {
        throw new Error('Failed to update status');
      }
      
      const data = await response.text();
      console.log(data); 
      fetchUsers();
      toast.success('User status updated successfully!');
    } catch (error) {
      console.error('Error changing user status:', error.message);
      toast.error('Failed to update user status');
    }
  }

  return (
    <div className="container mx-auto p-6">
      <Card>
        <CardHeader>
          <CardTitle className="text-2xl font-bold text-center">Manage Users</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableCaption>A list of all users and their roles</TableCaption>
            <TableHeader>
              <TableRow>
                <TableHead>User ID</TableHead>
                <TableHead>Username</TableHead>
                <TableHead>Current Role</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {users.map((user) => (
                <TableRow key={user.id}>
                  <TableCell>{user.id}</TableCell>
                  <TableCell>{user.email}</TableCell>
                  <TableCell>{user.role}</TableCell>
                  <TableCell>
                    <Select onValueChange={(value) => changeUserStatus(user.id, value)} defaultValue={user.enabled ? true : false}>
                      <SelectTrigger className="w-[180px]">
                        <SelectValue placeholder="Select a status" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value={true}>Enabled</SelectItem>
                        <SelectItem value={false}>Disabled</SelectItem>
                      </SelectContent>
                    </Select>
                  </TableCell>
                  <TableCell>
                    <Select onValueChange={(value) => changeUserRole(user.id, value)} defaultValue={user.role}>
                      <SelectTrigger className="w-[180px]">
                        <SelectValue placeholder="Select a role" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="USER">User</SelectItem>
                        <SelectItem value="ADMIN">Admin</SelectItem>
                      </SelectContent>
                    </Select>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  )
}

export default Manage