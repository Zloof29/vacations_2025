import { Footer } from "../Footer/Footer";
import { Header } from "../Header/Header";
import { Menu } from "../Menu/Menu";
import { Routing } from "../Routing/Routing";
import styles from "./Layout.module.css";

export function Layout(): React.ReactElement {
  return (
    <div className={styles.Layout}>
      <header>
        <Header />
      </header>

      <aside>
        <Menu />
      </aside>

      <main>
        <Routing />
      </main>

      <footer>
        <Footer />
      </footer>
    </div>
  );
}
