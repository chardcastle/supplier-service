'use client'

/* Core */
import React, { ChangeEvent, FormEvent, useEffect, useState } from 'react'
import { redirect, RedirectType } from 'next/navigation'

/* Instruments */
import {
    authenticateAsync, selectAll,
    selectErrorMessage,
    selectIsAuthenticated,
    useDispatch,
    useSelector,
} from '@/lib/redux'

export const LoginForm = () => {
    const isAuthenticated = useSelector(selectIsAuthenticated);
    const errorMessage = useSelector(selectErrorMessage);
    const debug = useSelector(selectAll);
    const dispatch = useDispatch();
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');

    useEffect(() => {
        if (isAuthenticated) {
            redirect('/counter', 'replace' as RedirectType)
        }
    }, [isAuthenticated]);

    useEffect(() => {
        if (errorMessage) {
            setError(String(errorMessage));
        }
    }, [errorMessage]);

    const handleUsernameChange = (event: ChangeEvent<HTMLInputElement>) => {
        setUsername(event.target.value);
    };

    const handlePasswordChange = (event: ChangeEvent<HTMLInputElement>) => {
        setPassword(event.target.value);
    };

    const handleSubmit = (event: FormEvent) => {
        event.preventDefault();

        dispatch(authenticateAsync({ username, password }));

        setUsername('');
        setPassword('');
    };

    return (
        <div className="flex min-h-full flex-col justify-center items-center px-6 py-12 lg:px-8">
            <div className="sm:mx-auto sm:w-full sm:max-w-sm">
                <img className="sm:mx-auto" width="80px" height="80px" src="/supplier-service-logo.svg" alt="Supplier" />
                <h2 className="mt-10 text-center text-2xl leading-9 tracking-tight text-gray-900">Sign in to your account</h2>
            </div>

            <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
                {debug && false && (
                    <div className="p-4 mb-4 text-sm text-blue-800 rounded-lg bg-blue-50 dark:bg-gray-800 dark:text-blue-400" role="alert">
                        <span className="font-medium">Debug:</span> {JSON.stringify(debug)}
                    </div>
                )}

                {error && (
                    <div className="p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400" role="alert">
                        <span className="font-medium">Oops!</span> {error}
                    </div>
                )}
                <form className="space-y-6" onSubmit={handleSubmit} action="#" method="POST">
                    <div>
                        <label htmlFor="username" className="block text-sm font-medium leading-6 text-gray-900">Username</label>
                        <div className="mt-2">
                            <input id="username"
                                   name="username"
                                   value={username}
                                   onChange={handleUsernameChange}
                                   placeholder="Enter your username"
                                   type="username" required className="p-2 w-full border border-gray-300 rounded-md focus:outline-none focus:border-blue-500" />
                        </div>
                    </div>

                    <div>
                        <div className="flex items-center justify-between">
                            <label htmlFor="password" className="block text-sm font-medium leading-6 text-gray-900">Password</label>
                            {/*<div className="text-sm">*/}
                            {/*    <a href="#" className="font-semibold text-indigo-600 hover:text-indigo-500">Forgot password?</a>*/}
                            {/*</div>*/}
                        </div>
                        <div className="mt-2">
                            <input id="password"
                                   name="password"
                                   value={password}
                                   onChange={handlePasswordChange}
                                   placeholder="Enter your password"

                                   type="password" required className="p-2 w-full border border-gray-300 rounded-md focus:outline-none focus:border-blue-500" />
                        </div>
                    </div>

                    <div>
                        <button type="submit" className="flex w-full justify-center rounded-md bg-orange-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-orange-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-orange-600">Sign in</button>
                    </div>
                </form>
            </div>
        </div>
    );
}