const Footer = (): JSX.Element => {
  const currentYear = new Date().getFullYear();
  
  return (
    <footer className="bg-gray-900 py-8">
      <div>
        <div className="border-t border-gray-800 mt-8 pt-8 text-center">
          <p className="text-gray-500">
            &copy; {currentYear} Merntix. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer; 