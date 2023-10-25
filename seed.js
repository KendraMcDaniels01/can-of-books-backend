const BookModel = require('./BookModel.js');

const seedDatabase = async () => {
  const book1 = new BookModel({
    title: 'Book 1',
    description: 'Description 1',
    status: 'Available',
  });
  const book2 = new BookModel({
    title: 'Book 2',
    description: 'Description 2',
    status: 'Checked Out',
  });
  const book3 = new BookModel({
    title: 'Book 3',
    description: 'Description 3',
    status: 'Available',
  });

  await book1.save();
  await book2.save();
  await book3.save();
};

seedDatabase();