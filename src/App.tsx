import * as S from './App.style';
import logo from './logo.svg';

function App() {
  return (
    <div className="App">
      <S.Container>
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit
          and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </S.Container>
    </div>
  );
}

export default App;
