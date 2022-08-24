import { useEffect, useState } from "react";
import AuthUser from '../AuthUser'
import { useNavigate, useParams } from "react-router-dom";
import { Routes, Route, Link } from "react-router-dom";

export default function EditListing(props) {
    const { http } = AuthUser();
    const navigate = useNavigate();
    const [inputs, setInputs] = useState({});
    const { id } = useParams();

    useEffect(() => {
        fetchListing();
    }, []);

    const fetchListing = () => {
        http.get('/user/posts/' + id).then(res => {
            setInputs({
                title: res.data.title,
                tags: res.data.tags,
                description: res.data.description,
            });
        });
    }

    const handleChange = (event) => {
        const name = event.target.name;
        const value = event.target.value;
        setInputs(values => ({ ...values, [name]: value }))
    }

    const submitForm = () => {
        http.put('/Admin/UpdatePost/' + id, inputs).then((res) => {
            navigate('/');
        })
    }
    return (
        <div>
            <div className="row justify-content-center pt-4">
                <Link className="inline-block text-success ml-4 mb-4 text-decoration-none" to="/listing">Back </Link>


                <div className="row justify-content-center">
                    <div className="col-sm-6">
                        <div className="card p-4">

                            <h2 className="align-items-center text-center text-success ">Edit Tution Listing</h2>

                            <label>Title</label>
                            <input type="text" name="title" className="form-control mb-2"
                                value={inputs.title || ''}
                                onChange={handleChange}
                            ></input>


                            <label>Tags</label>
                            <input type="text" name="tags" className="form-control mb-2"
                                value={inputs.tags || ''}
                                onChange={handleChange}
                            ></input>


                            <label>Description</label>
                            <input type="text" name="description" className="form-control mb-2"
                                value={inputs.description || ''}
                                onChange={handleChange}
                            ></input>

                            <button type="button" onClick={submitForm} className="btn btn-success mt-2">Update</button>
                        </div>

                    </div>


                </div>
            </div>
        </div>
    );

}