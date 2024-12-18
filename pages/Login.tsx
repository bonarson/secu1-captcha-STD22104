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

          apiKey: 'Q/m/79U9w0SFyCmTueiCEKPp2QhjffChFIKBt4sCJjNoap2VoxKhdGWYDKjSOI5PJ2TAAKfMMWuN32dhc8ueSLG+oJ7C5768eIs//uUkUOyXv5iY97suoaV59+QDqt4b7IBbpFEZldZcv1INQvClips5D4Hw2dJ9xcJ6UbjqQ42+NGUbdL4/9iO+3LhIoMmM5XBb9a2kTb6bLhPzY3PQplF3Gm0co1mBhWrDjdFO6EcZRC+uSs+IDWWLavFCuzt12UC9zh+KA88qyP0M2BoylDb/SnFf90qQIN64R6oDneH8tgGmeDKXaZ72s/s80ABvOr9AX+ELvN4tl+JPeIyxMstSfY5FViEOsehWQGQjMsvVxqO0vJd1sK5Z6LAg+lN/HQcaV1ai3p3xEw/01byPm4fEx0xVTuyvoIddPB5nLOAXXg05PlO4rcVOYKiUt7OcKeAt0Vqs8QPnGmqbM8c0jBHAMbN55dP4U9236E+/u/FMt631hf9ShbH1Lka5wBDYmGNcwoKglE/9oeohP8jLlef/XHHjGzWxjpaa+JCYBNlOqOqHl1hh7Y8lSuw/NLx61RZK4v7HmX2qjzNzcd+E5sILg65GlBl6abdk/jgQf0MP/GuoDIZtfizJi3P0psql2Bh72iSF+q4m5sSSkRkV3NYp15EeZFzAx1X6GgR35ng=_0_1',
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
