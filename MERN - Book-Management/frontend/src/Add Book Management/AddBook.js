import { useRef, useState } from 'react'
import './AddBook.css'
import validator from 'validator'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'

export default function AddBook() {

    // const userDetails = useRef({})

    const i2 = useRef()
    const i6 = useRef()
    const i3 = useRef()
    const i4 = useRef()
    const i5 = useRef()
    const i7 = useRef()
    const fileInputRefs = useRef([]);



    const [error, setError] = useState(null)

    const navigate = useNavigate();

    // const myClickAdd = (e) => {
    //     e.preventDefault()

    //     if (validator.isEmpty(i3.current.value)) {
    //         return setError("Book Name is Required");

    //     } else {
    //         setError("")
    //     }


    //     if (validator.isEmpty(i4.current.value)) {
    //         return setError("Author is Required");

    //     } else {
    //         setError("")
    //     }

    //     if (validator.isEmpty(i5.current.value)) {
    //         return setError("Language is Required");

    //     } else {
    //         setError("")
    //     }


    //     navigate("/admin")

    // }


    const handleFileInputChange  = (event, index) => {
        fileInputRefs.current[index] = event.target.files[0];
        index++;
    };

    const handleSubmit = async (event) => {
        event.preventDefault();

        
        if (validator.isEmpty(i3.current.value)) {
            setError("Book Name is Required");
            return;
        }else {
            setError("")
        }

        if (validator.isEmpty(i4.current.value)) {
            setError("Author is Required");
            return;
        }else {
            setError("")
        }

        if (validator.isEmpty(i5.current.value)) {
            setError("Language is Required");
            return;
        }else {
            setError("")
        }

        // Prepare FormData for file uploads
        const formData = new FormData();

        formData.append("name", i3.current.value);
        formData.append("category", i2.current.value);
        formData.append("author", i4.current.value);
        formData.append("language", i5.current.value);

        fileInputRefs.current.forEach((file, index) => {
            if (file) {
                formData.append(`file${index + 1}`, file);
            }
        });

        try {
            // Send formData to server for book addition
            const response = await axios.post("http://localhost:8000/admin/book/add", formData,{
                headers: {
                  'Content-Type': 'multipart/form-data'
                }
              });
            console.log(response.data);  // Log response for debugging

            // Optionally navigate to another page after successful submission
            navigate("/admin");
        } catch (error) {
            console.error("Error adding book:", error);
            // Handle error state or display error message to the user
        }
    };




    return (
        <div className="container" style={{ padding: "50px 0px" }}>
            <div className="row justify-content-center">
                <div className="col-lg-9 col-sm-12">
                    <div className="main-add">
                        <div >
                            <h1 className='text-center' style={{ paddingBottom: "30px" }}>Add Book</h1>
                            <form >
                                <div className="row" style={{ paddingBottom: "20px" }}>
                                    <div className="col-lg-3 col-sm-12">
                                        <label htmlFor="inputName">Book Name</label>
                                    </div>
                                    <div className="col-lg-9 col-sm-12">
                                        <input ref={i3} type="text" className="form-control" id="inputtext" />
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
                                        <label htmlFor="inputtext2">Author</label>
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



                                {/* image */}
                                <div className="row" style={{ paddingBottom: "20px" }}>
                                    <div className="col-lg-3 col-sm-12">
                                        <label htmlFor="inputfile">Img File</label>
                                    </div>
                                    <div className="col-lg-9 col-sm-12">
                                        <input ref={i6} type="file" className="form-control-file" id="inputfile" onChange={(e) => handleFileInputChange(e, 0)}/>
                                    </div>
                                </div>

                                {/* pdf file */}
                                <div className="row" style={{ paddingBottom: "20px" }}>
                                    <div className="col-lg-3 col-sm-12">
                                        <label htmlFor="inputfile">Pdf File</label>
                                    </div>
                                    <div className="col-lg-9 col-sm-12">
                                        <input ref={i7} type="file" className="form-control-file" id="inputfile" onChange={(e) => handleFileInputChange(e, 1)} />
                                    </div>
                                </div>
                                <div className='row text-center'>
                                    <div className='col-lg-12'>
                                        <div>
                                            {error !== null && <p style={{ color: "red" }}>{error}</p>}
                                            {/* <button onClick={async (event) => {

                                                console.log("point3")

                                                // userDetails.current = { ...userDetails.current, category: i2.current.value, name: i3.current.value, author: i4.current.value, language: i5.current.value, img: i6.current.value, pdf: i7.current.value }
                                                const formData = new FormData();
                                                console.log("point4")

                                                formData.append("name", i3.current.value);
                                                formData.append("category", i2.current.value);
                                                formData.append("author", i4.current.value);
                                                formData.append("language", i5.current.value);
                                                console.log("point5")

                                                fileInputRefs.current.forEach((file, index) => {
                                                    if (file) {
                                                      formData.append(`file${index + 1}`, file);
                                                    }
                                                  });

                                                // formData.append("pdfName", event.target.pdfName[0]);
                                                // formData.append("imageName", event.target.imageName[0]);
                                                console.log("point6")


                                                // console.log(userDetails.current);
                                                console.log(formData)
                                                // const response = await axios.post("http://localhost:8000/admin/book/add", formData);
                                                console.log("point7")

                                                // console.log(response);

                                                // myClickAdd()
                                            }} className='btn-submit'>Add Book</button> */}
                                            <button className='btn-submit' onClick={handleSubmit}>Add Book</button>
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