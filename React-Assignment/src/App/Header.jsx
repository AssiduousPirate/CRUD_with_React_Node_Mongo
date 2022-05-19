import React from "react"
import {Link} from "react-router-dom";
class Header extends React.Component
{
    render() {
        return (
            <div>
                <div className="table-title">
                    <div className="row">
                        <div className="col-sm-8"><h2>Posts <b>Details</b></h2></div>
                        <div className="col-sm-4">
                            <button type="button" className="btn btn-info add-new"><i className="fa fa-plus"></i>
                                <Link to={"/addNew"}>Add New</Link>
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}
export default Header