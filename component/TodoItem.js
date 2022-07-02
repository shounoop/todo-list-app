import html from "../core.js";
import { connect } from "../store.js"

function TodoItem({todoItem, index, editIndex}) {
  return html`
    <li class="${todoItem.completed && 'completed'} ${index === editIndex && 'editing'}">
      <div class="view">
        <input
          class="toggle"
          type="checkbox"
          ${todoItem.completed && 'checked'}
          onchange="dispatch('toggle', ${index})"
        />
        <label ondblclick="dispatch('startEdit', ${index})">${todoItem.title}</label>
        <button class="destroy" onclick="dispatch('destroy', ${index})"></button>
      </div>
      <input
        class="edit"
        value="${todoItem.title}"
        onkeyup="event.keyCode===13 && dispatch('endEdit', this.value.trim()) || event.keyCode===27 && dispatch('cancelEdit')"
        onblur="dispatch('endEdit', this.value.trim())"
      />
    </li>
  `;
}

export default connect()(TodoItem);
