const { defineConfig } = require("cypress");
// import { dbFile } from "lib/database";
// import { JSONFileSyncPreset } from "lowdb/node";

module.exports = defineConfig({
  e2e: {
    baseUrl: "http://localhost:3000",
    setupNodeEvents(on, config) {
      // on("task", {
      //   async getUsers() {
      //     const db = await JSONFileSyncPreset(dbFile, defaultData);
      //     return db.data.users;
      //   },
      // });
    },
  },
});
