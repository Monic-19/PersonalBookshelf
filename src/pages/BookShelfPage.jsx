import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Title from '../components/Title';
import { motion } from 'framer-motion';

const BookShelfPage = () => {
  const [myBooks, setMyBooks] = useState([]);

  const viewit = () => {
    if (localStorage.getItem('personalBooks') !== null) {
      const ans = JSON.parse(localStorage.getItem('personalBooks'));
      setMyBooks(ans);
    }
  };

  useEffect(() => {
    viewit();
  }, []); 

  return (
    <div className='h-[100vh] w-[100%] bg-[#bde0fe] p-6'>
      <div className='title-container'>
        <Link to='/' className='link'>
          <motion.h1
            initial={{ y: '100%' }}
            animate={{ y: '0' }}
            exit={{ y: '-100%' }}
            transition={{ duration: 0.5, delay: 0.5 }}
          >
            Search Books
          </motion.h1>
        </Link>
      </div>

      <Title delay={0.7}>My BookShelf</Title>

      <motion.div
        initial={{ y: "50%", opacity: 0 }}
        animate={{ y: "0", opacity: 1 }}
        exit={{ y: "50%", opacity: 0 }}
        transition={{ duration: 0.7, delay: 0.9 }}

        className='bookbox mt-5 h-[79vh] lg:h-[70vh] w-full bg-white rounded-xl flex flex-wrap overflow-scroll p-5 scroll-smooth'>
        {
          myBooks.length === 0 ?
            <div className='w-full flex justify-center items-center text-[5vh] font-extrabold tracking-wide'>
              <h1 className='text-center'>No books in your bookshelf.</h1>
            </div>
            :
            <div className='h-full w-full flex flex-wrap gap-5 justify-center items-center py-4'>
              {
                myBooks.map(book => (
                  <motion.div
                    key={book.key}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.2, ease: "easeIn", delay: 0.1 }}
                    className='bookbox h-[23vh] w-[35vw]  lg:h-[20vh] lg:w-[22vw] border-2 border-[#a2d2ff] rounded-lg p-3 hover:border-[#fca311] overflow-scroll shadow-lg'>

                    <h3 className='bookbox text-[18px] lg:text-[16px] font-semibold h-[3vh] overflow-scroll cursor-all-scroll'>{book.title}</h3>

                    <h5 className='bookbox italic text-[#fca311] text-md mb-3 h-[3vh] overflow-scroll mt-2'>by ~ {book.author_name} </h5>
                    <h3 className='font-mono my-1'>Edition Count : 
                    {book.edition_count} </h3>
                    <h3 className='font-mono'>Type : {book.type}</h3>


                  </motion.div>
                ))
              }
            </div>
        }
      </motion.div>
    </div>
  );
};

export default BookShelfPage;
