const AppTitle = () => {
  return (
    <React.Fragment>
      <ReactMotion.Motion
        defaultStyle={{
          opacity: 0,
          translateY: 30,
        }} // default style
        style={{
          opacity: ReactMotion.spring(1),
          translateY: ReactMotion.spring(0, ReactMotion.presets.gentle)
        }} // motion style
      >
        {
          interpolatedStyle => (
            <div
              style={{
                transform: `translateY(${interpolatedStyle.translateY}px)`,
                opacity: interpolatedStyle.opacity
              }} // style
            >
              <h1>Simple Todo App</h1>
              <p>Create a new Todo</p>
            </div>
          )
        }
      </ReactMotion.Motion>
    </React.Fragment>
  ); // return component
};

const Todo = (props) => {
  return (
    <div className="mt-3">
      <AppTitle />
      <TodoFormConnected />
      <TodoListConnected />
      <hr />
      <TodoArchivedConnected />
      {/* <Toast /> */}
    </div>
  );
};