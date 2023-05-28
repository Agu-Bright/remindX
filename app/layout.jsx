import "@styles/globals.css";
import Provider from "@components/Provider";
import Nav from "@components/Nav";

export const metadata = {
  title: "RemindX",
  description: "Set reminders for your events",
};

const Layout = ({ children }) => {
  return (
    <html>
      <body>
        <Provider>
          <div className="main">
            <div className="gradient" />
          </div>
          <main className="app">
            <Nav />
            {children}
          </main>
        </Provider>
      </body>
    </html>
  );
};

export default Layout;
