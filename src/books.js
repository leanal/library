function findAuthorById(authors, id) {
  return authors.find(author => author.id === id);
}

function findBookById(books, id) {
  return books.find(book => book.id === id);
}

function partitionBooksByBorrowedStatus(books) {
  let returnedBooks = [];
  let partitionedBooks = [];
  const borrowedBooks = books.filter(book => {
    // checks if a book has not been returned
    const borrowed = book.borrows.some(borrow => borrow.returned === false)
    if (!borrowed) returnedBooks.push(book)
    return borrowed;
  }, []);
  partitionedBooks.push(borrowedBooks);
  partitionedBooks.push(returnedBooks);
  return partitionedBooks;
}

function getBorrowersForBook(book, accounts) {
  let transactions = [];
  // returns all of the transactions of a given book
  return book.borrows.reduce((acc, borrow) =>{
    if (acc.length === 10) return transactions
    // returns the borrower's information
    const borrower = accounts.find(account => {
      if (account.id === borrow.id) {
        const id = account.id;
        const returned = borrow.returned;
        const picture = account.picture;
        const age = account.age;
        const name = account.name;
        const company = account.company;
        const email = account.email;
        const registered = account.registered;
        const info = {id, returned, picture, age, name,  company, email, registered};
        transactions.push(info);
      }
    }, 0);
    return transactions;
  }, [])
}

module.exports = {
  findAuthorById,
  findBookById,
  partitionBooksByBorrowedStatus,
  getBorrowersForBook,
};
