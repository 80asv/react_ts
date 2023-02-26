import React, { useState, useRef } from "react";

interface ITask {
	name: string;
	done: boolean;
}

function App(): JSX.Element {
	const [newTask, setNewTask] = useState<string>("");
	const [tasks, setTasks] = useState<ITask[]>([]);
	const taskInput = useRef<HTMLInputElement>(null);

	type FormElement = React.FormEvent<HTMLFormElement>;

	const handleSubmit = (e: FormElement): void => {
		e.preventDefault();
		addTasks(newTask);
		setNewTask("");
		taskInput.current?.focus();
	};

	const addTasks = (name: string): void => {
		const newTasks: ITask[] = [...tasks, { name, done: false }];
		setTasks(newTasks);
	};

	const toggleDoneTask = (i: number): void => {
		const newTasks: ITask[] = [...tasks];
		newTasks[i].done = !newTasks[i].done;
		setTasks(newTasks);
	};

	const removeTask = (i: number): void => {
		const newTasks: ITask[] = [...tasks];
		newTasks.splice(i, 1);
		setTasks(newTasks);
	};

	return (
		<div className="container p-4">
			<div className="row">
				<div className="col-md-6 offset-md-3">
					<div className="card">
						<div className="card-body">
							<form onSubmit={handleSubmit}>
								<input
									type="text"
									onChange={(e) => setNewTask(e.target.value)}
									value={newTask}
									ref={taskInput}
									autoFocus
									className="form-control"
								/>
								<input
									className="btn btn-success btn-block mt-2"
									type="submit"
									value="Send"
								/>
							</form>
						</div>
					</div>
					{tasks.map((task: ITask, index: number) => (
						<div key={index} className="card card-body mt-2">
							<h2
								style={{
									textDecoration: task.done
										? "line-through"
										: "",
								}}
							>
								{task.name}
							</h2>
							<div>
								<button
									className="btn btn-primary"
									onClick={() => toggleDoneTask(index)}
								>
									{task.done ? "Undone" : "Done"}
								</button>
								<button
									className="btn btn-danger"
									onClick={() => removeTask(index)}
								>
									Move to Trash
								</button>
							</div>
						</div>
					))}
				</div>
			</div>
		</div>
	);
}

export default App;
