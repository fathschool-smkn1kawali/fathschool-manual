import { JSX } from "react";

/**
 * Footer component that returns a JSX.Element.
 *
 * @returns {JSX.Element} The JSX element representing the footer.
 */
export const Footer: React.FC = (): JSX.Element => {
  // const { isDarkMode } = useTheme();

  return (
    <footer className="pt-6 border-t">

      <div className="flex items-center justify-between">
        {/* <Image src={Logo} alt="Image" width={200} height={200} /> */}
        <p>Copyright &copy; {new Date().getFullYear()} by FathForce</p>
      </div>

    </footer>
  );
}
