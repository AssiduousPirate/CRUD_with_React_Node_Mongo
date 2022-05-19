import React from "react"
import {Link} from "react-router-dom";
const apiPath = "https://jsonplaceholder.typicode.com/"
class Post extends React.Component
{
    constructor(props) {
        super(props);
        this.state = {
            apiData: [],
            IsApiError: false
        }
    }
    componentDidMount() {
        fetch(apiPath + "posts")
            .then((res) => res.json())
            .then((data) => {
                this.setState({
                    apiData: data
                })
            },
                (err) => {
                this.setState({ IsApiError: true})
                }
            )
    }
    deleteApiData(delData){
        const  { apiData }  = this.state
        const deleteId = apiPath + "posts/" + delData
        fetch(deleteId, { method: 'DELETE' })
            .then(async response => {
                const deleteData = await response.json()
                if (!response.ok){
                    const error = (deleteData && deleteData.message) || response.status
                    return Promise.reject(error)
                }
                this.setState({
                    apiData: apiData.filter(apiDat => apiDat.id !== delData)
                })
                alert("Post Deleted Successfully!")
            })
            .catch((error) => {
                alert("there is an error!")
                console.log("Sorry there is an error", error)
            })
    }
    render() {
        var apiDataList = this.state.apiData
        if(apiDataList && apiDataList.length > 0){
            return (
                <div>
                    {apiDataList.map(apiDataVal => (
                        <div className="row" key={apiDataVal.id}>
                            <div className="col-sm-8">
                                <h4>{apiDataVal.title}</h4>
                                <p>{apiDataVal.body}</p>
                            </div>
                            <div className="col-sm-2">
                                <Link to={"/edit/" + apiDataVal.id }>
                                    <button type="button" className="btn btn-info add-new">Edit</button>
                                </Link>
                            </div>
                            <div className="col-sm-2">
                                <button className="btn btn-danger" onClick={() => this.deleteApiData(apiDataVal.id) }>
                                    Delete
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            )
        }else{
            return(<div>No Record Found!</div>)
        }
    }
}
export default Post