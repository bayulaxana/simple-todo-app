const Toast = (props) => {
  return (
    <div className="toast" role="alert" aria-live="assertive" aria-atomic="true">
      <div className="toast-header">
        <strong className="mr-auto">Bootstrap</strong>
        <button type="button" className="btn-close" data-dismiss="toast" aria-label="Close"></button>
      </div>
      <div className="toast-body">
        Hello world
      </div>
    </div>
  );
};