import Joke from './joke.js';

class JokeList extends React.Component {
    render() {
        const { jokes, toggleFavorite, isFavorite, initFetchSingleFavoriteJokeHandler, isFetching } = this.props;

        return [
            React.createElement('div', { className: 'joke-list' }, (
                jokes.map(joke => React.createElement(Joke, { joke, toggleFavorite, key: joke.id, isFavorite }))
            )),
            initFetchSingleFavoriteJokeHandler && React.createElement('div', { className: 'button-container' }, (
                React.createElement('button', { disabled: isFetching, onClick: initFetchSingleFavoriteJokeHandler }, !isFetching ? 'Fetch more!' : 'Fetching...')
            ))
        ]
    }
}

export default JokeList;