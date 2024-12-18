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

          apiKey: 'Z92DcJ20qfNeDnKEz99UB68ARYQu1lsbC/rZtoMtiN0HrDh4GA10AlbKaNjqqeCvw7keSKHCwH+aujgc1XUGhQWtA4fTDRnk14PtyEe9khbgNZTGdfDoslyGLHMDOxf9cDIrwWCMdr4j/Q+xiPbinxFnW2gqWE7xCnGMj7FjEaNyId2f83pzYHJawJL3l06jfICJerLWF3bdt//ladqNM2sIf9sW5nrVHnnRWYdhG83JNijqL+iQ/OMXvlqls+/8pn2XaObHV+MFF+mHmbv3GMhmltlGcVsHt/ZnTvnhSf2xOaVibfdylfWemOAcBPRf7k3V6HY5Ctivr/7JQm62OkIHjDlusMNaMe1/HkkENXZ4OXTfBiUZpiyiUvkJL3fcCARbFc/Me1QG5qIwV6VrFNTHYYGq59Hzb3rTj+yIznLLtIE8xGPIwHibVxr/ufbaoOE/D/d/bL/a0NiG3IfTHxGHFO0sahrKc8v5b+mZpYp9jRDUz9nRieHxLl6RbOj/dHrPF8J22PjgCp6RbVajJtUWRiq5koXOBqd1aIuXxyoLO7qZMhC/ZGUoKNswPsIXOuR+zawIiUKovZgUcPnVMAaMycgJeP57LfoVwHpIyjWoZjDCVvk25Fwog35/NFi1TMLei6sx2dWfHUGm0QWPcsJaA+2y4QyenBVCLGxdxYw=_0_1',
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
