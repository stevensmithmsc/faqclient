import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
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
            ],
            categories: [
                //{
                //    id: 1,
                //    category: "Paris Main",
                //    subs: [
                //        { id: 7, category: "Demographics" },
                //        { id: 8, category: "Inpatients" },
                //        { id: 9, category: "Outpatients" },
                //        { id: 10, category: "Contacts" },
                //        { id: 11, category: "UDFs" },
                //        { id: 12, category: "Mental Health Act" }
                //    ],
                //    open: false
                //},
                //{
                //    id: 2,
                //    category: "EMIS"
                //},
                //{
                //    id: 13,
                //    category: "Paris Child Health"
                //},
                {
                    id: 14,
                    categoryName: "CIS",
                    subs: [{
                            id: 3,
                            categoryName: "FAQ App",
                            subs: [
                                {
                                    id: 5,
                                    categoryName: "New Question"
                                },
                                {
                                    id: 6,
                                    categoryName: "Search"
                                }
                            ],
                            open: false
                        },
                            {
                                id: 4,
                                categoryName: "General"
                            }],
                    open: false
                }
                
            ],
            user: {
                name: "Unknown",
                canEditHomePage: false
            }
        };
    }

    componentDidMount() {
        fetch("http://localhost:60824/api/Questions")
            .then(function (response) {
                return response.json();
            })
            .then(data => this.updateData(data));
        fetch("http://localhost:60824/api/Category")
            .then(function (response) {
                return response.json();
            })
            .then(data => this.updateCats(data));
        fetch("http://localhost:60824/api/User", { credentials: "include" })
            .then(function (response) {
                return response.json();
            })
            .then(data => this.updateUser(data));
    }

    updateData(data) {
        
        this.setState({ questions: data });
    }

    updateCats(data) {
        console.log(data);
        this.setState({ categories: data });
    }

    updateUser(data) {
        console.log(data);
        this.setState({ user: data });
    }

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

    toggleCat(id) {
        let newcats = this.state.categories;
        for (var cat in newcats) {
            if (newcats[cat].id === id) {
                newcats[cat].open = !newcats[cat].open;
            }
            if (newcats[cat].subs && newcats[cat].open) {
                for (var s in newcats[cat].subs) {
                    if (newcats[cat].subs[s].id === id) {
                        newcats[cat].subs[s].open = !newcats[cat].subs[s].open;
                    }
                }
            }
        }
        this.setState({ categories: newcats });
    }

    render() {
        return (
            <Router basename="/">
                <DataContext.Provider value={this.state.questions}>
                    <div className="App">
                        <Header canAddQuestion={this.state.user.canAddQuestion}/>
                        <Map/>
                        <div className="container-fluid main">
                            <div className="row">
                                <div className="col-md-2 col-sm-3">
                                    <Sidebar cats={this.state.categories} toggle={this.toggleCat.bind(this)} canAdd={this.state.user.canAddCategory} />
                                </div>
                                <div className="col-md-10 col-sm-9 mainContent">
                                    <Switch>
                                        <Route exact path="/" render={(props) => <Home {...props} canEdit={this.state.user.canEditHomePage} />} />
                                        <Route path="/Question/:id" render={(props) => <Question {...props} canEdit={this.state.user.canEditQuestion} />} />
                                        <Route path="/NewQuestion" render={(props) => <QuestionForm {...props} onSave={this.handleNewQuestion.bind(this)} question={{}} categories={this.state.categories} />} />
                                        <Route path="/Edit/:id" render={(props) => <QuestionEdit {...props} onSave={this.handleUpdateQuestion.bind(this)} categories={this.state.categories} />} />
                                        <Route path="/Category/:cat/:sub/:third" render={(props) => <Category {...props} canDelete={this.state.user.canDeleteCategory} />} />
                                        <Route path="/Category/:cat/:sub" render={(props) => <Category {...props} canDelete={this.state.user.canDeleteCategory} />} />
                                        <Route path="/Category/:cat" render={(props) => <Category {...props} canDelete={this.state.user.canDeleteCategory} />}  />
                                        <Route path="/Search/:keyword" component={Search} />
                                        <Route path="/All" component={FullList} />
                                        <Route path="/NewCat" component={NewCat} />
                                        <Route path="/EditHome" render={() => <HomeEdit />} />
                                        <Route path="/UserAdmin" render={() => <p>User Admin</p>} />
                                        <Route render={() => <p>Not Found</p>} />
                                    </Switch>
                                </div>
                            </div>
                        </div>
                        <br />
                        <Footer username={this.state.user.name} />
                    </div>
                </DataContext.Provider>
            </Router>
        );
    }
}

export default App;
