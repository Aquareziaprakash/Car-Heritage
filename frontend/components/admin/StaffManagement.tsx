'use client'

import { useState, useEffect } from 'react'
import api from '@/lib/api'
import toast from 'react-hot-toast'

interface Staff {
  _id: string
  name: string
  role: string
  description: string
  photo: string
}

interface StaffManagementProps {
  onUpdate: () => void
}

const StaffManagement = ({ onUpdate }: StaffManagementProps) => {
  const [staff, setStaff] = useState<Staff[]>([])
  const [editingStaff, setEditingStaff] = useState<Staff | null>(null)
  const [showForm, setShowForm] = useState(false)
  const [formData, setFormData] = useState({
    name: '',
    role: 'Worker',
    description: '',
    photo: '',
  })

  useEffect(() => {
    fetchStaff()
  }, [])

  const fetchStaff = async () => {
    try {
      const response = await api.get('/api/staff')
      setStaff(Array.isArray(response.data) ? response.data : [])
    } catch (error) {
      toast.error(getErrorMessage(error, 'Failed to fetch staff'))
    }
  }

  const getErrorMessage = (error: unknown, fallback: string) => {
    const axiosError = error as { response?: { data?: { message?: string } }; message?: string }
    return axiosError.response?.data?.message || axiosError.message || fallback
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    const payload = {
      ...formData,
      photo: formData.photo || '',
    }
    console.log('Staff payload:', payload)
    try {
      if (editingStaff) {
        await api.put(
          `/api/staff/${editingStaff._id}`,
          payload
        )
        toast.success('Staff member updated successfully')
      } else {
        await api.post('/api/staff', payload)
        toast.success('Staff member created successfully')
      }
      fetchStaff()
      onUpdate()
      resetForm()
    } catch (error) {
      toast.error(getErrorMessage(error, 'Failed to save staff member'))
    }
  }

  const handleEdit = (member: Staff) => {
    setEditingStaff(member)
    setFormData({
      name: member.name,
      role: member.role,
      description: member.description,
      photo: member.photo,
    })
    setShowForm(true)
  }

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this staff member?')) return

    try {
      await api.delete(`/api/staff/${id}`)
      toast.success('Staff member deleted successfully')
      fetchStaff()
      onUpdate()
    } catch (error) {
      toast.error(getErrorMessage(error, 'Failed to delete staff member'))
    }
  }

  const resetForm = () => {
    setFormData({
      name: '',
      role: 'Worker',
      description: '',
      photo: '',
    })
    setEditingStaff(null)
    setShowForm(false)
  }

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-white">Staff Management</h2>
        <button
          onClick={() => {
            resetForm()
            setShowForm(true)
          }}
          className="px-4 py-2 bg-primary-red hover:bg-primary-red-dark text-white rounded-lg transition-colors"
        >
          Add Staff
        </button>
      </div>

      {showForm && (
        <div className="bg-primary-metallic p-6 rounded-lg border border-primary-red/20 mb-6">
          <h3 className="text-xl font-bold text-white mb-4">
            {editingStaff ? 'Edit Staff Member' : 'Add New Staff Member'}
          </h3>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-gray-300 mb-2">Name</label>
              <input
                type="text"
                required
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                className="w-full px-4 py-2 bg-primary-dark border border-primary-red/30 rounded-lg text-white focus:outline-none focus:border-primary-red"
              />
            </div>
            <div>
              <label className="block text-gray-300 mb-2">Role</label>
              <select
                required
                value={formData.role}
                onChange={(e) => setFormData({ ...formData, role: e.target.value })}
                className="w-full px-4 py-2 bg-primary-dark border border-primary-red/30 rounded-lg text-white focus:outline-none focus:border-primary-red"
              >
                <option value="Board Member">Board Member</option>
                <option value="Manager">Manager</option>
                <option value="Technician">Technician</option>
                <option value="Worker">Worker</option>
              </select>
            </div>
            <div>
              <label className="block text-gray-300 mb-2">Description</label>
              <textarea
                required
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                rows={3}
                className="w-full px-4 py-2 bg-primary-dark border border-primary-red/30 rounded-lg text-white focus:outline-none focus:border-primary-red resize-none"
              />
            </div>
            <div>
              <label className="block text-gray-300 mb-2">Photo URL</label>
              <input
                type="text"
                value={formData.photo}
                onChange={(e) => setFormData({ ...formData, photo: e.target.value })}
                className="w-full px-4 py-2 bg-primary-dark border border-primary-red/30 rounded-lg text-white focus:outline-none focus:border-primary-red"
              />
            </div>
            <div className="flex gap-4">
              <button
                type="submit"
                className="px-6 py-2 bg-primary-red hover:bg-primary-red-dark text-white rounded-lg transition-colors"
              >
                {editingStaff ? 'Update' : 'Create'}
              </button>
              <button
                type="button"
                onClick={resetForm}
                className="px-6 py-2 bg-gray-600 hover:bg-gray-700 text-white rounded-lg transition-colors"
              >
                Cancel
              </button>
            </div>
          </form>
        </div>
      )}

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
        {(Array.isArray(staff) ? staff : []).map((member) => (
          <div
            key={member._id}
            className="bg-primary-metallic p-4 rounded-lg border border-primary-red/20"
          >
            {member.photo && (
              <img
                src={member.photo}
                alt={member.name}
                className="w-full h-48 object-cover rounded-lg mb-4"
              />
            )}
            <h3 className="text-white font-bold mb-2">{member.name}</h3>
            <p className="text-primary-red font-semibold mb-2">{member.role}</p>
            <p className="text-gray-400 text-sm mb-4 line-clamp-3">{member.description}</p>
            <div className="flex gap-2">
              <button
                onClick={() => handleEdit(member)}
                className="flex-1 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors text-sm"
              >
                Edit
              </button>
              <button
                onClick={() => handleDelete(member._id)}
                className="flex-1 px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded-lg transition-colors text-sm"
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default StaffManagement




