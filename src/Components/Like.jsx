const Like = (props) => {
  let classes = "fa fa-heart";
  if (!props.liked) {
    classes += "-o";
  } else {
    classes = "fa fa-heart";
  }
  return (
    <i
      style={{ cursor: "pointer" }}
      className={classes}
      onClick={props.toggleLike}
    ></i>
  );
};

export default Like;
