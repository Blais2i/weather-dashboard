const ErrorMessage = ({ message }) => {
  return (
    <div className="mt-6 bg-red-100 text-red-700 p-4 rounded-md max-w-md mx-auto">
      <p>{message}</p>
    </div>
  );
};

export default ErrorMessage;
