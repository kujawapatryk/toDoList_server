
export interface TasksInterface {
    id: number,
    content: string,
    done: boolean,
}

export interface UpdateTask extends Omit<TasksInterface, 'content'> {
}

