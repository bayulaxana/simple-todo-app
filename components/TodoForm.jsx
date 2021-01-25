const TodoForm = (props) => {
  const [ description, setDescription ] = React.useState('');
  const [ title, setTitle ] = React.useState('');
  const [ titleLength, setTitleLength ] = React.useState(0);
  const { dispatch } = props;

  const handleChange = (e) => {
    setDescription(e.target.value);
  };

  const validTitle = (title) => {
    let lengthSatisfied = title.length <= 10;
    let validString = title.match(/^([\(\)a-zA-Z0-9 _.-]*)$/);

    return lengthSatisfied && validString;
  }

  const handleTitleChange = (e) => {
    let title = e.target.value;
    if (!validTitle(title))
      return;

    setTitleLength(title.length);
    setTitle(title);
  };

  const addItem = (title, desc) => {
    if (title === '' || title === null) {
      alert('Title is required');
      return;
    }
    
    if (desc === '' || desc === null) {
      alert('You must specify the description');
      return;
    }

    dispatch(addTodoAction(title, desc));
    setDescription('');
    setTitle('');
  };
  
  return (
    <form onSubmit={ (e) => e.preventDefault() } className="my-4">
      <div className="mb-3">
        <input
          type="text"
          className="form-control my-2"
          placeholder="Title" value={ title }
          onChange={ (e) => handleTitleChange(e) }
        />
        <div class="form-text">{ titleLength }/10</div>
      </div>
      <div className="input-group">
        <input
          placeholder="Add new todo"
          className="form-control form-control-sm"
          onChange={ (e) => handleChange(e) }
          value={ description }
        />
        <button type="submit" className="btn btn-primary" onClick={ () => addItem(title, description) }>Add</button>
      </div>
    </form>
  );
};
const TodoFormConnected = ReactRedux.connect()(TodoForm);