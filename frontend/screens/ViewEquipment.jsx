import React, { useEffect } from 'react';
import { useViewQuery }  from '../slices/equipmentSlice.js'

const ViewComponent = () => {
  const { data: items} = useViewQuery();

  useEffect(() => {
    
  }, []);


  if (items) {
    return (
      <div>
        <h1>Items</h1>
        <ul>
          {items.map(item => (
            <>
            <li >{item.name}</li>
              <li >{item.section}</li>
              </>
          ))}
        </ul>
      </div>
    );
  }

};

export default ViewComponent;
name