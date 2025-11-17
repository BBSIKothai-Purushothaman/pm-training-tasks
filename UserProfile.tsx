import React from "react";
import "./profile.css";

const UserProfile: React.FC = () => {
  return (
    <>
      {/* Site header with navigation */}
      <header>
        <h1>User Profile</h1>

        <nav aria-label="Primary navigation">
          <ul>
            <li>
              <a href="#overview" aria-current="page">
                Overview
              </a>
            </li>
            <li>
              <a href="#account-details">Account details</a>
            </li>
            <li>
              <a href="#contact-preferences">Contact preferences</a>
            </li>
          </ul>
        </nav>
      </header>

      {/* Main content of the page */}
      <main>
        {/* Profile overview section */}
        <section id="overview" aria-labelledby="overview-heading">
          <h2 id="overview-heading">Profile overview</h2>
          <p>
            View and update your personal information and account settings.
          </p>
        </section>

        {/* Account details section with a form */}
        <section id="account-details" aria-labelledby="account-heading">
          <h2 id="account-heading">Account details</h2>

          <form aria-labelledby="account-heading">
            <div>
              <label htmlFor="full-name">Full name</label>
              <input
                type="text"
                id="full-name"
                name="full-name"
                autoComplete="name"
                required
              />
            </div>

            <div>
              <label htmlFor="email">Email address</label>
              <input
                type="email"
                id="email"
                name="email"
                autoComplete="email"
                required
              />
            </div>

            <div>
              <label htmlFor="username">Username</label>
              <input
                type="text"
                id="username"
                name="username"
                autoComplete="username"
                required
              />
            </div>

            <div>
              <label htmlFor="website">Website (optional)</label>
              <input
                type="url"
                id="website"
                name="website"
                placeholder="https://example.com"
              />
            </div>
          </form>
        </section>

        {/* Contact preferences section with another form area */}
        <section
          id="contact-preferences"
          aria-labelledby="contact-heading"
        >
          <h2 id="contact-heading">Contact preferences</h2>

          <form aria-labelledby="contact-heading">
            <div>
              <p>How would you like us to contact you?</p>

              <div>
                <input
                  type="radio"
                  id="contact-email"
                  name="preferred-contact"
                  value="email"
                  defaultChecked
                />
                <label htmlFor="contact-email">Email</label>
              </div>

              <div>
                <input
                  type="radio"
                  id="contact-phone"
                  name="preferred-contact"
                  value="phone"
                />
                <label htmlFor="contact-phone">Phone</label>
              </div>

              <div>
                <input
                  type="radio"
                  id="contact-none"
                  name="preferred-contact"
                  value="none"
                />
                <label htmlFor="contact-none">Do not contact me</label>
              </div>
            </div>

            <div>
              <label htmlFor="newsletter">
                <input
                  type="checkbox"
                  id="newsletter"
                  name="newsletter"
                />
                Subscribe to product updates newsletter
              </label>
            </div>

            <button type="submit">Save profile</button>
          </form>
        </section>
      </main>
    </>
  );
};

export default UserProfile;
