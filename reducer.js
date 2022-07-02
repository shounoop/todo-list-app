  import storage from "./util/storage.js";

const init = {
  todoItems: storage.get(),
  currentFilter: 'all',
  filters: {
    all: () => true,
    active: todoItem => !todoItem.completed,
    completed: todoItem => todoItem.completed,
  },
  editIndex: null,
};

const actions = {
  add({ todoItems }, title) {
    if (title) {
      todoItems.push({ title, completed: false });
      storage.set(todoItems);
    }
  },
  toggle({ todoItems, currentFilter, filters }, index) {
    const todo = todoItems.filter(filters[currentFilter])[index];
    todo.completed = !todo.completed;
    storage.set(todoItems);
  },
  toggleAll({ todoItems }, checked) {
    todoItems.forEach(todoItem => {
      todoItem.completed = checked;
    });
    storage.set(todoItems);
  },
  destroy({ todoItems }, index) {
    todoItems.splice(index, 1);
    storage.set(todoItems);
  },
  switchFilter(state, newFilter) {
    state.currentFilter = newFilter;
  },
  clearCompleted(state) {
    state.todoItems = state.todoItems.filter(state.filters.active);
    storage.set(state.todoItems);
  },
  startEdit(state, index) {
    state.editIndex = index;
    document.querySelector('.edit').focus();
  },
  endEdit(state, newTitle) {
    if (state.editIndex !== null) {
      if (newTitle) {
        state.todoItems[state.editIndex].title = newTitle;
        storage.set(state.todoItems)
      } else {
        this.destroy(state, state.editIndex);
      }
      state.editIndex = null;
    }
  },
  cancelEdit(state) {
    state.editIndex = null;
  }
};

export default function reducer(state = init, action, args) {
  actions[action] && actions[action](state, ...args);
  return state;
}
