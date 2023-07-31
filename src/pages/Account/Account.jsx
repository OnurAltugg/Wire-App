import React, {useEffect, useState} from "react";
import {firestore, auth} from "../../firebase";
import {getDocs, collection, addDoc, updateDoc, doc} from "@firebase/firestore";

function Account() {

  const userCollectionRef = collection(firestore, "users");
  const eventCollectionRef = collection(firestore, "events");

  //Read User States
  const [userList, setUserList] = useState([]);

  //New User States
  const [nameUser, setNameUser] = useState("");
  const [surnameUser, setSurnameUser] = useState("");
  const [cityUser, setCityUser] = useState("");
  const [followedSportsUser, setFollowedSportsUser] = useState([]);
  const [eventsJoinedUser, setEventsJoinedUser] = useState([]);


  const getUserList = async() => {
    //READ THE DATA
    //SET THE USER LIST
    try{
        const data = await getDocs(userCollectionRef);
        const filteredData = data.docs.map((doc) => ({...doc.data(), id: doc.id,}))
        setUserList(filteredData);
    }
    catch(err){
        console.error(err);
    } 
}
  useEffect(() => {
    getUserList();
  }, [])

  const onAddUser = async(e) => {
    //WRITE THE DATA
    if (nameUser === '' || surnameUser === '' || cityUser === '') {
      alert('Please fill in all fields!');
      return;
    }
    try{
        await addDoc(userCollectionRef, {
            name: nameUser, 
            surname: surnameUser, 
            city: cityUser,
            email: auth?.currentUser?.email,
            followedSports: followedSportsUser,
            eventsJoined: eventsJoinedUser,
            userId: auth?.currentUser?.uid
        });
        await getUserList();
    }
    catch(err){
        console.error(err);
    } 
}

  const updateUser = async (id) => {
    const selectedField = prompt(
      "Which field would you like to update? (Name, Surname, City)"
    );
    if (!selectedField || !["name", "surname", "city"].includes(selectedField.toLowerCase())) {
      return;
    }
  
    let newValue = prompt(`Enter the new value for ${selectedField}:`);
    if (newValue === null) {
      return;
    }
  
    const userDoc = doc(firestore, "users", id);
    await updateDoc(userDoc, { [selectedField]: newValue });
    setUserList((prevList) =>
      prevList.map((user) =>
        user.id === id ? { ...user, [selectedField]: newValue } : user
      )
    );
  };

  const handleCheckboxChange = (e) => {
    const { value, checked } = e.target;
    if (checked) {
      setFollowedSportsUser((prevSelectedValues) => [...prevSelectedValues, value]);
    } else {
      setFollowedSportsUser((prevSelectedValues) =>
        prevSelectedValues.filter((item) => item !== value)
      );
    }
  };

  return (
    <div className='account'>
      Account
      {auth.currentUser ? (
      <>
        {!userList.some(user => user.userId === auth.currentUser?.uid) ? (
          <>
            <div>
              <input placeholder="Name..." onChange={(e) => setNameUser(e.target.value)}/>
              <input placeholder="Surname..." onChange={(e) => setSurnameUser(e.target.value)}/>
              <input placeholder="City..."  onChange={(e) => setCityUser(e.target.value)}/>
              <p>Followed Sports:</p>
              <form action="" method="post">
                <label>
                  <input type="checkbox" name="favorite1" value="football" onChange={handleCheckboxChange} /> Football
                </label>
                <label>
                  <input type="checkbox" name="favorite2" value="basketball" onChange={handleCheckboxChange} /> Basketball
                </label>
                <label>
                  <input type="checkbox" name="favorite3" value="tennis" onChange={handleCheckboxChange} /> Tennis
                </label>
              </form>
              <button onClick={onAddUser}>Add User</button>
            </div>
          </>
           ) : (
          userList.map((user) => (
            user.userId === auth.currentUser?.uid && (
            <>
              <div key={user.id}>
              <p>Name: {user.name}</p>
              <p>Surname: {user.surname}</p>
              <p>City: {user.city}</p>
              <p>Email: {user.email}</p>
              <p>Followed Sports: {user.followedSports.join(', ')}</p>
            </div>
            <button onClick={() => updateUser(user.id)}>Update User</button>
            </>
          )))
        )}
      </>
       ) : (
        <p>GİRİŞ YAP</p>
      )}
      </div>
  )
}

export default Account