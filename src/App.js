import './index.css';
import { useState } from 'react';

/* const initialItems = [
  { id: 1, description: "Passports", quantity: 2, packed: false },
  { id: 2, description: "Socks", quantity: 12, packed: false },
  { id: 3, description: "Charger", quantity: 5, packed: true },
]; */

function App() {
  const [items, setItems] = React.useState([]);
  function handleAddItems(newItem){
    setItems((items) => [...items, newItem]);
  }

  return (
    <div className="app">
      <Logo />
      <Form onAddItems={handleAddItems} />
      <PackagingList items={items} />
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

/* add item */
function Form({ onAddItems }){
  const [description, setDescription] = React.useState('');
  const [quantity, setQuantity] = React.useState(1);

  function handleSubmit(e){
    e.preventDefault();

    if (!description) return;

    const newItem = {
      id: Math.random(),
      description,
      quantity,
      packed: false,
    };

    onAddItems(newItem);

    setDescription('');
    setQuantity(1);
  }

  return (
    <form className="add-form" onSubmit={handleSubmit}>
      <h3>What do you need for your 😍 trip?</h3>
      <select value={quantity} onChange={(e) => setQuantity(e.target.value)}>
        {Array.from({ length: 10 }, (_, i) => i + 1).map 
        ((num) => (
          <option value={num} key={num}>{num}</option>
        ))}
      </select>
      <input type='text' placeholder='Item...' value={description} onChange={(e) => {
        setDescription(e.target.value);
      }}/>
    </form>
  )
}

/* list of items */
function PackagingList({items}){
  return (
    <div className='list'>
      <ul>
        {items.map(item => (
          <Item key={item.id} item={item} />
        ))}
      </ul>
    </div>
  )
}

function Item({ item }){
  return (
    <li>
      <input 
      type='checkbox' 
      checked={item.packed} 
      onClick={item.packed ? {textDecoration: "line-through"} : {}}/>
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
