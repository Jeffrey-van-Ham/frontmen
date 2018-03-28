class Joke extends React.Component {

    render() {
        const { joke, toggleFavorite } = this.props;
        const isFavorite = this.props.isFavorite(joke);

        return React.createElement('div', { className: 'joke' }, [
            React.createElement('span', { className: `star ${isFavorite ? 'favorite' : ''}`, onClick: toggleFavorite.bind(this, joke) }, isFavorite ? '★' : '☆'),
            React.createElement('span', { dangerouslySetInnerHTML: { __html: joke.joke } })
        ]);
    }
}

export default Joke;