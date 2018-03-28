class Header extends React.Component {

    render() {
        const { changeList, selectedList } = this.props;

        return React.createElement('div', { className: 'header'}, [
            React.createElement('a', { className: selectedList === 'all' ? 'active' : '', href: '#', onClick: changeList.bind(this, 'all') }, 'All'),
            React.createElement('a', { className: selectedList === 'favorites' ? 'active' : '', href: '#', onClick: changeList.bind(this, 'favorites') }, 'Favorites'),
        ]);
    }
}

export default Header;