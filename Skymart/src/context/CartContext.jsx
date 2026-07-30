import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useReducer,
  useState,
} from 'react'

const CartContext = createContext(null)

const STORAGE_KEY = 'skymart_cart'

const initialState = {
  items: [],
}

const getInitialState = () => {
  if (typeof window === 'undefined') return initialState
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    if (!raw) return initialState
    const parsed = JSON.parse(raw)
    return { items: Array.isArray(parsed) ? parsed : [] }
  } catch {
    return initialState
  }
}

const reducer = (state, action) => {
  switch (action.type) {
    case 'ADD': {
      const product = action.payload
      const existing = state.items.find((it) => it.id === product.id)
      if (existing) {
        return {
          items: state.items.map((it) =>
            it.id === product.id ? { ...it, quantity: it.quantity + 1 } : it
          ),
        }
      }
      return { items: [...state.items, { ...product, quantity: 1 }] }
    }
    case 'INCREMENT': {
      return {
        items: state.items.map((it) =>
          it.id === action.payload ? { ...it, quantity: it.quantity + 1 } : it
        ),
      }
    }
    case 'DECREMENT': {
      return {
        items: state.items
          .map((it) =>
            it.id === action.payload ? { ...it, quantity: it.quantity - 1 } : it
          )
          .filter((it) => it.quantity > 0),
      }
    }
    case 'REMOVE': {
      return { items: state.items.filter((it) => it.id !== action.payload) }
    }
    case 'CLEAR': {
      return { items: [] }
    }
    default:
      return state
  }
}

export const CartProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, undefined, getInitialState)
  const [isDrawerOpen, setIsDrawerOpen] = useState(false)
  const [successInfo, setSuccessInfo] = useState(null)

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(state.items))
    } catch {
      /* ignore */
    }
  }, [state.items])

  const addItem = useCallback(
    (product) => {
      dispatch({ type: 'ADD', payload: product })
    },
    []
  )
  const increment = useCallback(
    (id) => dispatch({ type: 'INCREMENT', payload: id }),
    []
  )
  const decrement = useCallback(
    (id) => dispatch({ type: 'DECREMENT', payload: id }),
    []
  )
  const removeItem = useCallback(
    (id) => dispatch({ type: 'REMOVE', payload: id }),
    []
  )
  const clear = useCallback(() => dispatch({ type: 'CLEAR' }), [])

  const openDrawer = useCallback(() => setIsDrawerOpen(true), [])
  const closeDrawer = useCallback(() => setIsDrawerOpen(false), [])
  const toggleDrawer = useCallback(
    () => setIsDrawerOpen((prev) => !prev),
    []
  )

  const addItemAndOpen = useCallback(
    (product) => {
      addItem(product)
      setIsDrawerOpen(true)
    },
    [addItem]
  )

  const openSuccess = useCallback((info) => {
    setSuccessInfo(info || null)
    setIsDrawerOpen(false)
  }, [])

  const closeSuccess = useCallback(() => {
    setSuccessInfo(null)
  }, [])

  const totals = useMemo(() => {
    let totalItems = 0
    let grandTotal = 0
    state.items.forEach((it) => {
      totalItems += it.quantity
      const effectivePrice = it.discountPercentage
        ? (Number(it.price) * (100 - Number(it.discountPercentage))) / 100
        : Number(it.price)
      grandTotal += effectivePrice * it.quantity
    })
    return {
      totalItems,
      grandTotal: Number(grandTotal.toFixed(2)),
    }
  }, [state.items])

  const value = {
    items: state.items,
    addItem,
    addItemAndOpen,
    increment,
    decrement,
    removeItem,
    clear,
    ...totals,
    isDrawerOpen,
    openDrawer,
    closeDrawer,
    toggleDrawer,
    successInfo,
    openSuccess,
    closeSuccess,
  }

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>
}

export const useCart = () => {
  const ctx = useContext(CartContext)
  if (!ctx) throw new Error('useCart must be used inside CartProvider')
  return ctx
}
