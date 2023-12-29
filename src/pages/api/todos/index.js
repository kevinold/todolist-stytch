import { JSONFilePreset } from "lowdb/node";

const defaultData = { users: [], todos: [] };
const db = await JSONFilePreset("db.json", defaultData);

export default async function handler(req, res) {
  const { group } = req.query;

  if (req.method === "GET") {
    const todos = await db.data.todos;

    const groupTodos = todos.filter((todo) => todo.group === group);

    res.status(200).json(groupTodos);
  } else {
    res.setHeader("Allow", ["GET"]);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
