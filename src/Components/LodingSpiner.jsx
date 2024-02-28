import { Spinner } from 'react-bootstrap';

const LoadingSpinner = () => {

  return (
    <div className="text-center  shadow">
      <h2 className="me-2">{'loading'}</h2>
      <Spinner variant="primary" animation="border" role="status">
        <span className="visually-hidden">{'loading'}</span>
      </Spinner>
    </div>
  );
};

export default LoadingSpinner;
