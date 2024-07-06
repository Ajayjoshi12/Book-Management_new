import { useEffect, useState } from 'react';
import './UserBook.css'
import axios from 'axios';


export default function UserBook() {
    const [bookdata, setBookData] = useState(false)


    useEffect(() => {
        axios.get('http://localhost:8000/user/books')
            .then(response => {
                setBookData(response.data.bookData)
            })
            .catch(error => {
                setBookData(false)
            });
    }, [])

    return (
        <div className="container" style={{ padding: "50px 0px" }}>
            {bookdata && bookdata.map((book) => {
                return <div className='main-book2'>
                    <div className="row no-gutters">
                        <div className="col-lg-5 col-md-12 col-sm-12">
                            <div>
                                <img src={`http://localhost:8000/${book.file2}`} className="img-fluid img-size" alt="" />
                            </div>
                        </div>
                        <div className="col-lg-4 col-md-12 col-sm-12" style={{ borderRight: "1px solid #ddd" }}>
                            <div >
                                <ul>
                                    <li className="list-sub">Book Name : {book.name}</li>
                                    <li className="list-sub">Book Category : {book.category}</li>
                                    <li className="list-sub">Author : {book.author}</li>
                                    <li className="list-sub">Language : {book.language}</li>
                                </ul>
                            </div>
                        </div>
                        <div className='col-lg-3 col-md-12 col-sm-12' style={{ position: "relative" }}>
                            <div className='d-flex justify-content-center'>
                                {/* <div className='price-main2'>
                                <h1>$9</h1>
                            </div> */}
                                <div className="text-center" style={{ position: "absolute", top: "50%", margin: "0", transform: "translateY(-50%)" }}>
                                    <a target='_blank' style={{ textDecoration: "none" }} href={`http://localhost:8000/user/read/${book.file1}`} className="btn-delete">Read</a>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            })}

        </div>
    )
}