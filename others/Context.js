import axios from "axios";

import React, { useState, useEffect, createContext } from 'react'
import { getNewsAPI, getSourceAPI } from "./api";

export const NewsContext = createContext();

const Context = ({ children }) => {
    const [news, setNews] = useState([])
    const [category, setCategory] = useState('general')
    const [index, setIndex] = useState(1)
    const [source, setSource] = useState()
    const [darkTheme, setDarkTheme] = useState(true);
    const fetchNews = async (reset = category) => {
        const { data } = await axios.get(getNewsAPI(reset))
        // console.log(data)
        setNews(data)
        setIndex(1)
    }
    const fetchSourceNews = async () => {
        try {
            const { data } = await axios.get(getSourceAPI(source))
            // console.log(data)
            setNews(data)
            setIndex(1)
        }
        catch (error) {
            console.log(error)
        }
    }


    useEffect(() => {
        fetchNews()
    }, [category]);

    useEffect(() => {
        fetchSourceNews()
    }, [source]);

    return (<NewsContext.Provider
        value={{
            darkTheme,
            setDarkTheme,
            news,
            index,
            setIndex,
            fetchNews,
            setCategory,
            setSource
        }}>
        {children}
    </NewsContext.Provider>)
}

export default Context