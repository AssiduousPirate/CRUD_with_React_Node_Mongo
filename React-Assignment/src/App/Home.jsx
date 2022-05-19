import React from "react"
import Header from "./Header"
import Post from "./Post"
import Pagination from "./Pagination"
class Home extends React.Component
{
    render() {
        return (
            <div>
                <div className="container-lg centered">
                    <div className="table-responsive">
                        <div className="table-wrapper">
                            <Header />
                            <div className={"posts"}>
                                <Post />
                            </div>
                        </div>
                    </div>
                    <Pagination />
                </div>
            </div>
        );
    }
}
export default Home