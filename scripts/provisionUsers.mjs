import { JSONFileSyncPreset } from "lowdb/node";
import { Client } from "stytch";
import users from "../cypress/fixtures/users.json" assert { type: "json" };
import { PASSWORD, dbFile, defaultData } from "../lib/database.mjs";

import _ from "lodash";
const { pick, get } = _;

const client = new Client({
  project_id: process.env.STYTCH_PROJECT_ID,
  secret: process.env.STYTCH_SECRET,
});

async function main() {
  const db = await JSONFileSyncPreset(dbFile, defaultData);
  const provisionedUsers = await Promise.all(
    users.map(async (user) => {
      const userObj = await client.passwords.create({
        email: user.email,
        password: PASSWORD,
        name: {
          first_name: user.name.first_name,
          middle_name: user.name.middle_name,
          last_name: user.name.last_name,
        },
        trusted_metadata: {
          group: user.group,
        },
      });

      const newUser = pick(userObj, ["user_id"]);
      newUser["email"] = userObj["user"]["emails"][0]["email"];
      newUser["group"] = get(userObj, "user.trusted_metadata.group");

      return newUser;
    })
  );

  await db.update(({ users }) => users.push(...provisionedUsers));
}

main();
