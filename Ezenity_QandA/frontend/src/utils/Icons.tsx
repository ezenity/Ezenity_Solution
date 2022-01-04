/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import user from '../assets/images/user.svg';

export const UserIcon = () => {
  return (
    <img
      src={user}
      alt="User"
      width="22px"
      css={css`
        width: 12px;
        opacity: 0.6;
      `}
    />
  );
};
