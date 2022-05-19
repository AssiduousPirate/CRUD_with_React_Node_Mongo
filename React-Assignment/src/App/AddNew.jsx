import React from "react"
import {Link} from "react-router-dom";
const bashApiUrl = "https://jsonplaceholder.typicode.com/posts"
class AddNew extends React.Component
{
    constructor(props) {
        super(props);
        this.state = {
            title: '',
            body: ''
        }
        this.handleChange = this.handleChange.bind(this)
    }
    handleChange(event) {
        const name = event.target.name
        const value = event.target.value
        this.setState({
            [name]: value
        })
    }
    handleSubmit(event) {
        event.preventDefault();
        if (this.state.id) {
            this.AddNew()
        }else{
            console.log("No Record")
        }
    }
    AddNew(){
        if(this.state.title == "" || this.state.title == undefined){
            alert("title is important")
        }else if(this.state.body == "" || this.state.body == undefined){
            alert("body is important")
        }
        let body = {
            title: this.state.title,
            body: this.state.body
        }
        console.log(body)
        const requestOptions = {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                Accept: "application/json",
            },
            body: JSON.stringify(body),
        }
        fetch(bashApiUrl, requestOptions)
            .then((res) => {
                return res.json()
            })
            .then((results) => {
                if(results){
                    alert("Post Added Successfully!")
                    this.setState({
                        title: '',
                        body: ''
                    })
                }
            })
            .catch((error) => {
                alert("there is an error" + error)
            })
    }
    render() {
        return (
            <div>
                <div className="container">
                    <div className="row">
                        <div className="col-xs-12 col-sm-12 col-md-12 col-lg-12 text-center mt-5">
                            <h2>Add New</h2>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-xs-12 col-sm-12 col-md-12 col-lg-12 col-xs-offset-3">
                            <form className="form" onSubmit={this.handleSubmit} method={"POST"}>
                                <div className="form-group">
                                    <input type="text" className="form-control" name="title" placeholder="Title" value={this.state.title} onChange={this.handleChange} tabIndex="3" />
                                </div>
                                <div className="form-group">
                                    <textarea rows="5" cols="50" name="body" className="form-control" placeholder="Body..." value={this.state.body} onChange={this.handleChange} tabIndex="4" required></textarea>
                                </div>
                                <div className="text-center">
                                    <button type="submit" className="btn btn-start-order" onClick={() => this.AddNew()}>Add</button>
                                    <button type="submit" className="btn btn-start-order mx-4"><Link to="/">View</Link></button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}
export default AddNew