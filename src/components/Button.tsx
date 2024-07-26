const Button: React.FC<{children?: React.ReactNode, onClick?: React.MouseEventHandler}> = ({children, onClick}) => {
  return (
    <button
      className="mb-10 rounded-md bg-stone-700 px-4 py-2 text-xs text-stone-400 hover:bg-stone-600 hover:text-stone-100 md:text-base"
      onClick={onClick}
    >
      {children}
    </button>
  );
}

export default Button;