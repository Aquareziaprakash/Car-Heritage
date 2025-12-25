'use client'

import { useEffect, useState } from 'react'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import axios from 'axios'
import { motion } from 'framer-motion'
import api from '@/lib/api'

interface Product {
  _id: string
  name: string
  description: string
  price: number
  image: string
  category: string
  inStock: boolean
}

export default function ProductsPage() {
  const [products, setProducts] = useState<Product[]>([])
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([])
  const [selectedCategory, setSelectedCategory] = useState<string>('all')
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await api.get('/api/products')
        setProducts(response.data)
        setFilteredProducts(response.data)
      } catch (error) {
        console.error('Error fetching products:', error)
      } finally {
        setLoading(false)
      }
    }
    fetchProducts()
  }, [])

  useEffect(() => {
    if (selectedCategory === 'all') {
      setFilteredProducts(products)
    } else {
      setFilteredProducts(products.filter((p) => p.category === selectedCategory))
    }
  }, [selectedCategory, products])

  const categories = ['all', ...Array.from(new Set(products.map((p) => p.category)))]

  const handleInquire = (product: Product) => {
    window.location.href = `mailto:info@carheritage.com?subject=Inquiry about ${product.name}&body=Hello, I'm interested in ${product.name}. Please provide more information.`
  }

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
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-4">Our Products</h1>
            <p className="text-base sm:text-lg md:text-xl text-gray-400">
              Premium car accessories, tools, and care products
            </p>
          </motion.div>

          {/* Category Filter */}
          <div className="flex flex-wrap gap-3 sm:gap-4 justify-center mb-8 md:mb-12 px-4">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={`px-4 sm:px-6 py-2 rounded-lg transition-colors capitalize text-sm sm:text-base ${
                  selectedCategory === category
                    ? 'bg-primary-red text-white'
                    : 'bg-primary-metallic text-gray-300 hover:bg-primary-red/20'
                }`}
              >
                {category}
              </button>
            ))}
          </div>

          {loading ? (
            <div className="text-center text-gray-400 py-12">Loading...</div>
          ) : filteredProducts.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6">
              {filteredProducts.map((product, index) => (
                <motion.div
                  key={product._id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.05 }}
                  className="bg-primary-metallic rounded-lg border border-primary-red/20 overflow-hidden hover:border-primary-red/50 transition-colors"
                >
                  <div className="aspect-square bg-primary-dark relative">
                    {product.image ? (
                      <img
                        src={product.image}
                        alt={product.name}
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-primary-red/20 to-primary-dark">
                        <span className="text-gray-400">No Image</span>
                      </div>
                    )}
                    {!product.inStock && (
                      <div className="absolute top-2 right-2 bg-red-600 text-white px-2 py-1 rounded text-xs font-semibold">
                        Out of Stock
                      </div>
                    )}
                  </div>
                  <div className="p-3 sm:p-4">
                    <h3 className="text-base sm:text-lg font-bold text-white mb-2">{product.name}</h3>
                    <p className="text-gray-400 text-xs sm:text-sm mb-3 line-clamp-2">
                      {product.description}
                    </p>
                    <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2 sm:gap-0">
                      <span className="text-primary-red font-bold text-lg sm:text-xl">
                        ${product.price.toFixed(2)}
                      </span>
                      <button
                        onClick={() => handleInquire(product)}
                        disabled={!product.inStock}
                        className={`w-full sm:w-auto px-3 sm:px-4 py-2 rounded-lg font-semibold text-xs sm:text-sm transition-colors ${
                          product.inStock
                            ? 'bg-primary-red hover:bg-primary-red-dark text-white'
                            : 'bg-gray-600 text-gray-400 cursor-not-allowed'
                        }`}
                      >
                        {product.inStock ? 'Inquire' : 'Unavailable'}
                      </button>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          ) : (
            <div className="text-center text-gray-400 py-12">
              No products found in this category.
            </div>
          )}
        </div>
      </div>
      <Footer />
    </main>
  )
}




