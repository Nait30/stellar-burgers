import { FC } from 'react';
import { AppHeaderUI } from '@ui';
import { Outlet, useLocation } from 'react-router-dom';
import { useSelector } from '../../services/store';
import { selectUser } from '../../services/slices/userSlice';

export const AppHeader: FC = () => {
  const name = useSelector(selectUser)?.name;
  const location = useLocation().pathname;
  return (
    <>
      <AppHeaderUI userName={name} location={location} />
    </>
  );
};
