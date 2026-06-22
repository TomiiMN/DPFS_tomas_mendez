import { useState, useEffect } from 'react'

export function useApi(url) {
    const [data,    setData]    = useState(null)
    const [loading, setLoading] = useState(true)
    const [error,   setError]   = useState(null)
    const [meta,    setMeta]    = useState({})

    useEffect(() => {
        fetch(url)
            .then(res => {
                if (!res.ok) throw new Error(`HTTP ${res.status}`)
                return res.json()
            })
            .then(json => {
                const { data, ...rest } = json
                setData(data)
                setMeta(rest)
                setLoading(false)
            })
            .catch(err => {
                setError(err.message)
                setLoading(false)
            })
    }, [url])

    return { data, loading, error, meta }
}
