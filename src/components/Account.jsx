/* TODO - add your code to create a functional React component that renders account details for a logged in user. Fetch the account data from the provided API. You may consider conditionally rendering a message for other users that prompts them to log in or create an account.  */

import React, { useState, useEffect } from "react";


function Account({ token,account, setAccount,rBook,setRbook }) {
  
  console.log(token);

  useEffect(() => {
    const getUser = async () => {
      try {
        const response = await fetch(
          "https://fsa-book-buddy-b6e748d1380d.herokuapp.com/api/users/me",
          {
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
          }
        );
        const result = await response.json();
        setAccount(result);

        console.log(result);
        return result;
      } catch (error) {
        console.log(error);
      }
    };
    getUser();
  }, [token,account]);

  const returnbook = async (id) => {
      try {
        const response = await fetch(
          `https://fsa-book-buddy-b6e748d1380d.herokuapp.com/api/reservations/${id}`,
          {method:'DELETE',
            headers: {
              'Content-Type': 'applicatino/json',
              Authorization: `Bearer ${token}`,
            },
          }
        )
        
      }catch (error) {
        console.log(error);
      }


  }

  return (
    <>
      {account ? (
        <>
          <h3>Welcome {account.firstname}</h3>
          
          <div className="books-container">
            {account.books?.map((book) => (
              <div
                key={book.id}
                className="book-card"
                style={{
                  fontSize: "18px",
                  color: "cyan",
                }}
              >
                <p>{book.author}</p>
                <img
                  src={book.coverimage}
                  width={200}
                  height={250}
                  alt={book.title}
                  loading="lazy"
                />
                <button onClick={() => returnbook(book.id)} >Return</button>
              </div>
            ))}
          </div>
        </>
      ) : (
        <h3>Please Login</h3>
      )}
    </>
  );
}

export default Account;
