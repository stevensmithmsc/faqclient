import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch, NavLink } from "react-router-dom";
import { connect } from 'react-redux';
import { bindActionCreators } from "redux";
import './App.css';
import Header from './Components/Header';
import Map from './Components/Map';
import Sidebar from './Components/Sidebar';
import Home from './Components/Home';
import Question from './Components/Question';
import Category from './Components/Category';
import Footer from './Components/Footer';
import DataContext from './DataContext';
import QuestionForm from './Components/QuestionForm';
import QuestionEdit from './Components/QuestionEdit';
import Search from './Components/Search';
import FullList from './Components/FullList';
import NewCat from './Components/NewCat';
import HomeEdit from './Components/HomeEdit';
import People from './Components/People';
import { get_currentUser, get_cats } from './actions';


class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            questions: [
                {
                    id: 1,
                    title: "What Happens if I Ask a Stupid Question?",
                    categories: ["CIS", "General"],
                    keyWords: ["Stupid", "Ask"],
                    answer: "If you ask a stupid question you get a stupid answer."
                },
                {
                    id: 2,
                    title: "How do I create a new Question?",
                    categories: ["CIS", "FAQ App", "New Question"],
                    keyWords: ["Question", "Ask", "Stupid"],
                    answer: "Press the new button, enter the details and press save."
                },
                {
                    id: 3,
                    title: "How do I search for Questions?",
                    categories: ["CIS", "FAQ App", "Search"],
                    keyWords: ["Search", "Stupid"],
                    answer: "Press the search button."
                }
            ]
        };
    }

    componentDidMount() {
        //fetch("http://localhost:60824/api/User", { credentials: "include" })
        //    .then(function (response) {
        //        return response.json();
        //    })
        //    .then(data => this.updateUser(data));
        this.props.get_currentUser();
        //fetch("http://localhost:60824/api/Category")
        //    .then(function (response) {
        //        return response.json();
        //    })
        //    .then(data => this.updateCats(data));
        this.props.get_cats();
        fetch("http://localhost:60824/api/Questions")
            .then(function (response) {
                return response.json();
            })
            .then(data => this.updateData(data));
    }

    //refreshCats() {
    //    fetch("http://localhost:60824/api/Category")
    //        .then(function (response) {
    //            return response.json();
    //        })
    //        .then(data => this.updateCats(data));
    //}

    updateData(data) {
        
        this.setState({ questions: data });
    }

    updateCats(data) {
        //console.log(data);
        this.setState({ categories: data });
    }

    //updateUser(data) {
    //    console.log(data);
    //    this.setState({ user: data });
    //}

    handleNewQuestion(question) {
        let Questions = this.state.questions;
        Questions.push(question);
        this.setState({ questions: Questions });
    }

    handleUpdateQuestion(question) {
        let Questions = this.state.questions;
        let index = Questions.findIndex((q => q.id === question.id));
        Questions[index].title = question.title;
        Questions[index].keyWords = question.keyWords;
        Questions[index].answer = question.answer;
        this.setState({ questions: Questions });
    }

    //toggleCat(id) {
        //let newcats = this.state.categories;
        //for (var cat in newcats) {
        //    if (newcats[cat].id === id) {
        //        newcats[cat].open = !newcats[cat].open;
        //    }
        //    if (newcats[cat].subs && newcats[cat].open) {
        //        for (var s in newcats[cat].subs) {
        //            if (newcats[cat].subs[s].id === id) {
        //                newcats[cat].subs[s].open = !newcats[cat].subs[s].open;
        //            }
        //        }
        //    }
        //}
        //this.setState({ categories: newcats });
    //}

    render() {
        return (
            <Router basename="/">
                <DataContext.Provider value={this.state.questions}>
                    <div className="App">
                        <Header canAddQuestion={this.props.currentUser.canAddQuestion}/>
                        <Map/>
                        <div className="container-fluid main">
                            <div className="row">
                                <div className="col-md-2 col-sm-3">
                                    <Sidebar />
                                    {this.props.currentUser.canDoUserAdmin ? <NavLink className="btn btn-warning float-bottom mt-1" to="/UserAdmin" >User Admin</NavLink> : ""}
                                </div>
                                <div className="col-md-10 col-sm-9 mainContent">
                                    <Switch>
                                        <Route exact path="/" component={Home} />
                                        <Route path="/Question/:id" render={(props) => <Question {...props} canEdit={this.props.currentUser.canEditQuestion} />} />
                                        <Route path="/NewQuestion" render={(props) => <QuestionForm {...props} onSave={this.handleNewQuestion.bind(this)} question={{}} categories={this.props.categories} canSave={this.props.currentUser.canAddQuestion} />} />
                                        <Route path="/Edit/:id" render={(props) => <QuestionEdit {...props} onSave={this.handleUpdateQuestion.bind(this)} categories={this.props.categories} canSave={this.props.currentUser.canEditQuestion} />} />
                                        <Route path="/Category/:cat/:sub/:third" component={Category} />
                                        <Route path="/Category/:cat/:sub" component={Category} />} />} />
                                        <Route path="/Category/:cat" component={Category}  />
                                        <Route path="/Search/:keyword" component={Search} />
                                        <Route path="/All" component={FullList} />
                                        <Route path="/NewCat" component={NewCat} />
                                        <Route path="/EditHome" component={HomeEdit} />
                                        <Route path="/UserAdmin" component={People} />
                                        <Route render={() => <p>Not Found</p>} />
                                    </Switch>
                                </div>
                            </div>
                        </div>
                        <br />
                        <Footer username={this.props.currentUser.name} />
                    </div>
                </DataContext.Provider>
            </Router>
        );
    }
}

function mapStateToProps(state) {
    const currentUser = state.currentUser;
    const categories = state.categories.categories;
    return { currentUser, categories };
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators({ get_currentUser, get_cats }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(App);
