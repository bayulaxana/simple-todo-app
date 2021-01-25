const TodoItem = (props) => {
  const { dispatch } = props;
  const {
    id, isComplete, title,
    desc, createdAt, 
    isEdited, isArchived,
  } = props.todo;
  
  const editBox = (id, desc) => {
    let confirmBox = prompt('Edit todo', desc);

    if (confirmBox !== null && confirmBox !== '')
      dispatch(editTodoAction(id, confirmBox));
    return;
  };

  const confirmDelete = (id) => {
    let confirmBox = confirm('Are you sure wanto to delete this?');
    
    if (confirmBox)
      dispatch(deleteTodoAction(id));
    return;
  };

  const [ isHovering, setHovering ] = React.useState(false);
  const [ isEditing, setEditing ] = React.useState(false);
  
  return (
    <div className={`card my-4 rounded-lg ${isHovering ? 'border-info shadow' : ''}`} 
      onMouseEnter={ () => setHovering(true) } onMouseLeave={ () => setHovering(false) }
    >
      <div className="card-header">
        <div className="row align-items-center">
          <TodoItemTitleConnected
            title={ title } id={ id } setEditing={ setEditing }
            editing={ isEditing } isArchived={ isArchived }
          />
          <div className="col col-8 text-right">
            { 
              !isArchived && 
              <button onClick={() => editBox(id, desc)} className={`btn ${isHovering || isEditing ? 'btn-primary' : 'btn-outline-primary'} btn-sm mx-1`}>Edit</button>
            }
            <button onClick={() => confirmDelete(id)} className={`btn ${isHovering || isEditing ? 'btn-danger' : 'btn-outline-danger'} btn-sm mx-1`}>Delete</button>
            {
              !isArchived &&
              <button onClick={() => dispatch(archiveTodoAction(id))} className={`btn ${isHovering || isEditing ? 'btn-warning' : 'btn-outline-warning'} btn-sm mx-1`}>Archive</button>
            }
          </div> {/* Button group */}
        </div>
      </div> {/* Card Header */}
      <div className="card-body">
        <p className="card-text">
          { desc }
        </p> {/* Card text */}
        <small className="text-muted">
          <em>{`${createdAt} ${ isEdited ? '(edited)' : '' }`}</em>
        </small>
      </div> {/* Card body */}
    </div> // Card container
  );
};
const TodoItemConnected = ReactRedux.connect()(TodoItem);