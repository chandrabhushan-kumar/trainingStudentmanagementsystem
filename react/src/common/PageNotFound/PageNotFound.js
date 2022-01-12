import React, {Component} from 'react';
import './PageNotFound.css';

export default class PageNotFound extends Component{
	render(){
		return(
			<div className="row">
				<div className="pagenotfound col-lg-12">
					<div className="row">
						<h1 className="error-heading">404</h1>
						<h3 className="error-subheading">page not found</h3>
						<img src="/images/pagenotfound.svg" alt="pagenotfound.jpg" />
					</div>
				</div>
			</div>
		);
	}
}