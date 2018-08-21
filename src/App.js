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


class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            questions: [
                {
                    id: 1,
                    title: "What Happens if I Ask a Stupid Question?",
                    categories: ["General"],
                    keyWords: ["Stupid", "Ask"],
                    answer: "If you ask a stupid question you get a stupid answer."
                },
                {
                    id: 2,
                    title: "How do I create a new Question?",
                    categories: ["FAQ App", "New Question"],
                    keyWords: ["Question", "Ask", "Stupid"],
                    answer: "Press the new button, enter the details and press save."
                },
                {
                    id: 3,
                    title: "How do I search for Questions?",
                    categories: ["FAQ App", "Search"],
                    keyWords: ["Search", "Stupid"],
                    answer: "Press the search button."
                }
            ]
        }
    }

    handleNewQuestion(question) {
        let Questions = this.state.questions;
        let number = Questions.length + 1;
        question["id"] = number;
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

    render() {
        return (
            <Router basename="/FAQ">
                <DataContext.Provider value={this.state.questions}>
                    <div className="App">
                        <Header />
                        <Map />
                        <div className="container-fluid main">
                            <div className="row">
                                <div className="col-md-2 col-sm-3">
                                    <Sidebar />
                                </div>
                                <div className="col-md-10 col-sm-9">
                                    <Switch>
                                        <Route exact path="/" component={Home} />
                                        <Route path="/Question/:id" component={Question} />
                                        <Route path="/NewQuestion" render={(props) => <QuestionForm {...props} onSave={this.handleNewQuestion.bind(this)} question={{}} />} />
                                        <Route path="/Edit/:id" render={(props) => <QuestionEdit {...props} onSave={this.handleUpdateQuestion.bind(this)} />} />
                                        <Route path="/Category/:cat/:sub/:third" component={Category} />
                                        <Route path="/Category/:cat/:sub" component={Category} />
                                        <Route path="/Category/:cat" component={Category} />
                                        <Route path="/Search/:keyword" component={Search} />
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
