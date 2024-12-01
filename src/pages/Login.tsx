export const Login = () => {
  return (
    <div className="w-full h-screen">
      <div className="login-container">
        <h1 className="text-2xl font-bold text-center">Login</h1>
        <form className="flex flex-col gap-4">
          <input type="text" placeholder="Username" className="input" />
          <input type="password" placeholder="Password" className="input" />
          <button className="btn">Login</button>
        </form>
      </div>
    </div>
  );
};
