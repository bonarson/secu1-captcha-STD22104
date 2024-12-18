import { useEffect, useRef } from 'react';
import styles from './style.module.css';

// Définir un type pour l'erreur du captcha
type CaptchaError = {
  message: string;
};

const CaptchaLogin = () => {
  const captchaRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const script = document.createElement('script');
    script.src = 'https://f4df95ce5d70.us-east-1.captcha-sdk.awswaf.com/f4df95ce5d70/jsapi.js';
    script.defer = true;
    script.onload = () => {
      if (captchaRef.current && window.AwsWafCaptcha) {
        window.AwsWafCaptcha.renderCaptcha(captchaRef.current, {
          
          apiKey: 'YcvmaE4lEl0urbOP3tvzNKk46QwMy6Z2JJa4lKpKwhCBOPd8Nk/Ti+TydlxSRQ9lqnVSmdY5qEf0qe936WficIYeKLCa/ohzNdVSPlEIY4JjBKl8M8gqW4G4gPBY38VW05PNIoSWnoSxLO91ZSJbiz71NkB92u2QCdGov5srimJX1s6cjVjjRV98dqFEMqi16qKrNfIcb3ewlldWgMS77aaKI0t0FUGBPzlkTCRBGAoi7vCEzDbPAW90Y1p/jfr/jYGk6ECLWmWz0ClCmVfqrl4B9W7LSrx3X3qkeOdKiFsiQsWAarjKdh89UzWSXQ8CWeHc5X3h6hIt/x+t2r6dujyuy+KLmnuGMp3AYhrQrT7dIeztJRYDStN4xUDruYFtdX0ZkeSf0Qi8hCg/HXgfsK5+9G+fYNlIcE//f1brGfwTFflaqo7qsnqrxlIJ98eZgyXF79XyCan2GyEs0gSKW9u+w5ccuWwP4p1ghe0H+HGMJLJWBuTFiFuwbfukyPoBLMdfgqOf0JuBsHQTqzp8epSjtpLZRNGVxKkZbpQv5zVWjWFlbKMjl3EVaYQviPMvFvTKIWYHlSDE35FV/X2Ta17C/nGBrm9xowWAXjhpf8OwEBhTBVZaeadrecgFGPo20An+bXEoLGVgct9ZqBqxUIudXXDsBH3iRwBoNbJWOSA=_0_1',
          onSuccess: () => {
            const submitButton = document.getElementById('submit-btn') as HTMLButtonElement | null;
            if (submitButton) submitButton.disabled = false;

            const errorContainer = document.getElementById('error-container') as HTMLElement | null;
            if (errorContainer) errorContainer.textContent = '';
          },
          // Typage de l'erreur avec CaptchaError
          onError: (error: CaptchaError) => {
            const errorContainer = document.getElementById('error-container') as HTMLElement | null;
            if (errorContainer) {
              errorContainer.textContent = error.message;
            } else {
              console.error('Error container not found:', error.message);
            }
          },
        });
      }
    };
    document.head.appendChild(script);

    return () => {
      document.head.removeChild(script);
    };
  }, []);

  return (
    <div className={styles.container}>
      <h1>Login</h1>
      <form className={styles.loginForm}>
        <div className={styles.formGroup}>
          <label htmlFor="username">Username</label>
          <input type="text" id="username" name="username" placeholder="Enter your username" required />
        </div>
        <div className={styles.formGroup}>
          <label htmlFor="password">Password</label>
          <input type="password" id="password" name="password" placeholder="Enter your password" required />
        </div>
        <div ref={captchaRef} className={styles.captchaContainer}></div>
        <button type="submit" className={styles.btn} id="submit-btn" disabled>
          Login
        </button>
      </form>
      <div id="error-container" className={styles.error}></div>
      <div id="success-container" className={styles.successMessage}></div>
    </div>
  );
};

export default CaptchaLogin;
