import { useEffect, useRef, useState } from 'react'
import './EditBook.css'
import validator from 'validator'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'

export default function EditBook() {

    const [bookData, setBookData] = useState(false)

    const [selectedBookId, setSelectedBookId] = useState('');


    useEffect(() => {
        axios.get("http://localhost:8000/admin/books")
            .then(response => {
                setBookData(response.data.bookData)
            })
            .catch(error => {
                setBookData(false)
            })
    }, [])

    const userDetails = useRef({})

    const i2 = useRef()
    const i3 = useRef()
    const i4 = useRef()
    const i5 = useRef()

    const [error, setError] = useState(null)

    const navigate = useNavigate()

    const myClickEdit = async (e) => {
        e.preventDefault()

        // const name = i3.current.value.trim();
        // const author = i4.current.value.trim();
        // const language = i5.current.value.trim();


        if (validator.isEmpty(i3.current.value)) {
            return setError("Book Name is Required");

        } else {
            setError("")
        }


        if (validator.isEmpty(i4.current.value)) {
            return setError("Author is Required");

        } else {
            setError("")
        }

        if (validator.isEmpty(i5.current.value)) {
            return setError("Language is Required");

        } else {
            setError("")
        }


        // userDetails.current = {
        //     name,
        //     category: i2.current.value,
        //     author,
        //     language
        // };

        userDetails.current = {...userDetails.current, name:i3.current.value, category:i2.current.value, author:i4.current.value, language:i5.current.value}


        try {
            const response = await axios.patch(`http://localhost:8000/admin/book/edit/${selectedBookId}`, userDetails.current);
            console.log(response.data); // Assuming response.data contains updated book information

            
            navigate("/admin");
        } catch (error) {
            console.error('Error editing book:', error);
        }


        // console.log(selectedBookId);
    }

    return (
        <div className="container" style={{ padding: "50px 0px" }}>
            <div className="row justify-content-center">
                <div className="col-lg-9 col-sm-12">
                    <div className="main-add2">
                        <div >
                            <h1 className='text-center' style={{ paddingBottom: "30px" }}>Edit Book</h1>
                            <form action="">
                                <div className="row" style={{ paddingBottom: "20px" }}>
                                    <div className="col-lg-3 col-sm-12">
                                        <label htmlFor="inputtext">Book Name</label>
                                    </div>
                                    <div className="col-lg-9 col-sm-12">
                                        <input ref={i3} type="text" className="form-control" id="inputtext"/>
                                    </div>
                                </div>
                                <div className="row" style={{ paddingBottom: "20px" }}>
                                    <div className="col-lg-3 col-sm-12">
                                        <label htmlFor="inputselect">Book Category</label>
                                    </div>
                                    <div className="col-lg-9 col-sm-12">
                                        <select ref={i2} className="form-control form-control-md">
                                            <option>category 1</option>
                                            <option>category 2</option>
                                            <option>category 3</option>
                                            <option>category 4</option>
                                            <option>category 5</option>
                                        </select>
                                    </div>
                                </div>
                                <div className="row" style={{ paddingBottom: "20px" }}>
                                    <div className="col-lg-3 col-sm-12">
                                        <label htmlFor="inputtext">Author</label>
                                    </div>
                                    <div className="col-lg-9 col-sm-12">
                                        <input ref={i4} type="text" className="form-control" id="inputtext" />
                                    </div>
                                </div>
                                <div className="row" style={{ paddingBottom: "20px" }}>
                                    <div className="col-lg-3 col-sm-12">
                                        <label htmlFor="inputtext">Language</label>
                                    </div>
                                    <div className="col-lg-9 col-sm-12">
                                        <input ref={i5} type="text" className="form-control" id="inputtext" />
                                    </div>
                                </div>
                                {/* <div className="row" style={{ paddingBottom: "20px" }}>
                                    <div className="col-lg-3 col-sm-12">
                                        <label htmlFor="inputfile">Img Link</label>
                                    </div>
                                    <div className="col-lg-9 col-sm-12">
                                        <input type="file" id="inputfile" />
                                    </div>
                                </div>
                                <div className="row" style={{ paddingBottom: "20px" }}>
                                    <div className="col-lg-3 col-sm-12">
                                        <label htmlFor="inputfile">Pdf File</label>
                                    </div>
                                    <div className="col-lg-9 col-sm-12">
                                        <input type="file" id="inputfile" />
                                    </div>
                                </div> */}
                                <div className='row text-center'>
                                    <div className='col-lg-12'>
                                        <div>
                                            {error !== null && <p style={{ color: "red" }}>{error}</p>}
                                            <div style={{paddingBottom:"20px"}}>
                                                <label htmlFor="bookSelect">Select Book:</label>
                                                <select
                                                    id="bookSelect"
                                                    className="form-control"
                                                    onChange={(e) => setSelectedBookId(e.target.value)}
                                                    value={selectedBookId}
                                                >
                                                    <option value="">Select a book</option>
                                                    {bookData && bookData.map(book => (
                                                        <option key={book._id} value={book._id}>{book.name}</option>
                                                    ))}
                                                </select>
                                            </div>
                                            <button onClick={myClickEdit} className='btn-submit2' disabled={!selectedBookId}>Edit Book</button>
                                            {/* {bookData && bookData.map((book)=>{
                                                return <button onClick={(e)=>{myClickEdit(e,book._id)}} className='btn-submit2'>Edit Book</button>
                                            })} */}
                                        </div>
                                    </div>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}