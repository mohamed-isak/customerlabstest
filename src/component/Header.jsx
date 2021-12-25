

const Header = (props) => {
  return (
    <>
      <div className="header">
       <a href="javascript:void(0)" className="backbtn" onClick={props.closenav}>
          &#8592;
        </a>
        <a href="#default" className="logo">
          {props.headerText}
        </a>
      </div>
    </>
  );
};

export default Header;
