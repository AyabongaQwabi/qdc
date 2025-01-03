export const metadata = {
  title: 'Qwabi Family',
  description: 'Qwabi Family Website',
};

import './globals.css';
import { Navbar, Nav, Container } from 'react-bootstrap';

export default function RootLayout({ children }) {
  return (
    <html lang='en'>
      <head>
        <script
          src='https://cdn.jsdelivr.net/npm/react/umd/react.production.min.js'
          crossOrigin
        ></script>

        <script
          src='https://cdn.jsdelivr.net/npm/react-dom/umd/react-dom.production.min.js'
          crossOrigin
        ></script>

        <link
          rel='stylesheet'
          href='https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/css/bootstrap.min.css'
          integrity='sha384-9ndCyUaIbzAi2FUVXJi0CjmCapSmO7SnpJef0486qhLnuZ2cdeRhO02iuK6FUUVM'
          crossOrigin='anonymous'
        />
        <link rel='stylesheet' href='/output.css' />

        <script src='https://cdn.tailwindcss.com?plugins=forms,typography,aspect-ratio,line-clamp,container-queries'></script>
      </head>
      <body
        style={{
          color: '#48453e',
          background: '#e4ca1470',
        }}
      >
        <nav class='navbar navbar-expand-lg'>
          <div class='container-fluid'>
            <a class='navbar-brand' href='/'>
              Qwabi
            </a>
            <button
              class='navbar-toggler'
              type='button'
              data-bs-toggle='collapse'
              data-bs-target='#navbarNav'
              aria-controls='navbarNav'
              aria-expanded='false'
              aria-label='Toggle navigation'
            >
              <span class='navbar-toggler-icon'></span>
            </button>
            <div class='visible navbar-collapse' id='navbarNav'>
              <ul class='navbar-nav'>
                <li class='nav-item'>
                  <a class='nav-link' href='/payment'>
                    Trust
                  </a>
                </li>
                <li class='nav-item'>
                  <a class='nav-link' href='/projects'>
                    Projects
                  </a>
                </li>
                <li class='nav-item'>
                  <a class='nav-link' href='/businesses'>
                    Businesses
                  </a>
                </li>
                <li class='nav-item'>
                  <a class='nav-link' href='/achievements'>
                    Achievements
                  </a>
                </li>
                <li class='nav-item'>
                  <a class='nav-link' href='/polls'>
                    Polls
                  </a>
                </li>
                <li class='nav-item'>
                  <a class='nav-link' href='/jobs'>
                    Jobs
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </nav>
        {children}
        <script src='https://cdn.jsdelivr.net/npm/bootstrap@5.3.0-alpha3/dist/js/bootstrap.bundle.min.js'></script>
      </body>
    </html>
  );
}
