import { useCustomer, useUI } from 'hooks';
import { SiteLink } from 'components/shared';

import s from './header.module.scss';

const Header = () => {
  const { toggleCart } = useUI();
  const { customer } = useCustomer();

  return (
    <header className={s.header}>
      <SiteLink href="/">header</SiteLink>

      <div className={s.buttonGroup}>
        {customer?.isLoggedIn ? (
          <SiteLink href="/account/" className={s.button}>
            Hi! {customer.firstName}
          </SiteLink>
        ) : (
          <SiteLink href="/account/login/" className={s.button}>
            Login
          </SiteLink>
        )}
        <button className={s.button} type="button" onClick={() => toggleCart(true)}>
          Cart
        </button>
      </div>
    </header>
  );
};

export default Header;
