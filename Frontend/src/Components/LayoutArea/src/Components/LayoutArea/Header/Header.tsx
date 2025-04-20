import { UserMenu } from "../../../../../UserArea/UserMenu/UserMenu";
import styles from "./Header.module.css";

export function Header(): React.ReactElement {
  return (
    <div className={styles.Header}>
      <h1>Vacations</h1>
      <div>
        <UserMenu />
      </div>
    </div>
  );
}
