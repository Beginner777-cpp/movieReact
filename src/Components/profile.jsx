const Profile = (props) => {
    console.log('user', props.user);
  return (
    <div>
      <h1>Profile</h1>
      {props.user['name']}
    </div>
  );
};
export default Profile;
