import React from 'react';
import styles from '../Style/footer.module.css';
import midgardLogo from '../imgs/midgard-logo.png';

function Footer() {
  return (
    <div className={styles.footerContainer}>
      <footer className={styles.footer}>
        <div className={styles.footerLogo}>
          <img src={midgardLogo} alt="Midgard Logo" />
        </div>
        <div className={styles.contactInfo}>
          <h3>Contact Us</h3>
          <p>email@email.com</p>
          <p>09123456789</p>
          <p>address, city, province</p>
        </div>
      </footer>
      <div className={styles.footerBottom}>
        <p>Copyright © 2024 Midgard</p>
      </div>
    </div>
  );
}

export default Footer;
