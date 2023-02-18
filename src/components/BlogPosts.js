import React, { Component } from 'react';
import axios from 'axios';

class BlogPosts extends Component {
    constructor(props) {
        super(props);

        this.state = {
            blogPosts: []
        };
    }

    componentDidMount() {
        axios.get('http://hn.algolia.com/api/v1/search?tags=front_page&hitsPerPage=50')
        .then(res => {
            const blogPosts = res.data.hits
            this.setState({blogPosts})
            console.log("The response is:", blogPosts)
        }
            // response => console.log(response)
        )
    }

    componentDidUpdate() {
        console.log("Did Update")
    }


    render() {
        return (
            <div>
                <h2>Blog Posts</h2>
                <ul>
                    {this.state.blogPosts.map((blogPost, index) => {
                        const urlSeparator = " | "
                        const itemLink = "https://news.ycombinator.com/item?id="
                        const userLink = "https://news.ycombinator.com/user?id="
                        return (
                            <li key={index}>
                                <div>
                                    <span><a href={itemLink + blogPost.objectID}>{blogPost.title}</a></span>
                                    <span><a href={blogPost.url}>({blogPost.url})</a></span>
                                </div>
                                <span>
                                    <a href={itemLink + blogPost.objectID}>{blogPost.points}</a>
                                    {urlSeparator}
                                    <a href={userLink + blogPost.author}>{blogPost.author}</a>
                                    {urlSeparator}
                                    <a href={itemLink + blogPost.objectID}>{blogPost.created_at}</a>
                                    {urlSeparator}
                                    <a href={itemLink + blogPost.objectID}>{blogPost.num_comments}</a>
                                </span>
                            </li>
                        )
                    })}
                </ul>
            </div>
        )
    }
}

export default BlogPosts