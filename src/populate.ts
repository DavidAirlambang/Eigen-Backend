import prisma from "./utils/prisma";

const booksData = [
  {
    code: "JK-45",
    title: "Harry Potter",
    author: "J.K Rowling",
    stock: 1,
  },
  {
    code: "SHR-1",
    title: "A Study in Scarlet",
    author: "Arthur Conan Doyle",
    stock: 1,
  },
  {
    code: "TW-11",
    title: "Twilight",
    author: "Stephenie Meyer",
    stock: 1,
  },
  {
    code: "HOB-83",
    title: "The Hobbit, or There and Back Again",
    author: "J.R.R. Tolkien",
    stock: 1,
  },
  {
    code: "NRN-7",
    title: "The Lion, the Witch and the Wardrobe",
    author: "C.S. Lewis",
    stock: 1,
  },
];

const memberData = [
  {
    code: "M001",
    name: "Angga",
  },
  {
    code: "M002",
    name: "Ferry",
  },
  {
    code: "M003",
    name: "Putri",
  },
];

async function populateDatabase() {
  try {
    // Populate books
    await Promise.all(
      booksData.map(async (book) => {
        await prisma.book.create({
          data: book,
        });
      })
    );

    // Populate members
    await Promise.all(
      memberData.map(async (member) => {
        await prisma.member.create({
          data: member,
        });
      })
    );

    console.log("Database populated successfully.");
  } catch (error) {
    console.error("Error populating database:", error);
  } finally {
    await prisma.$disconnect();
  }
}

populateDatabase();
