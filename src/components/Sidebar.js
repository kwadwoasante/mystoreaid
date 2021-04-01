import { Link } from 'react-router-dom';

function Sidebar() {
    return (
        <div className="border-right" id="sidebar-wrapper">
            <div className="sidebar-heading">MyStoreAid</div>

            <div className="list-group list-group-flush">
                <Link to="/" className="list-group-item list-group-item-action">
                    Branches
                </Link>
            </div>
        </div>
    )
}

export default Sidebar
