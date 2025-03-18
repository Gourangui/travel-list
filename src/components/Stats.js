
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

  export default Stats;