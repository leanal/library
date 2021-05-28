function getTotalBooksCount(books) {
  return books.length;
}

function getTotalAccountsCount(accounts) {
  return accounts.length;
}

function getBooksBorrowedCount(books) {
  return books.reduce((acc, book) => {
    if (!book.borrows[0].returned) acc++
    return acc
  }, 0)
}

function getMostCommonGenres(books) {
  // returns an array of genres and count
  let genres = books.reduce((allGenres, book) => {
    const found = allGenres.some(genre => genre.name === book.genre)
    if (!found) {
      const genre = {};
      genre["name"] = book.genre,
      genre["count"] = 1;
      allGenres.push(genre)
    } else if (found) {
      allGenres.find((genre) => {
        if (genre.name === book.genre) genre.count++
      })
    }
    return allGenres;
  }, [])
  // sorts genre from most common to least
  const commonGenres = genres.sort((genreA, genreB) => genreA.count < genreB.count ? 1 : -1)
  
  // top 5 genres
  return commonGenres.slice(0, 5);
}

function getMostPopularBooks(books) {
  // array of books with the number of times it has been borrowed
  const borrowedBooks = books.reduce((acc, book) => {
    const bookEntry = {};
    bookEntry["name"] = book.title,
    bookEntry["count"] = book.borrows.length;
    acc.push(bookEntry)
    console.log("acc",acc)
    return acc;
  }, [])
  // sorts from the number of borrows
  const mostPopularBook = borrowedBooks.sort((bookA, bookB) => bookA.count < bookB.count ? 1 : -1)
  // returns top 5 borrowed books
  return mostPopularBook.slice(0, 5);
}
function getAuthorById(authors, authorId) {
  return authors.find((author) => author.id === authorId);
}

function getMostPopularAuthors(books, authors) {
  const bookAuthors = [];
  books.forEach((book) => {
    const match = bookAuthors.find((author) => author.id === book.authorId);
    if (match) {
      match.count += book.borrows.length;
    } else {
      const writer = getAuthorById(authors, book.authorId);
      const count = book.borrows.length;
      bookAuthors.push({
        name: `${writer.name.first} ${writer.name.last}`,
        count,
      });
    }
  });
  let result = bookAuthors.sort((authorA, authorB) =>
    authorA.count < authorB.count ? 1 : -1
  );
  result = result.slice(0, 5);
  return result;
}
module.exports = {
  getTotalBooksCount,
  getTotalAccountsCount,
  getBooksBorrowedCount,
  getMostCommonGenres,
  getMostPopularBooks,
  getMostPopularAuthors,
};
