import sequelize from "./model/index.js";

await sequelize.sync({ force: true });
console.log("All models were synchronized successfully.");
