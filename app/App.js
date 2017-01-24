import React, { Component } from 'react'
import { Router, Route, Link, IndexRoute, hashHistory, browserHistory } from 'react-router'

class App extends Component {
  render() {
    return (
      <Router history={hashHistory}>
		<Route path='/' component={Container}>
			<IndexRoute component={Search} />
			<Route path='/User/(:name)' component={User} />
			<Route path='*' component={NotFound} />
		</Route>
      </Router>
    )
  }
}

const Container = (props) => <div>
  <Title />
  {props.children}
</div>
const Title = () => <h1><Link to="/">Github Users</Link></h1>
const NotFound = () => (
  <h1><Link to="/">404.. This page is not found!</Link></h1>)
  
class Search extends React.Component {
  constructor(props) {
	  super(props);
	  this.state = {
		  itemList: []
		}
  }
  searchUser(e) {
    var value = document.getElementById('search').value;
    fetch("https://api.github.com/search/users?q="+ value)
      .then((response) => response.json())
      .then((responseJson) => {
         this.setState({
           itemList: responseJson.items
         });
      })
      .catch((error) => {
        console.error(error);
      });
  }
  render() {
    return(
      <section>
        <div className="formContainer">
          <input type="text" id="search" name="search" placeholder="Search"/>
          <button id="searchBtn" onClick={this.searchUser.bind(this)}>&gt;</button>
        </div>
		<Results itemList={this.state.itemList} /> 
      </section>
    );
  }  
}
//

class Results extends React.Component {  
  constructor(props){
    super(props);
    this.prop = {      
      itemList:[]      
    }
  }

  render() {
    var items = this.props.itemList.map(function(item) {
		return (
		  <div className="item" key={item.id} >
			<Link to={'/User/'+item.login}>
			<img src={item.avatar_url} alt={item.login} />
			<div className="user"><small>{item.login}</small></div>
			</Link>
		  </div>
		)
	}, this);
    return(      
      <div id="results" >
        {items}
      </div>
    )    
  }
}
class User extends React.Component {  
  constructor(props){
    super(props);
	
    this.state = {      
      login:"", 
	  id:"",
	  avatar_url:"",
	  gravatar_id:"",
	  url:"",
	  html_url:"",
	  followers_url:"",
	  gists_url:"",
	  starred_url:"",
	  subscriptions_url:"",
	  organizations_url:"",
	  repos_url_str:"",
	  events_url:"",
	  received_events_url:"",
	  type:"",
	  site_admin:"",
	  score:"",
	  repoList:[]
    }
  }
  componentWillMount(props){
    
	fetch("https://api.github.com/users/"+ this.props.params.name)
      .then((response) => response.json())
      .then((responseJson) => {
         this.setState({
			login: responseJson.login, 
			id: responseJson.id,
			avatar_url: responseJson.avatar_url,
			gravatar_id: responseJson.gravatar_id,
			url: responseJson.url,
			html_url: responseJson.html_url,
			followers_url: responseJson.followers_url,
			gists_url: responseJson.gists_url,
			starred_url: responseJson.starred_url,
			subscriptions_url: responseJson.subscriptions_url,
			organizations_url: responseJson.organizations_url,
			repos_url_str: responseJson.repos_url,
			events_url: responseJson.events_url,
			received_events_url: responseJson.received_events_url,
			type: responseJson.type,
			site_admin: responseJson.site_admin,
			score: responseJson.score			
         });
		 if (this.state.repos_url_str != null) {
			 fetch(this.state.repos_url_str)
			  .then((response) => response.json())
			  .then((responseJson) => {
				 this.setState({
					repoList: responseJson
				 });
			  })
			  .catch((error) => {
				console.error(error);
			  }); 
		 }
      })
      .catch((error) => {
        console.error(error);
      });
	  
	
  }    
  render() {
    return(            
	  <section id="user">
	    <header>
		<img src={this.state.avatar_url} alt={this.props.params.name} />
		<h2>{this.props.params.name}</h2>
		</header>
		<h3>Information</h3>
        <ul className="information">
          <li><b>login</b> {this.state.login}</li>
          <li><b>id</b> {this.state.id}</li>
          <li><b>avatar_url</b> {this.state.avatar_url}</li>
          <li><b>gravatar_id</b> {this.state.gravatar_id}</li>
          <li><b>url</b> {this.state.url}</li>
          <li><b>html_url</b> {this.state.html_url}</li>
          <li><b>followers_url</b> {this.state.followers_url}</li>
          <li><b>gists_url</b> {this.state.gists_url}</li>
          <li><b>starred_url</b> {this.state.starred_url}</li>
          <li><b>subscriptions_url</b> {this.state.subscriptions_url}</li>
          <li><b>organizations_url</b> {this.state.organizations_url}</li>
          <li><b>repos_url</b> {this.state.repos_url_str}</li>
          <li><b>events_url</b> {this.state.events_url}</li>
          <li><b>received_events_url</b> {this.state.received_events_url}</li>
          <li><b>type</b> {this.state.type}</li>
          <li><b>site_admin</b> {this.state.site_admin}</li>
          <li><b>score</b> {this.state.score}</li>
        </ul>

		<Repositories repoList={this.state.repoList}/>
      </section>
    )    
  }
}
class Repositories extends React.Component {  
  constructor(props){
    super(props);
	this.prop = {
		repoList: []		
	}
  }
  
  render() {
	var repo = this.props.repoList.map(function(item) {
		return (
		  <div className="repoItem" key={item.id} >			
			<h4>{item.full_name}</h4>
			<div className="description">{item.description}</div>
			<p><a href={item.git_url} target="_blank">Git url</a> I <a href={item.clone_url} target="_blank">Clone url</a> | <a href={item.svn_url} target="_blank">Svn url</a></p>
			<p><a href={item.homepage} target="_blank">{item.homepage}</a></p>
		  </div>
		)
	}, this);
    return(            
	  <div className="repository">
	   <h3>Repository</h3>
	   {repo}        
      </div>
    )    
  }
}

export default App
