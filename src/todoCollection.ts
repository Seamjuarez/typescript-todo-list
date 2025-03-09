class TodoCollection {
    private nextId: number = 1;
    private itemMap: Map<number, TodoItem>;

    constructor(public userName: string, todoItems: TodoItem[] = []) {
        this.itemMap = new Map<number, TodoItem>();
        todoItems.forEach(item => this.itemMap.set(item.id, item));
    }

    addTodo(task: string): number {
        while (this.getTodoById(this.nextId)) {
            this.nextId++;
        }
        this.itemMap.set(this.nextId, new TodoItem(this.nextId, task));
        return this.nextId;
    }

    getTodoById(id: number): TodoItem | undefined {
        return this.itemMap.get(id);
    }

    getTodoItems(includeComplete: boolean): TodoItem[] {
        return [...this.itemMap.values()].filter(
            item => includeComplete || !item.complete
        );
    }

    markComplete(id: number, complete: boolean): void {
        const todoItem = this.getTodoById(id);
        if (todoItem) {
            todoItem.complete = complete;
        }
    }

    removeComplete(): void {
        this.itemMap.forEach(item => {
            if (item.complete) {
                this.itemMap.delete(item.id);
            }
        });
    }

    getTotalTasks(): number {
        return this.itemMap.size;
    }

    getCompletedTasks(): number {
        return [...this.itemMap.values()].filter(item => item.complete).length;
    }
}