import React from 'react'
import "./BookBlock.css"
import { motion } from 'framer-motion';
import toast from 'react-hot-toast';

const BookBlock = ({ book }) => {

    function addBook() {
        if (localStorage.getItem("personalBooks") == null) {
            localStorage.setItem("personalBooks", '[]');
        }
        var old_data = JSON.parse(localStorage.getItem("personalBooks"));

        var bookExists = old_data.some(item => item.name === book.title);

        if (!bookExists) {
            const dataToStore = { title: book.title, author_name: book.author_name, key: book.key ,type : book.type, edition_count : book.edition_count}
            old_data.push(dataToStore);
            localStorage.setItem("personalBooks", JSON.stringify(old_data));
            toast.success("Book added in your bookshelf");
            // console.log("Book added")
        }
        else {
            toast.error("Book already in your bookshelf");
            // console.log("already in it")
        }
    }

    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2, ease: "easeIn", delay: 0.1 }}
            className='bookbox h-[26vh] w-[35vw] lg:h-[25vh] lg:w-[22vw] border-2 border-[#a2d2ff] rounded-lg p-3 hover:border-[#fca311] overflow-scroll'>

            <h3 className='bookbox text-[18px] lg:text-[16px]  font-semibold h-[3vh] overflow-scroll cursor-all-scroll'>{book.title}</h3>

            <h5 className='bookbox italic text-[#fca311] text-md mb-3 h-[3vh] overflow-scroll mt-2'>by ~ {book.author_name} </h5>
            <h3 className='font-mono'>Edition Count : {book.edition_count} </h3>
            <h3 className='font-mono'>Type : {book.type}</h3>

            <button className='mt-5 w-full border-2 text-[#fca311] border-[#fca311] py-1 rounded-md' onClick={addBook}>Add Book</button>
          
        </motion.div>
    )
}

export default BookBlock
