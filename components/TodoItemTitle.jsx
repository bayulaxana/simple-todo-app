const TodoItemTitle = (props) => {
  const node = React.useRef();
  const inpTitle = React.useRef();

  const {
    title, dispatch, id,
    editing, setEditing, 
    isArchived
  } = props;
  
  const [ titleText, setTitleText ] = React.useState(title);
  
  const handleClick = (e) => {
    if (node.current.contains(e.target) && !isArchived) {
      setEditing(true);
      return;
    }
  };

  const handleKeyDown = (e) => {
    if (e.keyCode == 13 && titleText != '') {
      setEditing(false);
    }
  };  

  React.useEffect(() => {
    document.addEventListener("click", handleClick);
    return () => {
      document.removeEventListener("click", handleClick);
    };
  }, []);

  React.useEffect(() => {
    if (editing) {
      inpTitle.current.focus();
      inpTitle.current.select();
    }
    else {
      dispatch(changeTitleAction(id, titleText));
    }
  }, [editing]);

  const instruction = !titleText ? (
    <div className="small text-danger">Title cannot be empty</div>
  ) : (
    <div className="small">Press <code>Enter</code> to save changes</div>
  );

  const elem = editing ? (
    <React.Fragment>
      <input type="text"
        className={`form-control form-control-sm ${ titleText ? null : 'is-invalid' }`} 
        ref={ inpTitle }
        onChange={ (e) => setTitleText(e.target.value) }
        value={ titleText }
        onKeyDown={ handleKeyDown }
      />
      { instruction }
    </React.Fragment>
  ) : (
    <h5 title="Click to edit the title">{ title }</h5>
  );
  
  return (
    <div className="col col-xs-6" ref={ node }>
      { elem }
    </div>
  );
};
const TodoItemTitleConnected = ReactRedux.connect()(TodoItemTitle);