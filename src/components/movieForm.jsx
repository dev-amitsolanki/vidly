import React from 'react';

const MovieForm = ({ match, history }) => {
    console.log(match)
    return (
        <div>
            <h1>hello {match.params.id}</h1>
            <button className="btn btn-primary btn-sm" onClick={() => history.push("/movies")}>Save</button>
        </div>
    );
}

export default MovieForm;