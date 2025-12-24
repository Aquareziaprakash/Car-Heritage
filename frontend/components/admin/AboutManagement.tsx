'use client'

import { useState, useEffect } from 'react'
import axios from 'axios'
import toast from 'react-hot-toast'

interface AboutData {
  companyHistory: string
  mission: string
  vision: string
  values: string
  certificateImage: string
  owner: {
    name: string
    photo: string
    thoughts: string
  }
}

const AboutManagement = () => {
  const [formData, setFormData] = useState<AboutData>({
    companyHistory: '',
    mission: '',
    vision: '',
    values: '',
    certificateImage: '',
    owner: {
      name: '',
      photo: '',
      thoughts: '',
    },
  })
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchAbout()
  }, [])

  const fetchAbout = async () => {
    try {
      const token = localStorage.getItem('adminToken')
      const response = await axios.get('http://localhost:5000/api/about', {
        headers: { Authorization: `Bearer ${token}` },
      })
      setFormData(response.data)
    } catch (error) {
      toast.error('Failed to fetch about data')
    } finally {
      setLoading(false)
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    try {
      const token = localStorage.getItem('adminToken')
      await axios.put('http://localhost:5000/api/about', formData, {
        headers: { Authorization: `Bearer ${token}` },
      })
      toast.success('About information updated successfully')
    } catch (error) {
      toast.error('Failed to update about information')
    }
  }

  if (loading) {
    return <div className="text-white">Loading...</div>
  }

  return (
    <div>
      <h2 className="text-2xl font-bold text-white mb-6">About Page Management</h2>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="bg-primary-metallic p-6 rounded-lg border border-primary-red/20">
          <h3 className="text-xl font-bold text-white mb-4">Company History</h3>
          <textarea
            value={formData.companyHistory}
            onChange={(e) => setFormData({ ...formData, companyHistory: e.target.value })}
            rows={6}
            className="w-full px-4 py-2 bg-primary-dark border border-primary-red/30 rounded-lg text-white focus:outline-none focus:border-primary-red resize-none"
          />
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          <div className="bg-primary-metallic p-6 rounded-lg border border-primary-red/20">
            <h3 className="text-xl font-bold text-white mb-4">Mission</h3>
            <textarea
              value={formData.mission}
              onChange={(e) => setFormData({ ...formData, mission: e.target.value })}
              rows={4}
              className="w-full px-4 py-2 bg-primary-dark border border-primary-red/30 rounded-lg text-white focus:outline-none focus:border-primary-red resize-none"
            />
          </div>

          <div className="bg-primary-metallic p-6 rounded-lg border border-primary-red/20">
            <h3 className="text-xl font-bold text-white mb-4">Vision</h3>
            <textarea
              value={formData.vision}
              onChange={(e) => setFormData({ ...formData, vision: e.target.value })}
              rows={4}
              className="w-full px-4 py-2 bg-primary-dark border border-primary-red/30 rounded-lg text-white focus:outline-none focus:border-primary-red resize-none"
            />
          </div>

          <div className="bg-primary-metallic p-6 rounded-lg border border-primary-red/20">
            <h3 className="text-xl font-bold text-white mb-4">Values</h3>
            <textarea
              value={formData.values}
              onChange={(e) => setFormData({ ...formData, values: e.target.value })}
              rows={4}
              className="w-full px-4 py-2 bg-primary-dark border border-primary-red/30 rounded-lg text-white focus:outline-none focus:border-primary-red resize-none"
            />
          </div>
        </div>

        <div className="bg-primary-metallic p-6 rounded-lg border border-primary-red/20">
          <h3 className="text-xl font-bold text-white mb-4">Certificate Image URL</h3>
          <input
            type="url"
            value={formData.certificateImage}
            onChange={(e) => setFormData({ ...formData, certificateImage: e.target.value })}
            className="w-full px-4 py-2 bg-primary-dark border border-primary-red/30 rounded-lg text-white focus:outline-none focus:border-primary-red"
          />
        </div>

        <div className="bg-primary-metallic p-6 rounded-lg border border-primary-red/20">
          <h3 className="text-xl font-bold text-white mb-4">Owner Information</h3>
          <div className="space-y-4">
            <div>
              <label className="block text-gray-300 mb-2">Owner Name</label>
              <input
                type="text"
                value={formData.owner.name}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    owner: { ...formData.owner, name: e.target.value },
                  })
                }
                className="w-full px-4 py-2 bg-primary-dark border border-primary-red/30 rounded-lg text-white focus:outline-none focus:border-primary-red"
              />
            </div>
            <div>
              <label className="block text-gray-300 mb-2">Owner Photo URL</label>
              <input
                type="url"
                value={formData.owner.photo}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    owner: { ...formData.owner, photo: e.target.value },
                  })
                }
                className="w-full px-4 py-2 bg-primary-dark border border-primary-red/30 rounded-lg text-white focus:outline-none focus:border-primary-red"
              />
            </div>
            <div>
              <label className="block text-gray-300 mb-2">Owner Thoughts</label>
              <textarea
                value={formData.owner.thoughts}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    owner: { ...formData.owner, thoughts: e.target.value },
                  })
                }
                rows={6}
                className="w-full px-4 py-2 bg-primary-dark border border-primary-red/30 rounded-lg text-white focus:outline-none focus:border-primary-red resize-none"
              />
            </div>
          </div>
        </div>

        <button
          type="submit"
          className="px-6 py-3 bg-primary-red hover:bg-primary-red-dark text-white rounded-lg font-semibold transition-colors"
        >
          Save Changes
        </button>
      </form>
    </div>
  )
}

export default AboutManagement



