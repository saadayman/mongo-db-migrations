const axios = require("axios");

module.exports = {
  async up(db) {
    try {
      const { data: users } = await axios.get("https://jsonplaceholder.typicode.com/users");
      const formattedUsers = users.map(user => ({
        fullName: user.name,
        email: user.email,
        password: "default-password",
        role: "user",
        createdAt: new Date(),
      }));

      await db.collection("users").insertMany(formattedUsers);
    } catch (err) {
      console.error("❌ Error fetching or inserting users:", err);
      throw err;
    }
  },

  async down(db) {
    const emails = [
      "Sincere@april.biz",
      "Shanna@melissa.tv",
      "Nathan@yesenia.net",
      "Julianne.OConner@kory.org",
      "Lucio_Hettinger@annie.ca",
      "Karley_Dach@jasper.info",
      "Telly.Hoeger@billy.biz",
      "Sherwood@rosamond.me",
      "Chaim_McDermott@dana.io",
      "Rey.Padberg@karina.biz"
    ];

    await db.collection("users").deleteMany({ email: { $in: emails } });
  }
};
