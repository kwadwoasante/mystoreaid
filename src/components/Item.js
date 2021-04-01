import { useState } from 'react';
import { Button, Modal } from 'react-bootstrap';

function Item({ item, image }) {

    const [show, setShow] = useState(false);
    const handleOpen = () => {
        setShow(true)
    }
    const handleClose = () => {
        setShow(false)
    }

    return (
        <div className="col-lg-3 col-md-3 col-sm-6 col-12">
            <div className="card">
                <div className="card-header">
                    <img src={image} className="img-fluid rounded-circle mx-auto d-block" alt={item.product.image} style={{ width: "75px", height: "75px"}} />
                </div>
                <div className="card-body text-center">
                    <p>
                        {item.product.name}
                    </p>
                    <small>
                        <Button onClick={handleOpen} variant="link">
                            Details
                        </Button>
                    </small>

                    <Modal show={show} onHide={handleClose} animation={false} centered dialogClassName="modal-md" scrollable="true">
                        <Modal.Header closeButton>
                            <Modal.Title>
                                {item.product.name}
                            </Modal.Title>
                        </Modal.Header>
                        <Modal.Body>
                            <div className="row">
                                <div className="col-6">
                                    Cost Price: <strong>{item.costPrice}</strong>
                                </div>
                                <div className="col-6">
                                    Quantity: <strong>{item.quantity}</strong>
                                </div>
                                <div className="col-6">
                                    Selling Price: <strong>{item.sellingPrice}</strong>
                                </div>
                                <div className="col-6">
                                    Product BarCode: <strong>{item.product.barCode}</strong>
                                </div>
                                <div className="col-6">
                                    Weight: <strong>{item.product.weight}</strong>
                                </div>
                            </div>
                        </Modal.Body>
                    </Modal>

                </div>
            </div>
        </div>
    )
}

export default Item
