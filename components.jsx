const Title = () => {
  return (
    <h1>Hello world</h1>
  );
};

//
const App = (props) => {
  return (
    <React.Fragment>
      <ReactMotion.Motion
        defaultStyle={{
          opacity: 0,
          translateY: 30,
        }}
        style={{
          opacity: ReactMotion.spring(1),
          translateY: ReactMotion.spring(0, ReactMotion.presets.gentle)
        }}
      >
        {
          interpolatedStyle => (
            <div
              style={{
                transform: `translateY(${ interpolatedStyle.translateY }px)`,
                opacity: interpolatedStyle.opacity
              }}
            >
              <Title/>
            </div>
          )
        }
      </ReactMotion.Motion>
    </React.Fragment>
  );
};

ReactDOM.render(
  <App />,
  document.getElementById('root')
);