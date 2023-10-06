import { useForm } from "../hooks";

const loginDTO = {
  username: "",
  password: "",
};

export const LoginComponent = () => {
  const { username, password, handleInputChange } = useForm(loginDTO);

  function handleFormSubmit(event) {
    event.preventDefault();
    console.log({ username, password });
  }

  return (
    <div>
      <form onSubmit={handleFormSubmit}>
        <div>
          <input
            type="text"
            name="username"
            onChange={handleInputChange}
            value={username}
          />
        </div>
        <div>
          <input
            type="password"
            name="password"
            onChange={handleInputChange}
            value={password}
          />
        </div>
        <div>
          <button>Iniciar Sesión</button>
        </div>
      </form>
    </div>
  );
};
