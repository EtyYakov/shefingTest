import React, { useEffect, useState } from "react";
import 'primeicons/primeicons.css';
import axios from 'axios'
import UsersTable from "./UsersTable";
import { ProgressSpinner } from 'primereact/progressspinner';
import UserPosts from "./UserPosts";
import { Divider } from "primereact/divider";

const User = () => {
    const [users, setUsers] = useState([]);
    const [selectedUser, setSelectedUser] = useState({});
    const [showPost, setShowPost] = useState(false)
    const [loading, setLoading] = useState(true)
    const [notUsers, setNotUsers] = useState(true)
    const [filteredData,setFilteredData]=useState(users)

    useEffect(() => {
        setLoading(true);
        const timeoutId = setTimeout(() => {
            setNotUsers(true);
            setLoading(false);
        }, 10 * 1000); //after a 10 minutes he show a message

        axios.get('https://jsonplaceholder.typicode.com/users')
            .then(response => {
                clearTimeout(timeoutId);

                setNotUsers(false);
                setUsers(response.data);
                setFilteredData(response.data);

                setLoading(false);
            })
            .catch(error => {
                clearTimeout(timeoutId);
//refresh the setTimeOut
                console.error('Error fetching users:', error);
                setNotUsers(true);
                setLoading(false);
            });

        return () => clearTimeout(timeoutId);
    }, []);

    return (
        <>
            {loading ?//if he didnt get the data show a prograsspiner
                <div className="card flex justify-content-center">
                    <ProgressSpinner />
                </div> : <>
                    {notUsers ? (//if the data didnt load there is a problem in the network
                        <div>Error fetching users. Please try again later.</div>
                    ) : <>
                        {!showPost ?
                            <UsersTable setShowPost={setShowPost} users={users} selectedUser={selectedUser} setSelectedUser={setSelectedUser} setFilteredData={setFilteredData} filteredData={filteredData}/>
                            :
                            <div className="flex flex-column md:flex-row">
                                <div className="p-col-6">
                                    <UsersTable showPost={showPost} setShowPost={setShowPost} users={users} selectedUser={selectedUser} setSelectedUser={setSelectedUser} setFilteredData={setFilteredData} filteredData={filteredData} />
                                </div>
                                <Divider layout="vertical" className="hidden md:flex">
                                </Divider>
                                <Divider layout="horizontal" className="flex md:hidden" align="center">
                                </Divider>
                                <div className="w-full  flex flex-column align-items-center justify-content-center p-2">
                                    <UserPosts user={selectedUser}></UserPosts>
                                </div>
                            </div>
                        }
                    </>
                    }
                </>
            }
        </>
    )
}
export default User;