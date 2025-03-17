import './index.css';

const initialItems = [
  { id: 1, description: "Passports", quantity: 2, packed: false },
  { id: 2, description: "Socks", quantity: 12, packed: false },
];

function App() {
  return (
    <div className="app">
      <Logo />
      <Form />
      <PackagingLList />
      <Stats />
    </div>
  );
}

function Logo(){
  return (
    <>
      <h1>🌴 Far Away 💼</h1>
    </>
  );
}

function Form(){
  return (
    <div className="add-form">
      <h3>What do you need for your 😍 trip?</h3>
    </div>
  )
}

function PackagingLList(){
  return <div className='list'>LIST</div>;
}

function Stats(){
  return (
    <footer className='stats'>
      <em>💼 You have X items in your list, and you already packed Y (Y%) items.</em>
    </footer>
  )
}

export default App;
