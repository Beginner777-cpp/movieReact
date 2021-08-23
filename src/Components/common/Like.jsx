const Like = ({toggleLike, liked}) => {
  let classes = "fa fa-heart";
  if (!liked) {
    classes += "-o";
  } else {
    classes = "fa fa-heart";
  }
  return (
    <i
      style={{ cursor: "pointer" }}
      className={classes}
      onClick={toggleLike}
    ></i>
  );
};

export default Like;
