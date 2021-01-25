const TodoArchived = (props) => {
  const { todos } = props;
  const todosArchived = todos.filter(todo => (todo.isArchived));
  const [ count, setCount ] = React.useState(todosArchived.length);

  React.useEffect(() => {
    setCount(todosArchived.length);
  }, [todosArchived]);

  let todoExist;
  if (todosArchived.length > 0)
    todoExist = true;
  else
    todoExist = false;

  let lst;
  if (todoExist) {
    lst = todosArchived.map(todo => (
      <TodoItemConnected key={ todo.id } todo={ todo } todoArchived />
    ));
  }
  else {
    lst = <p>No archived todo</p>;
  }

  return (
    <div className="card">
      <div className="card-body">
        <h3>Archived</h3>
        {
          count > 0 &&
          <div className="alert alert-warning">
            <small style={{ fontStyle: 'oblique' }}><b>Note: </b>Archived todo cannot be recovered or edited!</small>
          </div>
        }
        { count > 0 && <p>{ `Total archived todo: ${count}` }</p> }
        { lst }
      </div> {/* Card body */}
    </div> // Card container
  );
};
const mapStateProps_2 = (state) => ({ todos: state.todosReducer });
const TodoArchivedConnected = connect(mapStateProps_2)(TodoArchived);