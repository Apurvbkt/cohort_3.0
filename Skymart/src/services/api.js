import axios from 'axios'

const BASE_URL = 'https://dummyjson.com'

const api = axios.create({
  baseURL: BASE_URL,
  timeout: 15000,
  headers: { 'Content-Type': 'application/json' },
})

const handleError = (error, fallbackMessage = 'Something went wrong') => {
  console.error('[API Error]', error?.message || error)
  const message = error?.response?.data?.message || error?.message || fallbackMessage
  return { data: null, error: message }
}

export const getProducts = async (params = {}) => {
  try {
    const { limit = 50, skip = 0, select = '' } = params
    const query = new URLSearchParams()
    if (limit) query.set('limit', limit)
    if (skip) query.set('skip', skip)
    if (select) query.set('select', select)
    const qs = query.toString()
    const { data } = await api.get(`/products${qs ? `?${qs}` : ''}`)
    return { data, error: null }
  } catch (err) {
    return handleError(err, 'Failed to load products')
  }
}

export const getProductById = async (id) => {
  try {
    const { data } = await api.get(`/products/${id}`)
    return { data, error: null }
  } catch (err) {
    return handleError(err, 'Product not found')
  }
}

export const searchProducts = async (q) => {
  try {
    const { data } = await api.get(`/products/search?q=${encodeURIComponent(q)}`)
    return { data, error: null }
  } catch (err) {
    return handleError(err, 'Search failed')
  }
}

export const getCategories = async () => {
  try {
    const { data } = await api.get('/products/category-list')
    return { data, error: null }
  } catch (err) {
    return handleError(err, 'Failed to load categories')
  }
}

export const getProductsByCategory = async (category) => {
  try {
    const { data } = await api.get(`/products/category/${encodeURIComponent(category)}`)
    return { data, error: null }
  } catch (err) {
    return handleError(err, 'Failed to load category')
  }
}
