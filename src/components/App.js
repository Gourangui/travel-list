import '../index.css';
import { useState } from 'react';
import Logo from './Logo.js';
import Form from './Form.js';
import Stats from './Stats.js';
import PackagingList from './PackagingList.js';

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



export default App;
