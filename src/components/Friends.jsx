import styles from "../styles/friends.module.css";
import { useGetAllUsers } from "../../utils/fetch";
import { useNavigate, Navigate } from "react-router-dom";
import Loader from "./Loader";
import Error from "./Error";
import { useScroll } from "framer-motion";
import { useEffect, useContext, useState } from "react";
import { toast } from "sonner";
import { AuthContext } from "../../utils/context";
import socket from "../../utils/utils";
import Friend from "./Friend";


function Friends(){
  const { user, userLoad, hydrate } = useContext(AuthContext);
  const [tab, setTab] = useState(1);
  const { users, error, loading, getAllUsers } = useGetAllUsers();


    useEffect(() => {
        getAllUsers();

        function handleFriend() {
          hydrate();
        }

        socket.on("friend", handleFriend);

        return () => {
          socket.off("friend", handleFriend);
        }

    }, []);

    
    if(userLoad) return <Loader />
    if(!user) return <Navigate to={'/'} replace/>
    if(error) return <Error error={error} />

    function handleTab(num){
      setTab(num);
    }

    const pending = user.friendships.filter(friend => friend.status === "PENDING");
    const requests = user.friends.filter(friend => friend.status === "PENDING");
    const friends = user.friends.filter(friend => friend.status === "ACCEPTED");
    const friendships = user.friendships.filter(friend => friend.status === "ACCEPTED");
    const accepted = [...friends, ...friendships];
    const rejected = user.friends.filter(friend => friend.status === "REJECTED");
    const filteredIds = [...pending, ...requests, ...friends, ...friendships, ...accepted, ...rejected].map(obj => obj.friend.id);
    const all = users.filter(user => !filteredIds.includes(user.id));

    
    return (
      <div className={styles.container}>
        <div className={styles.header}>
          <h1>Friends</h1>
        </div>
        <div className={styles.friends}>
          <div className={styles.nav}>
            <button
              onClick={() => handleTab(1)}
              style={{ borderBottom: tab === 1 ? "2px solid" : "" }}>
              All
            </button>
            <button
              onClick={() => handleTab(2)}
              style={{ borderBottom: tab === 2 ? "2px solid" : "" }}>
              Friends
            </button>
            <button
              onClick={() => handleTab(3)}
              style={{ borderBottom: tab === 3 ? "2px solid" : "" }}>
              Pending
            </button>
            <button
              onClick={() => handleTab(4)}
              style={{ borderBottom: tab === 4 ? "2px solid" : "" }}>
              Requests
            </button>
            <button
              onClick={() => handleTab(5)}
              style={{ borderBottom: tab === 5 ? "2px solid" : "" }}>
              Rejected
            </button>
          </div>
          <div className={`${styles.tab} ${tab === 1 ? styles.active : ""}`}>
            {all.length === 0 ? (
              <h2>No users available</h2>
            ) : (
              all.map((user) => (
                <Friend id={user.id} key={user.id} friend={user} />
              ))
            )}
          </div>
          <div className={`${styles.tab} ${tab === 2 ? styles.active : ""}`}>
            {accepted.length === 0 ? (
              <h2>No accepted friend requests available.</h2>
            ) : (
              accepted.map((user) => (
                <Friend id={user.id} key={user.id} friend={user.friend} status={user.status}/>
              ))
            )}
          </div>
          <div className={`${styles.tab} ${tab === 3 ? styles.active : ""}`}>
            {pending.length === 0 ? (
              <h2>No pending friend requests available.</h2>
            ) : (
              pending.map((friend) => (
                <Friend id={friend.id} key={friend.id} friend={friend.friend} status={"OUTBOUND"}/>
              ))
            )}
          </div>
          <div className={`${styles.tab} ${tab === 4 ? styles.active : ""}`}>
            {requests.length === 0 ? (
              <h2>You have'nt sent any friend requests yet!.</h2>
            ) : (
              requests.map((user) => (
                <Friend id={user.id} key={user.id} friend={user.friend} status={user.status}/>
              ))
            )}
          </div>
          <div className={`${styles.tab} ${tab === 5 ? styles.active : ""}`}>
            {rejected.length === 0 ? (
              <h2>No rejected friend request available.</h2>
            ) : (
              rejected.map((user) => (
                <Friend id={user.id} key={user.id} friend={user.friend} status={user.status}/>
              ))
            )}
          </div>
        </div>
      </div>
    );
}

export default Friends;