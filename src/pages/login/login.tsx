import { signIn } from "@/redux/features/auth/authSlice";
import { selectAllUsers } from "@/redux/features/users/usersSlice";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { ChangeEvent, FormEvent, useState } from "react";
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const [activeUser, setActiveUser] = useState<string>("")
  const users = useAppSelector(selectAllUsers);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (activeUser) {
      dispatch(signIn(activeUser))
      navigate("/posts")
    }
  }

  const handleSelectChange = (e: ChangeEvent<HTMLSelectElement>) => {
    const val = e.target.value;
    setActiveUser(val);
  }

  const usersOptions = users.map(user => (
    <option key={user.id} value={user.id}>
      {user.name}
    </option>
  ))
  
  return (
    <section>
      <h2>Welcome</h2>
      <h3>Please log in:</h3>
      <form onSubmit={handleSubmit}>
        <label htmlFor="username">User:</label>
        <select id="username" name="username" value={activeUser} required onChange={handleSelectChange}>
          <option value=""></option>
          {usersOptions}
        </select>
        <button>Log In</button>
      </form>
    </section>
  )
};

export { Login }