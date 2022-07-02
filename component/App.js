import html from "../core.js";
import { connect } from "../store.js";
import Header from "../component/Header.js";
import TodoList from "../component/TodoList.js"
import Footer from "../component/Footer.js";

function App({ todoItems }) {
  return html`
    <section class="todoapp">
      ${Header()}
      ${todoItems.length > 0 && TodoList()}
      ${todoItems.length > 0 && Footer()}
    </section>
  `;
}

export default connect()(App);
