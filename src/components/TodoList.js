import { useStytchUser } from "@stytch/nextjs";
import { useQuery, useQueryClient } from "@tanstack/react-query";

const fetchTodos = async (group) => {
  const response = await fetch(
    "/api/todos?" +
      new URLSearchParams({
        group,
      })
  );
  console.log("response", response);
  const data = await response.json();
  if (!response.ok) {
    throw new Error("Network response was not ok");
  }
  return data;
};

const todoStatuses = {
  Pending: "text-red-700 bg-red-50 ring-red-600/20",
  "In progress": "text-blue-600 bg-blue-50 ring-blue-500/10",
  Completed: "text-green-700 bg-green-50 ring-green-600/20",
};

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

export default function TodoList() {
  const { user } = useStytchUser();
  const queryClient = useQueryClient();

  const { data: todos, status } = useQuery({
    queryKey: ["todos"],
    queryFn: () => fetchTodos(user.trusted_metadata.group),
    enabled: !!user,
  });

  if (status === "pending") {
    return <span>Loading...</span>;
  }

  if (status === "error") {
    return <span>Error loading todos</span>;
  }

  return (
    <>
      <div>User group: {user.trusted_metadata.group}</div>
      <ul
        data-test="todo-list"
        role="list"
        className="divide-y divide-gray-100"
      >
        {todos.map((todo) => (
          <li
            key={todo.id}
            className="flex items-center justify-between gap-x-6 py-5"
          >
            <div className="min-w-0">
              <div className="flex items-start gap-x-3">
                <p className="text-sm font-semibold leading-6 text-gray-900">
                  {todo.task}
                </p>
                <p
                  className={classNames(
                    todoStatuses[todo.status],
                    "rounded-md whitespace-nowrap mt-0.5 px-1.5 py-0.5 text-xs font-medium ring-1 ring-inset"
                  )}
                >
                  {todo.status}
                </p>
              </div>
              <div className="mt-1 flex items-center gap-x-2 text-xs leading-5 text-gray-500">
                <p className="!text-xs whitespace-nowrap">
                  Due on <time dateTime={todo.dueDateTime}>{todo.dueDate}</time>
                </p>

                <p className="!text-xs truncate">Created by {todo.createdBy}</p>
              </div>
            </div>
            <div className="flex flex-none items-center gap-x-4">
              <a
                href="#"
                className="hidden rounded-md bg-white px-2.5 py-1.5 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 sm:block"
              >
                Complete
              </a>
            </div>
          </li>
        ))}
      </ul>
    </>
  );
}
