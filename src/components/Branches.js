import axios from 'axios';
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

function Branches() {

    const [links, setLinks] = useState();
    const [branches, setBranches] = useState([]);

    useEffect(() => {
        axios({
            url : process.env.REACT_APP_API + `/client/react/branches`,
            method : "GET",
            withCredentials : false,
            headers : {
                "X-EL-Parah-Hash" : process.env.REACT_APP_API_HASH,
                "X-El-Parah-Client" : process.env.REACT_APP_API_CLIENT
            }
        })
        .then((res) => {
            setLinks(res.data.links)
            setBranches(res.data.branches)
        })
        .catch((error) => {
            if(error.response){
                console.log(error.response)
            }
        })
    },[])

    const prevLink = (e) => {e.preventDefault();

        const p = links.prev;
        var prevUrl = p.split("=").pop();

        axios({
            url : process.env.REACT_APP_API + `/client/react/branches?offset=` + prevUrl,
            method : "GET",
            withCredentials : false,
            headers : {
                "X-EL-Parah-Hash" : process.env.REACT_APP_API_HASH,
                "X-El-Parah-Client" : process.env.REACT_APP_API_CLIENT
            }
        })
        .then((res) => {
            setLinks(res.data.links)
            setBranches(res.data.branches)
        })
        .catch((error) => {
            if(error.response){
                console.log(error.response)
            }
        })
    }

    const nextLink = (e) => {
        e.preventDefault();

        const n = links.next;
        var nextUrl = n.split("=").pop();

        axios({
            url : process.env.REACT_APP_API + `/client/react/branches?offset=` + nextUrl,
            method : "GET",
            withCredentials : false,
            headers : {
                "X-EL-Parah-Hash" : process.env.REACT_APP_API_HASH,
                "X-El-Parah-Client" : process.env.REACT_APP_API_CLIENT
            }
        })
        .then((res) => {
            setLinks(res.data.links)
            setBranches(res.data.branches)
        })
        .catch((error) => {
            if(error.response){
                console.log(error.response)
            }
        })
    }

    return (
        <>
        <section>
            <div className="container-fluid">
                <div className="row gx-2 gx-lg-3">
                    <div className="col">
                        <div className="page-header">
                            <h3 className="page-header-title">Branches</h3>
                        </div>
                    </div>
                </div>
            </div>
        </section>

        <section>
            <div className="container-fluid">
                <div className="row">
                    <div className="col-12">
                        <div className="card mb-3">
                            <div className="card-header">
                                <div className="row justify-content-between align-items-center flex-grow-1">
                                    <div className="col-12 col-md">
                                        <div className="d-flex justify-content-between align-items-center">
                                            <h5 className="card-header-title">Branches</h5>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className="table-responsive">
                                <table className="table table-borderless table-bordered table-nowrap table-align-middle card-table table-striped">
                                    <thead className="thead-light">
                                        <tr>
                                            <th>Name</th>
                                            <th>Country</th>
                                            <th>City</th>
                                            <th>Whatsapp Number</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {branches && branches.map((branch, index) => (
                                            <tr key={index}>
                                                <td>
                                                    <Link to={`/sales/${branch.id}`}>
                                                        {branch.name}
                                                    </Link>
                                                </td>
                                                <td>{branch.country}</td>
                                                <td>{branch.city}</td>
                                                <td>{branch.whatsAppPhone}</td>
                                            </tr>
                                        ))}
                                    </tbody>
                                    <tfoot>
                                        <tr>
                                            <td colSpan="4">
                                                <nav aria-label="page navigation example">
                                                    <ul className="pagination justify-content-center mt-3">
                                                    <li className={links && links.prev ? "page-item" : "page-item disabled"}>
                                                        <button type="button" className="page-link" onClick={prevLink}>Previous</button>
                                                    </li>
                                                    {/* <li className="page-item"><a className="page-link" href="#sfs">1</a></li>
                                                    <li className="page-item"><a className="page-link" href="#sfs">2</a></li>
                                                    <li className="page-item"><a className="page-link" href="#sfsf">3</a></li> */}
                                                    <li className={links && links.next ? "page-item" : "page-item disabled"}>
                                                        <button type="button" className="page-link" onClick={nextLink}>Next</button>
                                                    </li>
                                                    </ul>
                                                </nav>
                                            </td>
                                        </tr>
                                    </tfoot>
                                </table>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
        </>
    )
}

export default Branches;