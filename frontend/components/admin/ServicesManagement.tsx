'use client'

import { useState, useEffect } from 'react'
import api from '@/lib/api'
import toast from 'react-hot-toast'

interface Service {
  _id: string
  name: string
  description: string
  videoUrl: string
  image: string
}

interface ServicesManagementProps {
  onUpdate: () => void
}

const ServicesManagement = ({ onUpdate }: ServicesManagementProps) => {
  const [services, setServices] = useState<Service[]>([])
  const [editingService, setEditingService] = useState<Service | null>(null)
  const [showForm, setShowForm] = useState(false)
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    videoUrl: '',
    image: '',
  })

  useEffect(() => {
    fetchServices()
  }, [])

  const fetchServices = async () => {
    try {
      const response = await api.get('/api/services')
      setServices(response.data)
    } catch (error) {
      toast.error('Failed to fetch services')
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    try {
      if (editingService) {
        await api.put(
          `/api/services/${editingService._id}`,
          formData
        )
        toast.success('Service updated successfully')
      } else {
        await api.post('/api/services', formData)
        toast.success('Service created successfully')
      }
      fetchServices()
      onUpdate()
      resetForm()
    } catch (error) {
      toast.error('Failed to save service')
    }
  }

  const handleEdit = (service: Service) => {
    setEditingService(service)
    setFormData({
      name: service.name,
      description: service.description,
      videoUrl: service.videoUrl,
      image: service.image,
    })
    setShowForm(true)
  }

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this service?')) return

    try {
      await api.delete(`/api/services/${id}`)
      toast.success('Service deleted successfully')
      fetchServices()
      onUpdate()
    } catch (error) {
      toast.error('Failed to delete service')
    }
  }

  const resetForm = () => {
    setFormData({
      name: '',
      description: '',
      videoUrl: '',
      image: '',
    })
    setEditingService(null)
    setShowForm(false)
  }

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-white">Services Management</h2>
        <button
          onClick={() => {
            resetForm()
            setShowForm(true)
          }}
          className="px-4 py-2 bg-primary-red hover:bg-primary-red-dark text-white rounded-lg transition-colors"
        >
          Add Service
        </button>
      </div>

      {showForm && (
        <div className="bg-primary-metallic p-6 rounded-lg border border-primary-red/20 mb-6">
          <h3 className="text-xl font-bold text-white mb-4">
            {editingService ? 'Edit Service' : 'Add New Service'}
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
              <label className="block text-gray-300 mb-2">Description</label>
              <textarea
                required
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                rows={4}
                className="w-full px-4 py-2 bg-primary-dark border border-primary-red/30 rounded-lg text-white focus:outline-none focus:border-primary-red resize-none"
              />
            </div>
            <div>
              <label className="block text-gray-300 mb-2">Video URL</label>
              <input
                type="url"
                value={formData.videoUrl}
                onChange={(e) => setFormData({ ...formData, videoUrl: e.target.value })}
                className="w-full px-4 py-2 bg-primary-dark border border-primary-red/30 rounded-lg text-white focus:outline-none focus:border-primary-red"
              />
            </div>
            <div>
              <label className="block text-gray-300 mb-2">Image URL</label>
              <input
                type="url"
                value={formData.image}
                onChange={(e) => setFormData({ ...formData, image: e.target.value })}
                className="w-full px-4 py-2 bg-primary-dark border border-primary-red/30 rounded-lg text-white focus:outline-none focus:border-primary-red"
              />
            </div>
            <div className="flex gap-4">
              <button
                type="submit"
                className="px-6 py-2 bg-primary-red hover:bg-primary-red-dark text-white rounded-lg transition-colors"
              >
                {editingService ? 'Update' : 'Create'}
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

      <div className="grid md:grid-cols-2 gap-4">
        {services.map((service) => (
          <div
            key={service._id}
            className="bg-primary-metallic p-4 rounded-lg border border-primary-red/20"
          >
            <h3 className="text-white font-bold mb-2">{service.name}</h3>
            <p className="text-gray-400 text-sm mb-4 line-clamp-3">{service.description}</p>
            <div className="flex gap-2">
              <button
                onClick={() => handleEdit(service)}
                className="flex-1 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors text-sm"
              >
                Edit
              </button>
              <button
                onClick={() => handleDelete(service._id)}
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

export default ServicesManagement




