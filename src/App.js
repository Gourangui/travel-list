import './index.css';

const initialItems = [
  { id: 1, description: "Passports", quantity: 2, packed: false },
  { id: 2, description: "Socks", quantity: 12, packed: false },
  { id: 3, description: "Charger", quantity: 5, packed: true },
];

function App() {
  return (
    <div className="app">
      <Logo />
      <Form />
      <PackagingList />
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

function PackagingList(){
  return (
    <div className='list'>
      <ul>
        {initialItems.map(item => (
          <Item key={item.id} item={item} />
        ))}
      </ul>
    </div>
  )
}

function Item({ item }){
  return (
    <li>
      <input type='checkbox' checked={item.packed} />
      <span>{item.quantity} {item.description}</span>
      <button>❌</button>
    </li>
  )
}

function Stats(){
  return (
    <footer className='stats'>
      <em>💼 You have X items in your list, and you already packed Y (Y%) items.</em>
    </footer>
  )
}

export default App;
