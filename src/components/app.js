import { h, Component } from 'preact';
import { Router } from 'preact-router';

import Header from './header';

// Code-splitting is automated for routes
import Home from '../routes/home';
// Real routes
import Events from '../routes/events';
import Team from '../routes/team';
import Internships from '../routes/internships';
import Error from '../routes/error';
import Subscribe from '../routes/subscribe';
import Companies from '../routes/companies';
import Position from '../routes/position';
import Apply from '../routes/apply';

export default class App extends Component {
	
	/** Gets fired when the route changes.
	 *	@param {Object} event		"change" event from [preact-router](http://git.io/preact-router)
	 *	@param {string} event.url	The newly routed URL
	 */
	handleRoute = e => {
		this.currentUrl = e.url;
	};

	render() {
		return (
			<div id="app">
				<Header />
				<Router onChange={this.handleRoute}>
					<Home path="/" />
					<Events path='/events'/>
					<Team path='/team' />
					<Internships path='/internships' />
					<Error path='/404' />
					<Subscribe path='/subscribe' />
					<Companies path='/companies' />
					<Position path='/:company/:position' />
					<Apply path='/:company/:position/apply' />
				</Router>
			</div>
		);
	}
}
