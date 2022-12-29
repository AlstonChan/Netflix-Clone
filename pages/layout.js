import Notice from "components/Notice";

export default function Layout({ children }) {
  return (
    <>
      {children} <Notice />
    </>
  );
}
