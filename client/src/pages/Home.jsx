import { useState, useEffect, useCallback } from 'react'
import { useNavigate } from 'react-router-dom'
import './Home.css'

const Home = () => {

    const [quote, setQuote] = useState('')
    const [author, setAuthor] = useState('')
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate()
    const apiUrl = import.meta.env.VITE_API_URL;

    useEffect(() => {

        const token = localStorage.getItem('token')
        if (!token) {
            navigate('/signin')
            return
        }
        fetch(`${apiUrl}/home`, {
            method: 'GET',
            headers: {
                Authorization: `Bearer ${token}`
            }
        })
            .then(async (res) => {
                if (res.status == 401 || res.status == 403) {
                    localStorage.removeItem('token')
                    navigate('/signin')
                }
            })
            .catch((error) => {
                console.error('Error fetching route:', error)
                navigate('/signin')
            })
    }, [navigate])

    const fetchAuthors = useCallback(async () => {
        const response = await fetch('https://philosophersapi.com/api/philosophers');
        return await response.json();
    }, []);

    const quotes = async () => {
        try {

            setLoading(true)
            setQuote('')
            setAuthor('')

            const [quoteres, authors] = await Promise.all([
                fetch('https://philosophersapi.com/api/quotes').then(res => res.json()),
                fetchAuthors()
            ])

            if (Array.isArray(quoteres) && quoteres.length > 0) {
                const randomQuote = quoteres[Math.floor(Math.random() * quoteres.length)]
                const quoteAuthor = authors.find(name => name.id === randomQuote.philosopher.id)
                setQuote(`"${randomQuote.quote}"`)
                setAuthor(`~${quoteAuthor?.name || Unknown}`)
            }


        } catch (error) {
            setQuote(`There was some error: ${error}`)
        } finally {
            setLoading(false)
        }
    }

    useEffect(() => {
        quotes()
    }, [])



    return (
        <>
            <div id="container">
                <button type='button' onClick={quotes} id='quotebtn'>Get Quote</button>
                <div id="quotebox">
                    <div id="quote">
                        {loading ? (
                            <img src="/thinking.png" alt="Loading..." style={{ width: '50px' }} />
                        ) : (
                            quote
                        )}
                    </div>

                    <div id="quoteby">{author}</div>
                </div>
            </div>
        </>
    )
}

export default Home
