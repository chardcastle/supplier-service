import React, {ReactComponentElement, useEffect} from 'react'
import { redirect, RedirectType, usePathname } from 'next/navigation'
import Link from 'next/link';

/* Instruments */
import {
    useDispatch,
    authSlice,
} from '@/lib/redux'
import useAuth from "@/lib/hooks/useAuth";

interface NavItemProps {
    href: string,
    isActive: boolean,
    children: React.ReactNode[] | string
}

const NavItem = ({ href, isActive, children }: NavItemProps) => {
    const navItemClasses  = ['hover:text-blue-200', 'hover:text-black-500', 'focus:text-black-800'];

    return (
        <Link href={href} className={`${navItemClasses.join(' ')} ${isActive ? 'text-blue-700' : 'text-grey-800'}`}>
            {children}
        </Link>
    )
}


export const HeaderNavBar = () => {
    const pathname = usePathname();
    const dispatch = useDispatch();
    const { isAuthenticated } = useAuth();

    const handleLogout = async (event: React.MouseEvent<HTMLElement>) => {
        event.preventDefault();
        dispatch(authSlice.actions.logoutAsync());
    };

    useEffect(() => {
        if (!isAuthenticated) {
            redirect('/', 'replace' as RedirectType);
        }
    }, [isAuthenticated]);

    return (
        <nav className="bg-white border-gray-200 dark:bg-gray-900">
            <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
                <a href="https://flowbite.com/" className="flex items-center">
                    <img src="/supplier-service-logo.svg" className="h-8 mr-3" alt="Flowbite Logo" />
                    <span className="self-center text-2xl font-semibold whitespace-nowrap dark:text-white">Supplier Service</span>
                </a>
                <button data-collapse-toggle="navbar-default" type="button" className="inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600" aria-controls="navbar-default" aria-expanded="false">
                    <span className="sr-only">Open main menu</span>
                    <svg
                        stroke="currentColor"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        viewBox="0 0 16 16"
                        xmlns="http://www.w3.org/2000/svg"
                    >
                        <path d="M1 1h15M1 7h15M1 13h15" />
                    </svg>
                </button>
                <div className="hidden w-full md:block md:w-auto" id="navbar-default">
                    <ul className="font-medium flex flex-col p-4 md:p-0 mt-4 border border-gray-100 rounded-lg bg-gray-50 md:flex-row md:space-x-8 md:mt-0 md:border-0 md:bg-white dark:bg-gray-800 md:dark:bg-gray-900 dark:border-gray-700">
                        <li>
                            <NavItem href="/" isActive={false}>
                                Home
                            </NavItem>
                        </li>
                        <li>
                            <a href="#" className="block py-2 pl-3 pr-4 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent">Not used</a>
                        </li>
                        <li>
                            <NavItem href="/about" isActive={pathname === '/about'}>
                                About
                            </NavItem>
                        </li>
                        <li>
                            <NavItem href="/suppliers" isActive={pathname === '/contact'}>
                                Suppliers
                            </NavItem>
                        </li>
                        <li>
                            <a href="#" onClick={handleLogout} className="block py-2 pl-3 pr-4 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent">Logout</a>
                        </li>
                    </ul>
                </div>
            </div>
        </nav>
    );
}
