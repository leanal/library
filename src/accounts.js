function findAccountById(accounts, id) {
  return accounts.find(account => account.id === id);;
}

function sortAccountsByLastName(accounts) {
  return accounts.sort((accA, accB) =>
  accA.name.last.toLowerCase() > accB.name.last.toLowerCase() ? 1 : -1);
}

function getTotalNumberOfBorrows(account, books) {
  return books.reduce((acc, book) => {
    if(book.borrows.some(borrow => borrow.id === account.id)) acc++;
    return acc;
  }, 0);
}

function getBooksPossessedByAccount(account, books, authors) {
  return books.reduce((booksInPossession, book) => {
  // search borrows array to find out if book is in possession of account.id
    const inPossession = book.borrows.some(borrow => account.id === borrow.id && !borrow.returned);
    if(inPossession) {
      const id = book.id;
      const title = book.title;
      const genre = book.genre;
      const authorId = book.authorId;
      const author = authors.find(author => author.id === book.authorId);
      const borrows = book.borrows;
      const bookInPossession = {id, title, genre, authorId, author, borrows};
      booksInPossession.push(bookInPossession);
    }
    return booksInPossession;
  }, []);
}

module.exports = {
  findAccountById,
  sortAccountsByLastName,
  getTotalNumberOfBorrows,
  getBooksPossessedByAccount,
};
