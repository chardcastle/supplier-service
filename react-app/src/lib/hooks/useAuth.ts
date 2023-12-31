import { useState, useEffect } from 'react';
import { useSelector, selectIsAuthenticated } from '@/lib/redux'
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

    useEffect(() => {
        checkAuthentication();
    }, [hasAuthenticated]);

    const checkAuthentication = () => {
        // Get the token from wherever you store it (e.g., cookies, local storage)
        const token = localStorage.getItem('authToken'); // Assuming it's stored in local storage

        if (token) {
            console.log("Token found in local storage");
            verifyJwt(token)
                .then(() => {
                    setIsAuthenticated(true);
                })
                .catch(error => {
                    console.error("Unable to verify token", error);
                    setIsAuthenticated(false);
                })
        } else {
            console.log("No token present, require auth");
            // If no token is present, the user is not authenticated
            setIsAuthenticated(false);
        }
    };

    return { isAuthenticated, checkAuthentication };
};

export default useAuth;
