import React, { FunctionComponent } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { selectToken } from '../../store/selector/user'
import { setUser } from '../../store/action/user'

const Authentication: FunctionComponent = ({ children }) => {
    const token = useSelector(selectToken)
    const dispatch = useDispatch()
    if (token) {
        return <>{children}</>
    }

    const options: RequestInit = {
        method: 'POST',
        mode: 'cors',
        credentials: 'include',
    }
    fetch('http://localhost:9002/jwt', options).then(res => {
        if (!res.ok) {
            // Not logged in redirect to identity service
            const url = new URL('http://localhost:9002')
            url.searchParams.append('requestedUrl', location.href)
            location.replace(url.toString())
        }

        const auth = res.headers.get('Authorization')
        dispatch(setUser({ name: 'test', token: { jtw: auth } }))
    })
    return null
}

export default Authentication
