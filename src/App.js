import './index.css';
import { useState } from 'react';

/* const initialItems = [
  { id: 1, description: "Passports", quantity: 2, packed: false },
  { id: 2, description: "Socks", quantity: 12, packed: false },
  { id: 3, description: "Charger", quantity: 5, packed: true },
]; */

function App() {
  const [items, setItems] = useState([]);

  function handleAddItem(newItem){
    setItems((items) => [...items, newItem]);
  }

  function handleClearList(){
    const confirmed = window.confirm('Are you sure you want to delete all items?');
    if (confirmed) setItems((items) => []);
  }

  function handleRemoveItem(id){
    setItems((items) => items.filter((item) => item.id !== id));
  }

  function handleToggleItem(id){
    setItems((items) => 
      items.map((item) => 
        item.id === id ? {...item, packed: !item.packed} 
        : item
    ));
  }

  return (
    <div className="app">
      <Logo />
      <Form onAddItems={handleAddItem} />
      <PackagingList items={items} onDeleteItem={handleRemoveItem} onToggleItem={handleToggleItem} onClearItems={handleClearList}/>
      <Stats items={items}/>
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
  const [description, setDescription] = useState('');
  const [quantity, setQuantity] = useState(1);

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
      <button type='submit'>Add</button>
    </form>
  )
}

/* list of items */
function PackagingList({items, onDeleteItem, onToggleItem, onClearItems}){
  const [sortBy, setSortBy] = useState('input');

  let sortedItems;

  if (sortBy === 'input') sortedItems = items;

  if (sortBy === 'description') 
    sortedItems = items.slice()
    .sort((a, b) => a.description.localeCompare(b.description));

  if (sortBy === 'packed')
    sortedItems = items.slice()
    .sort((a, b) => a.packed - b.packed);

  return (
    <div className='list'>
      <ul>
        {sortedItems.map(item => (
          <Item key={item.id} item={item} onDeleteItem={onDeleteItem} onToggleItem={onToggleItem} />
        ))}
      </ul>
      <div className='actions'>
        <select value={sortBy} onChange={(e) => setSortBy(e.target.value)}>
          <option value='input'>Sort by input order</option>
          <option value='description'>sort by description</option>
          <option value='packed'>Sort by packed status</option>
        </select>
        <button onClick={onClearItems}>Clear list</button>
      </div>
    </div>
  )
}

function Item({ item, onDeleteItem, onToggleItem }){
  return (
    <li>
      <input 
        type='checkbox' 
        checked={item.packed}
        onClick={() => onToggleItem(item.id)}/>
      <span style={item.packed ? {textDecoration: "line-through"} : {}}>
        {item.quantity} {item.description}
      </span>
      <button onClick={() => onDeleteItem(item.id)}>❌</button>
    </li>
  )
}

function Stats({items}){
  if (!items.length) return <footer className='stats'>
    <p><em>Start adding some items to your packing list 🚀</em></p>
  </footer>;

  const numItems = items.length;
  const numPackedItems = items.filter((item) => item.packed).length;
  const percentage = numItems > 0 ? Math.round(numPackedItems / numItems * 100) : 0;

  return (
    <footer className='stats'>
      <em>
        {percentage === 100 ? 'You got everything! Ready to go!' 
        : `💼 You have ${numItems} items in your list, and you already packed ${numPackedItems} (${percentage}%) items.!`}
      </em>
    </footer>
  )
}

export default App;
