import { useState } from 'react';

function Navigation({ setToggle }) {

    const [arrow, setArrow] = useState(false);

    const toggleSidebar = (e) => {
        e.preventDefault();
        setArrow(!arrow);
        setToggle(!arrow);
    }

    return (
        <nav id="sidebar-header" className="navbar navbar-expand-lg navbar-height navbar-fixed navbar-bordered border-bottom">
            <button className="btn btn-default" id="menu-toggle" onClick={toggleSidebar}>
                {arrow ? (
                    <i className="fas fa-chevron-right"></i>
                ) : (
                    <i className="fas fa-chevron-left"></i>
                )}
            </button>

            <div id="navbarSupportedContent">
                
            </div>
        </nav>
    )
}

export default Navigation
