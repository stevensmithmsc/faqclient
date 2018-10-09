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
                {
                    id: 1,
                    category: "Paris Main",
                    subs: [
                        { id: 7, category: "Demographics" },
                        { id: 8, category: "Inpatients" },
                        { id: 9, category: "Outpatients" },
                        { id: 10, category: "Contacts" },
                        { id: 11, category: "UDFs" },
                        { id: 12, category: "Mental Health Act" }
                    ],
                    open: false
                },
                {
                    id: 2,
                    category: "EMIS"
                },
                {
                    id: 13,
                    category: "Paris Child Health"
                },
                {
                    id: 14,
                    category: "CIS",
                    subs: [{
                            id: 3,
                            category: "FAQ App",
                            subs: [
                                {
                                    id: 5,
                                    category: "New Question"
                                },
                                {
                                    id: 6,
                                    category: "Search"
                                }
                            ],
                            open: false
                        },
                            {
                                id: 4,
                                category: "General"
                            }],
                    open: false
                }
                
            ]
        };
    }

    componentDidMount() {
        fetch("http://localhost:60824/api/Questions")
            .then(function (response) {
                return response.json();
            })
            .then(data => this.updateData(data));
    }

    updateData(data) {
        console.log(data);
        this.setState({ questions: data });
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
                        <Header />
                        <Map />
                        <div className="container-fluid main">
                            <div className="row">
                                <div className="col-md-2 col-sm-3">
                                    <Sidebar cats={this.state.categories} toggle={this.toggleCat.bind(this)}/>
                                </div>
                                <div className="col-md-10 col-sm-9 mainContent">
                                    <Switch>
                                        <Route exact path="/" component={Home} />
                                        <Route path="/Question/:id" component={Question} />
                                        <Route path="/NewQuestion" render={(props) => <QuestionForm {...props} onSave={this.handleNewQuestion.bind(this)} question={{}} categories={this.state.categories} />} />
                                        <Route path="/Edit/:id" render={(props) => <QuestionEdit {...props} onSave={this.handleUpdateQuestion.bind(this)} categories={this.state.categories} />} />
                                        <Route path="/Category/:cat/:sub/:third" component={Category} />
                                        <Route path="/Category/:cat/:sub" component={Category} />
                                        <Route path="/Category/:cat" component={Category} />
                                        <Route path="/Search/:keyword" component={Search} />
                                        <Route path="/All" component={FullList} />
                                    </Switch>
                                </div>
                            </div>
                        </div>
                        <br />
                        <Footer />
                    </div>
                </DataContext.Provider>
            </Router>
        );
    }
}

export default App;
