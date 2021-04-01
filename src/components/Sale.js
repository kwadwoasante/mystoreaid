import axios from 'axios';
import { useState, useEffect } from 'react';
import SampleImage from '../images/img10.jpg';
import Item from './Item';

function Sale({ match }) {

    const [sale, setSales] = useState([]);

    useEffect(() => {
        axios({
            url: process.env.REACT_APP_API + `/client/react/branches/${match.params.branch_id}/sales/${match.params.sale_id}/sale_entries`,
            method : "GET",
            withCredentials : false,
            headers : {
                "X-EL-Parah-Hash" : process.env.REACT_APP_API_HASH,
                "X-El-Parah-Client" : process.env.REACT_APP_API_CLIENT
            }
        })
        .then((res) => {
            // console.log(res.data)
            setSales(res.data.sale_entries)
        })
        .catch((error) => {
            if(error.response){
                console.log(error.response)
            }
        })
    }, [])
    return (
        <>
        <section>
            <div className="container-fluid">
                <div className="row gx-2 gx-lg-3">
                    <div className="col">
                        <div className="page-header">
                            <h3 className="page-header-title">Sale Entries</h3>
                        </div>
                    </div>
                </div>
            </div>
        </section>

        <section>
            <div className="container-fluid">
                <div className="row">
                    {sale ? (
                        (sale.map((item, index) => (
                        <Item key={index} item={item} image={SampleImage} />
                        )))   
                    ) : (
                        <div class="col-md-4 offset-md-4">
                            <div className="card">
                                <div className="card-body text-center">
                                    No sales yet
                                </div>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </section>
        </>
    )
}

export default Sale
