import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Title from '../components/Title';
import BookBlock from '../components/BookBlock';
import {motion} from "framer-motion"
import { Toaster } from 'react-hot-toast';

const BookSearchPage = () => {
  const [query, setQuery] = useState('query');
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(false);


  useEffect(() => {
    if (query.length === 0) {
      setBooks([]);
      setLoading(false);
      return;
    }

    setLoading(true);

    fetch(`https://openlibrary.org/search.json?q=${query}&limit=10&page=1`)
      .then(response => response.json())
      .then(data => {
        setBooks(data.docs);
        setLoading(false);
      })
      .catch(error => {
        console.error('Error fetching books:', error);
        setLoading(false);
      });

  }, [query]);


  return (
    <div className='h-[100vh] w-[100%] bg-[#bde0fe] p-6'>
      <div className='title-container'>
        <Link to="/bookshelf" className='link'>
          <motion.h1 
            initial={{y : "100%"}}
            animate={{y : "0"}}
            exit={{y : "-100%"}}
            transition={{duration: 0.5, delay : 0.5}}>View Your Bookshelf</motion.h1>
        </Link>
      </div>

      <Title delay={0.7}>Book Search Page</Title>

      <div>
        <motion.div 
           initial={{y : "100%", opacity :0}}
           animate={{y : "0", opacity :1}}
           exit={{y : "-100%", opacity:0}}
           transition={{duration: 0.5, delay : 0.9}}
          className='flex justify-center items-center gap-5 font-bold'>
          <label htmlFor="book" className='text-[16px] lg:text-[28px]'>Search By Book Name : </label>
          <input
            name='book'
            type="text"
            placeholder="Search for books..."
            className='text-[12px] lg:text-[16px] w-[40vw] lg:w-[20vw] p-[0.5vh] rounded-lg text-center'
            onChange={(e) => setQuery(e.target.value)}
          />
        </motion.div>
        <motion.div 
            initial={{y : "50%", opacity :0}}
            animate={{y : "0", opacity :1}}
            exit={{y : "50%", opacity:0}}
            transition={{duration: 0.7, delay : 1.3}}
            
          className='bookbox mt-5 h-[70vh] lg:h-[65vh] w-full bg-white rounded-xl flex flex-wrap overflow-scroll p-5 scroll-smooth'>
          {
            loading ? 
              <div className='w-full flex justify-center items-center text-[5vh] font-extrabold tracking-wide'>
                <h1 className='text-center'>Loading Books...</h1>
              </div> 
            :
            <div className='h-full w-full flex flex-wrap gap-3 justify-center items-center py-4'>
              {
                books.map(book => (
                  <BookBlock book={book} key={book.key} />
                ))
              }
            </div>
          }
        </motion.div>
      </div>
      <Toaster containerStyle={{
                top: 20,
                left : "75%",
             }} />
    </div>
  );
};

export default BookSearchPage;
