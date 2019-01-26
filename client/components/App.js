import  React from 'react';

const App = (props) => {

    return (
        <div>
            <h1>Test works </h1>
            {props.children}
        </div>
    )
};

export default App;