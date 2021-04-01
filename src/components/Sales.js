import axios from 'axios';
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

function Sales({ match }) {

    const [links, setLinks] = useState();
    const [sales, setSales] = useState([]);

    useEffect(() => {
        axios({
            url: process.env.REACT_APP_API + `/client/react/branches/${match.params.id}/sales`,
            method : "GET",
            withCredentials : false,
            headers : {
                "X-EL-Parah-Hash" : process.env.REACT_APP_API_HASH,
                "X-El-Parah-Client" : process.env.REACT_APP_API_CLIENT
            }
        })
        .then((res) => {
            setLinks(res.data.links)
            setSales(res.data.sales);
        })
        .catch((error) => {
            if(error.response){
                console.log(error.response)
            }
        })
    }, [])

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
            setSales(res.data.branches)
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
            setSales(res.data.branches)
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
                            <h3 className="page-header-title">Branch Sales</h3>
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
                                            <h5 className="card-header-title">Branch Sales</h5>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className="table-responsive">
                                <table className="table table-borderless table-bordered table-nowrap table-align-middle card-table table-striped">
                                    <thead className="thead-light">
                                        <tr>
                                            <th>Customer's Name</th>
                                            <th>Customer's Email</th>
                                            <th>Customer's Phone Number</th>
                                            <th>Type of Sale</th>
                                            <th>Payment Type</th>
                                            <th>Payment Status</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {sales.length > 0 ? (
                                            (sales.map((sale, index) => (
                                                <tr key={index}>
                                                    <td>
                                                        <Link to={`/sale/${sale.branchId}/${sale.id}`}>
                                                            {sale.customer.firstName} &nbsp; {sale.customer.otherNames}
                                                        </Link>
                                                    </td>
                                                    <td>{sale.customer.email}</td>
                                                    <td>{sale.customer.phone}</td>
                                                    <td>{sale.type}</td>
                                                    <td>{sale.paymentType}</td>
                                                    <td>{sale.paymentStatus}</td>
                                                </tr>
                                            )))
                                        ) : (
                                            <tr className="text-center">
                                                <td colSpan="6">
                                                    No Sales yet
                                                </td>
                                            </tr>
                                        )}
                                    </tbody>
                                    {sales.length === 0 ? (
                                        <>
                                        </>
                                    ) : (
                                    <tfoot>
                                        <tr>
                                            <td colSpan="6">
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
                                    )}
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

export default Sales
