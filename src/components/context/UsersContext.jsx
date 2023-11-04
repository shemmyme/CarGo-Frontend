    import React, { useContext, useEffect, useState, createContext } from 'react'
    import { BACKEND_BASE_URL } from '../../utils/Config'
    import axios from 'axios'



    const UsersContext = createContext()

    export function useUserContext(){
        return useContext(UsersContext)
    }
    export function UsersProvider({children}){
        const [users,setUsers] = useState([])
        
        useEffect(()=>{
            const fetchData = async()=>{
                try{
                    const response = await axios.get(BACKEND_BASE_URL + '/admin/users/')
                    if (response.status === 200){
                        const data = response.data
                        const user = data.filter((user)=>!user.is_admin)
                        setUsers(user)
                    }else{
                        console.error('failed to fetch the users');
                    }
                    }catch(error){
                        console.log(error,'users errrorrrrrrrr');
                }
            }
            fetchData()
        },[]);

    return (
        <div>
            <UsersContext.Provider value={users}>
                {children}
            </UsersContext.Provider>
        </div>
    )
    }

    export default UsersContext