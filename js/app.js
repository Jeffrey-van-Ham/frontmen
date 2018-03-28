import Header from './header.js';
import JokeList from './joke-list.js';
import LoginModal from './login-modal.js';

const getJokes = (nrOfJokes) => axios.get(`http://api.icndb.com/jokes/random/${nrOfJokes}`).then(result => result.data.value);

class App extends React.Component {
    constructor(props){
        super(props);

        const favoriteJokes = localStorage.getItem('favoriteJokes');

        this.state = {
            jokes: [],
            favoriteJokes: favoriteJokes ? JSON.parse(favoriteJokes) : [],
            selectedList: 'all',
            isFetching: false
        };

        this.toggleFavorite = this.toggleFavorite.bind(this);
        this.changeList = this.changeList.bind(this);
        this.isFavorite = this.isFavorite.bind(this);
        this.initFetchSingleFavoriteJokeHandler = this.initFetchSingleFavoriteJokeHandler.bind(this);
    }

    componentWillMount(){
        getJokes(10).then(jokes => this.setState({ jokes }));
    }

    toggleFavorite(joke, forceAdd = false){
        const { favoriteJokes } = this.state;
        const updatedFavoriteJokes = !this.isFavorite(joke) || !forceAdd ? [...favoriteJokes, joke] : favoriteJokes.filter(f => f.id !== joke.id);

        if (updatedFavoriteJokes.length <= 10) {
            this.setState({ favoriteJokes: updatedFavoriteJokes });
            return localStorage.setItem('favoriteJokes', JSON.stringify(updatedFavoriteJokes));
        }

        this.setState({ isFetching: false });
        clearInterval(this.favoriteJokeInterval);
    }

    changeList(list) {
        this.setState({ selectedList: list })
    }

    isFavorite(joke){
        return this.state.favoriteJokes.some(f => f.id === joke.id);
    }

    initFetchSingleFavoriteJokeHandler(){
        clearInterval(this.favoriteJokeInterval);

        this.setState({ isFetching: true });

        this.favoriteJokeInterval = setInterval(() => {
            getJokes(1).then(jokes => jokes[0]).then(joke => this.toggleFavorite(joke, true));
        }, 1000)
    }

    render(){
        const { jokes, favoriteJokes, selectedList, isFetching } = this.state;

        return [
            React.createElement('div', { className: 'container' }, [
                React.createElement(Header, { changeList: this.changeList, selectedList }),
                selectedList === 'favorites' ?
                    React.createElement(JokeList, {
                        title: 'Favorites',
                        jokes: favoriteJokes,
                        toggleFavorite: this.toggleFavorite,
                        isFavorite: this.isFavorite,
                        initFetchSingleFavoriteJokeHandler: this.initFetchSingleFavoriteJokeHandler,
                        isFetching
                    }) :
                    React.createElement(JokeList, {
                        title: 'Jokes',
                        jokes,
                        toggleFavorite: this.toggleFavorite,
                        isFavorite: this.isFavorite
                    })
            ]),
            React.createElement(LoginModal)
        ]
    }
}

ReactDOM.render(
    React.createElement(App),
    document.getElementById('root')
);