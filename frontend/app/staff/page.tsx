'use client'

import { useEffect, useState } from 'react'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import axios from 'axios'
import { motion } from 'framer-motion'

interface StaffMember {
  _id: string
  name: string
  role: string
  description: string
  photo: string
}

export default function StaffPage() {
  const [staff, setStaff] = useState<StaffMember[]>([])
  const [selectedRole, setSelectedRole] = useState<string>('')

  useEffect(() => {
    const fetchStaff = async () => {
      try {
        const url = selectedRole
          ? `/api/staff?role=${selectedRole}`
          : '/api/staff'
        const response = await api.get(url)
        setStaff(response.data)
      } catch (error) {
        console.error('Error fetching staff:', error)
      }
    }
    fetchStaff()
  }, [selectedRole])

  const roles = ['Board Member', 'Manager', 'Technician', 'Worker']
  const groupedStaff = staff.reduce((acc, member) => {
    if (!acc[member.role]) {
      acc[member.role] = []
    }
    acc[member.role].push(member)
    return acc
  }, {} as Record<string, StaffMember[]>)

  return (
    <main className="min-h-screen">
      <Navbar />
      <div className="pt-24 pb-20">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center mb-12"
          >
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-4">Our Team</h1>
            <p className="text-base sm:text-lg md:text-xl text-gray-400">
              Meet the experts behind Car Heritage
            </p>
          </motion.div>

          {/* Filter Buttons */}
          <div className="flex flex-wrap gap-3 sm:gap-4 justify-center mb-8 md:mb-12 px-4">
            <button
              onClick={() => setSelectedRole('')}
              className={`px-4 sm:px-6 py-2 rounded-lg transition-colors text-sm sm:text-base ${
                selectedRole === ''
                  ? 'bg-primary-red text-white'
                  : 'bg-primary-metallic text-gray-300 hover:bg-primary-red/20'
              }`}
            >
              All
            </button>
            {roles.map((role) => (
              <button
                key={role}
                onClick={() => setSelectedRole(role)}
                className={`px-4 sm:px-6 py-2 rounded-lg transition-colors text-sm sm:text-base ${
                  selectedRole === role
                    ? 'bg-primary-red text-white'
                    : 'bg-primary-metallic text-gray-300 hover:bg-primary-red/20'
                }`}
              >
                {role}s
              </button>
            ))}
          </div>

          {/* Staff Grid */}
          {selectedRole ? (
            <div className="grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
              {staff.map((member, index) => (
                <motion.div
                  key={member._id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  className="bg-primary-metallic p-4 sm:p-6 rounded-lg border border-primary-red/20 text-center"
                >
                  {member.photo ? (
                    <img
                      src={member.photo}
                      alt={member.name}
                      className="w-24 h-24 sm:w-32 sm:h-32 rounded-full mx-auto mb-4 object-cover border-4 border-primary-red"
                    />
                  ) : (
                    <div className="w-24 h-24 sm:w-32 sm:h-32 rounded-full mx-auto mb-4 bg-primary-red flex items-center justify-center">
                      <span className="text-white text-xl sm:text-2xl font-bold">
                        {member.name.charAt(0)}
                      </span>
                    </div>
                  )}
                  <h3 className="text-lg sm:text-xl font-bold text-white mb-2">{member.name}</h3>
                  <p className="text-primary-red font-semibold mb-4 text-sm sm:text-base">{member.role}</p>
                  <p className="text-gray-300 text-xs sm:text-sm">{member.description}</p>
                </motion.div>
              ))}
            </div>
          ) : (
            roles.map((role) => {
              const members = groupedStaff[role] || []
              if (members.length === 0) return null

              return (
                <motion.section
                  key={role}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  className="mb-12"
                >
                  <h2 className="text-3xl font-bold text-white mb-6">{role}s</h2>
                  <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {members.map((member, index) => (
                      <motion.div
                        key={member._id}
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: index * 0.1 }}
                        className="bg-primary-metallic p-6 rounded-lg border border-primary-red/20 text-center"
                      >
                        {member.photo ? (
                          <img
                            src={member.photo}
                            alt={member.name}
                            className="w-32 h-32 rounded-full mx-auto mb-4 object-cover border-4 border-primary-red"
                          />
                        ) : (
                          <div className="w-32 h-32 rounded-full mx-auto mb-4 bg-primary-red flex items-center justify-center">
                            <span className="text-white text-2xl font-bold">
                              {member.name.charAt(0)}
                            </span>
                          </div>
                        )}
                        <h3 className="text-xl font-bold text-white mb-2">{member.name}</h3>
                        <p className="text-primary-red font-semibold mb-4">{member.role}</p>
                        <p className="text-gray-300 text-sm">{member.description}</p>
                      </motion.div>
                    ))}
                  </div>
                </motion.section>
              )
            })
          )}

          {staff.length === 0 && (
            <div className="text-center text-gray-400 py-12">
              No staff members found.
            </div>
          )}
        </div>
      </div>
      <Footer />
    </main>
  )
}




