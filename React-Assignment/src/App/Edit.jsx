import React from "react"
import {Link} from "react-router-dom";
const apiPath = "https://jsonplaceholder.typicode.com/posts/"
class Edit extends React.Component
{
    constructor(props) {
        super(props);
        this.state = {
            id: '',
            title: '',
            body: ''
        }
        this.handleChange = this.handleChange.bind(this)
    }
    handleChange(event){
        const name = event.target.name
        const value = event.target.value
        this.setState({
            [name]: value
        })
    }
    handleSubmit(event) {
        event.preventDefault();
        if (this.state.id) {
            this.updatePost();
        }else{
            console.log("No Record")
        }
      }
    getPostById(){
        const { id } = this.state
        const postsId = apiPath + id
        console.log(postsId)
        fetch(postsId)
            .then((res) => res.json())
            .then((results) => {
                if(results){
                    this.setState({
                        title: results.title,
                        body: results.body
                    });
                }else{
                    alert("No Record Fount!")
                }
            },
                (error) => {
                    this.setState({IsApiError: true})
                }
            )
    }
    updatePosts(){
        if(this.state.title == "" || this.state.title == undefined){
            alert("title is important")
        }else if(this.state.body == "" || this.state.body == undefined){
            alert("body is important")
        }
        let head = {
            id: this.state.id,
            title: this.state.title,
            body: this.state.body
        }
        const requestOptions = {
            method: 'PUT',
            headers: {
                "Content-Type": "application/json",
                Accept: "application/json",
            },
            body: JSON.stringify(head),
        }
        const baseUrl = apiPath + this.state.id
        console.log(baseUrl)
        fetch(baseUrl, requestOptions)
            .then((res) => {
                return res.json()
            })
            .then((results) => {
                if(results){
                    alert("Post Updated Successfully!")
                }
            })
            .catch((error) => {
                alert("Can not update post, there is an error")
                console.log(error)
            })
    }
    render() {
        return (
            <div>
                <div className="container">
                    <div className="row">
                        <div className="col-xs-12 col-sm-12 col-md-12 col-lg-12 text-center mt-5">
                            <h2>Update Post</h2>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-xs-12 col-sm-12 col-md-12 col-lg-12 col-xs-offset-3">
                            <form className="form" onSubmit={this.handleSubmit} method={"POST"}>
                                <div className="form-group">
                                    <input type="text" className="form-control" value={this.state.title} onChange={this.handleChange} id="subject" name="title"
                                           placeholder="Title" tabIndex="3"/>
                                </div>
                                <div className="form-group">
                                    <textarea rows="5" cols="50" name="body" className="form-control" id="message"
                                              placeholder="Body..." value={this.state.body} onChange={this.handleChange} tabIndex="4" required></textarea>
                                </div>
                                <div className="text-center">
                                    <button type="submit" className="btn btn-start-order" onClick={() => this.updatePosts()}>Update</button>
                                    <button type="submit" className="btn btn-start-order mx-4"><Link to="/">View</Link></button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}
export default Edit