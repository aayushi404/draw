import { useState, useEffect } from 'react'

export const useMounted = () => {
    const [mount, setMount] = useState(false)
    useEffect(() => {
        setMount(true)
    }, []);
    return mount
}