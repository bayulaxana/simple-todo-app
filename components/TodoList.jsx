function sortTodoBy(key) {
  return (a, b) => {
    if (!a.hasOwnProperty(key) || !b.hasOwnProperty(key)) {
      return 0;
    }

    const varA = a[key];
    const varB = b[key];
    let cmp = 0;

    if (varA > varB) cmp = 1;
    else if (varA < varB) cmp = -1;

    return cmp;
  };
}

const SortBySelectBox = (props) => {
  const sortParameterList = [
    {key: '', name: 'None'},
    {key: 'title', name: 'Title'},
    {key: 'createdAt', name: 'Created Time'},
  ];
  
  const [ sortParam, setSortParam ] = React.useState('');

  const handleChange = (e) => {
    setSortParam(e.target.value);
    // lifting state up
    props.handleSort(e.target.value);
  };
  
  return (
    <React.Fragment>
      <div className="row">
        <div className="col-sm-2 col-md-2 col-lg-1">
          Sort by
        </div>
        <div className="col-sm-10 col-md-10">
          <select className="form-select form-select-sm"
            value={ sortParam }
            onChange={ handleChange }
          >
            {
              sortParameterList.map((item, index)=> {
                return (
                  <option key={ index } value={ item.key }>{ item.name }</option>
                ); // return
              }) // sort parameter list
            }
          </select>
        </div>
      </div>
    </React.Fragment>
  );
};

class TodoList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      sortParam: '',
      isLoading: false,
    };
  }
  
  handleSort = (param) => {
    this.setState({sortParam: param});
  };

  componentDidMount() {
    let timeout = getRandomInt(200, 600);
    setTimeout(() => {
      this.setState({ isLoading: false });
    }, timeout);
  }
  
  render() {
    const { todos } = this.props;
    const todosActive = todos.filter(todo => !todo.isArchived);

    todosActive.sort(sortTodoBy(this.state.sortParam));
    
    const lst = todosActive.length > 0 ? (
      todosActive.map(todo => (
        <TodoItemConnected key={ todo.id } todo={ todo } inTodoList />
      ))
    ) : (
      <p>No active todo</p>
    );

    const toRender = this.state.isLoading ? (
      <div className="text-center">
        <div className="spinner-border">
          <span className="sr-only">Loading...</span>
        </div>
      </div>
    ) : (
      <React.Fragment>
        { todosActive.length > 0 ? <SortBySelectBox handleSort={ this.handleSort } /> : null }
        { lst }
      </React.Fragment>
    );

    return (
      <div>
        <h3>Todo List</h3>
        { toRender }
      </div>
    );
  }
}
const mapStateProps = (state) => ({ todos: state.todosReducer });
const TodoListConnected = connect(mapStateProps)(TodoList);