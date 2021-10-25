import React, { useContext } from 'react'
const CacheContext = React.createContext({})
export default CacheContext

export const useCacheContext = () => useContext(CacheContext)
