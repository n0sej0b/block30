import React from 'react';
import { Outlet } from 'react-router-dom'; // This will render the nested route content

function Layout() {
  return (
    <div>
      <header>
        <h1>My App</h1>
       
      </header>

      <main>
        <Outlet /> 
      </main>

      <footer>
        <p>Footer Content</p>
      </footer>
    </div>
  );
}

export default Layout;