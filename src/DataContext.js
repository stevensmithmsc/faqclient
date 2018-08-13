import React from 'react';

const DataContext = React.createContext([
    {
        id: 1,
        title: "Stupid Question",
        categories: ["General"],
        keyWords: ["Stupid", "Ask"],
        answer: "If you ask a stupid question you get a stupid answer."
    }
]);

export default DataContext;