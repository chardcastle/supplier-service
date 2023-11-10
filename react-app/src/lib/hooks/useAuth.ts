import { useState, useEffect } from 'react';
import { useSelector, selectIsAuthenticated, selectAuthToken} from '@/lib/redux'
import verifyJwt from "@/lib/verifyJwt";

const useAuth = () => {
    const hasAuthenticated = useSelector(selectIsAuthenticated);

    const [isAuthenticated, setIsAuthenticated] = useState(hasAuthenticated);

    useEffect(() => {
        // Check if the user is authenticated on mount
        checkAuthentication();

        // Optionally, you can set up an interval to periodically check authentication
        // const intervalId = setInterval(() => {
        //   checkAuthentication();
        // }, 1000 * 60 * 5); // Check every 5 minutes, for example

        // Cleanup function to clear the interval on unmount
        // return () => clearInterval(intervalId);
    }, []); // eslint-disable-line react-hooks/exhaustive-deps

    const checkAuthentication = () => {
        // Get the token from wherever you store it (e.g., cookies, local storage)
        const token = localStorage.getItem('token'); // Assuming it's stored in local storage

        if (token) {
            verifyJwt(token)
                .then(() => {
                    setIsAuthenticated(true);
                })
                .catch(error => {
                    setIsAuthenticated(false);
                })
        } else {
            // If no token is present, the user is not authenticated
            setIsAuthenticated(false);
        }
    };

    return { isAuthenticated };
};

export default useAuth;
