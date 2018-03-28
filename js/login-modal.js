class LoginModal extends React.Component {
    constructor(props){
        super(props);

        this.state = {
            username: '',
            password: '',
            isAuthorized: localStorage.getItem('isAuthorized') === 'true'
        };

        this.handleChange = this.handleChange.bind(this);
    }

    validate(){
        if (this.validatePassword() && this.validateUsername()) {
            this.setState({ isAuthorized: true });
            localStorage.setItem('isAuthorized', true);
        }
    }

    validateUsername(){
        const { username } = this.state;

        return username.length > 0;
    }

    validatePassword(){
        const { password } = this.state;
        const charCodes = password.split('').map(char => char.charCodeAt(0));

        let charsInRow = 0, nonOverlappingChars = 0, charsInRowValid = false;

        charCodes.forEach((code, index) => {
            const nextCode = charCodes[index + 1];

            charsInRow++;

            if (charsInRow === 3){
                charsInRowValid = true;
            }

            if (nextCode && nextCode - code !== 1) {
                charsInRow = 0;
            }

            if (nextCode && nextCode === code) {
                nonOverlappingChars++;
            }
        });

        return charsInRowValid && nonOverlappingChars >= 2 && !password.match(/[iOl]|[^a-zA-Z]/g) && password.length <= 32;
    }

    handleChange(e) {
        const { target } = e;

        this.setState({ [target.name]: target.value });
    }

    render() {
        const { username, password, isAuthorized } = this.state;

        return [
            React.createElement('div', { className: `login-modal ${isAuthorized ? 'hidden' : ''}` }, [
                React.createElement('div', { className: 'title' }, 'Login'),
                React.createElement('input', { type: 'text', placeholder: 'Username', value: username, name: 'username', onChange: this.handleChange }),
                React.createElement('input', { type: 'password', placeholder: 'Password', value: password, name: 'password', onChange: this.handleChange }),
                React.createElement('button', { onClick: this.validate.bind(this)}, 'Login')
            ]),
            React.createElement('div', { className: `backdrop ${isAuthorized ? 'hidden' : ''}` })
        ];
    }
}

export default LoginModal;