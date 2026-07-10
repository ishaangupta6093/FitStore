const mongoose = require("mongoose");
const dotenv = require("dotenv");
const User = require("./models/User");
const Product = require("./models/Product");
const Order = require("./models/Order");
const connectDB = require("./config/db");

dotenv.config();

connectDB();

const sampleProducts = [
  {
    name: "Gold Whey Protein",
    description: "Premium whey protein isolate for maximum muscle growth and recovery. 24g of protein per serving.",
    price: 2499,
    originalPrice: 3200,
    image: "/products/protien.jpg",
    category: "Protein",
    brand: "Optimum Nutrition",
    stock: 50,
    rating: 4.9,
    numReviews: 120,
    badge: "Best Seller",
    isFeatured: true,
  },
  {
    name: "Micronized Creatine",
    description: "100% pure micronized creatine monohydrate to support strength, power, and muscle size.",
    price: 899,
    originalPrice: 1200,
    image: "/products/creatine.jpg",
    category: "Creatine",
    brand: "MuscleTech",
    stock: 100,
    rating: 4.8,
    numReviews: 85,
    badge: "New",
    isFeatured: true,
  },
  {
    name: "C4 Pre Workout",
    description: "Explosive energy, heightened focus and an overwhelming urge to tackle any challenge.",
    price: 1299,
    originalPrice: 1800,
    image: "/products/preworkout.jpg",
    category: "Pre Workout",
    brand: "Cellucor",
    stock: 30,
    rating: 4.7,
    numReviews: 230,
    badge: "Hot",
    isFeatured: true,
  },
  {
    name: "Pro Gym Shaker 700ml",
    description: "Leak-proof protein shaker bottle with mixing ball for smooth shakes.",
    price: 499,
    originalPrice: 699,
    image: "/products/shaker.jpg",
    category: "Accessories",
    brand: "FitStore",
    stock: 200,
    rating: 4.6,
    numReviews: 45,
    badge: "Popular",
    isFeatured: true,
  },
];

const importData = async () => {
  try {
    await Order.deleteMany();
    await Product.deleteMany();
    await User.deleteMany();

    const createdUsers = await User.create([
      {
        name: "Admin User",
        email: "admin@fitstore.com",
        password: "password123",
        role: "admin",
      },
      {
        name: "John Doe",
        email: "john@example.com",
        password: "password123",
      },
    ]);

    const adminUser = createdUsers[0]._id;

    const productsWithUser = sampleProducts.map((product) => {
      return { ...product, user: adminUser };
    });

    await Product.insertMany(productsWithUser);

    console.log("✅ Data Imported!");
    process.exit();
  } catch (error) {
    console.error(`❌ Error: ${error.message}`);
    process.exit(1);
  }
};

const destroyData = async () => {
  try {
    await Order.deleteMany();
    await Product.deleteMany();
    await User.deleteMany();

    console.log("🗑️ Data Destroyed!");
    process.exit();
  } catch (error) {
    console.error(`❌ Error: ${error.message}`);
    process.exit(1);
  }
};

if (process.argv[2] === "-d") {
  destroyData();
} else {
  importData();
}
