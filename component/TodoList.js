import html from "../core.js";
import { connect } from "../store.js";
import TodoItem from "../component/TodoItem.js";

function TodoList({todoItems, currentFilter, filters}) {
  return html`
    <section class="main">
      <input
        id="toggle-all"
        class="toggle-all"
        type="checkbox"
        onchange="dispatch('toggleAll', this.checked)"
        ${todoItems.every(filters.completed) && 'checked'}
      />
      <label for="toggle-all">Mark all as complete</label>
      <ul class="todo-list">
        ${todoItems.filter(filters[currentFilter]).map((todoItem, index) => TodoItem({todoItem, index}))}
      </ul>
    </section>
  `;
}

export default connect()(TodoList);
