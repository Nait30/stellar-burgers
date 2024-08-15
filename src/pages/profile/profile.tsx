import { ProfileUI } from '@ui-pages';
import { FC, SyntheticEvent, useEffect, useState } from 'react';
import {
  selectError,
  selectUser,
  updateUser
} from '../../services/slices/userSlice';
import { useDispatch, useSelector } from '../../services/store';
import { TRegisterData } from '@api';

export const Profile: FC = () => {
  /** TODO: взять переменную из стора */
  const dispatch = useDispatch();
  const user = useSelector(selectUser);
  const error = useSelector(selectError);
  if (user) {
    const [formValue, setFormValue] = useState({
      name: user.name,
      email: user.email,
      password: ''
    });

    useEffect(() => {
      setFormValue((prevState) => ({
        ...prevState,
        name: user?.name || '',
        email: user?.email || ''
      }));
    }, [user]);

    const isFormChanged =
      formValue.name !== user?.name ||
      formValue.email !== user?.email ||
      !!formValue.password;

    const handleSubmit = (e: SyntheticEvent) => {
      e.preventDefault();
      dispatch(updateUser(formValue));
      formValue.password = '';
    };

    const handleCancel = (e: SyntheticEvent) => {
      e.preventDefault();
      setFormValue({
        name: user.name,
        email: user.email,
        password: ''
      });
    };

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      setFormValue((prevState) => ({
        ...prevState,
        [e.target.name]: e.target.value
      }));
    };

    return (
      <ProfileUI
        formValue={formValue}
        isFormChanged={isFormChanged}
        handleCancel={handleCancel}
        handleSubmit={handleSubmit}
        handleInputChange={handleInputChange}
        updateUserError={error}
      />
    );
  }

  return null;
};
