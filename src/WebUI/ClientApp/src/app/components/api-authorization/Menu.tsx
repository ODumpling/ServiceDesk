import React, {useEffect, useState} from "react";
import {Link} from "react-router-dom";
import { Transition } from '@headlessui/react'
import authService from "./AuthorizeService";
import {ApplicationPaths} from "./ApiAuthorizationConstants";

interface IUserState {
    username: any,
    isAuthenticated: boolean
}

export default function Menu() {
    const [isProfileMenuOpen,setIsProfileMenuOpen] = useState<boolean>(false)
    const [user , setUser] = useState<IUserState>({username:null, isAuthenticated:false})

    useEffect(() => {
        const subscription = authService.subscribe(() => populateState());
        populateState()

        return () => {
            authService.unsubscribe(subscription);
        }
    },[])

    async function populateState() {
        const [isAuthenticated, user] = await Promise.all([authService.isAuthenticated(), authService.getUser()])
        setUser({
            isAuthenticated,
            username: user && user.name
        });
    }

    const logoutPath = { pathname: `${ApplicationPaths.LogOut}`, state: { local: true } };

    return (
        <header className="bg-white shadow mb-8">
            <div className="max-w-7xl mx-auto px-2 sm:px-4 lg:divide-y lg:divide-gray-200 lg:px-8">
                <div className="relative h-16 flex justify-between">
                    <div className="relative z-10 px-2 flex lg:px-0">
                        <div className="flex-shrink-0 flex items-center">
                            <img className="block h-8 w-auto"
                                 src="https://tailwindui.com/img/logos/workflow-mark-indigo-600.svg"
                                 alt="Workflow"/>
                        </div>
                    </div>
                    <div
                        className="relative z-0 flex-1 px-2 flex items-center justify-center sm:absolute sm:inset-0">
                        <div className="w-full sm:max-w-xs">
                            <label htmlFor="search" className="sr-only">Search</label>
                            <div className="relative">
                                <div
                                    className="pointer-events-none absolute inset-y-0 left-0 pl-3 flex items-center">
                                    {/*{!--Heroicon name: solid/search --}*/}
                                    <svg className="h-5 w-5 text-gray-400" xmlns="http://www.w3.org/2000/svg"
                                         viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                                        <path fillRule="evenodd"
                                              d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z"
                                              clipRule="evenodd"/>
                                    </svg>
                                </div>
                                <input id="search" name="search"
                                       className="block w-full bg-white border border-gray-300 rounded-md py-2 pl-10 pr-3 text-sm placeholder-gray-500 focus:outline-none focus:text-gray-900 focus:placeholder-gray-400 focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                                       placeholder="Search" type="search"/>
                            </div>
                        </div>
                    </div>
                    <div className="relative z-10 flex items-center lg:hidden">
                        {/*// <!-- Mobile menu button -->*/}
                        <button type="button"
                                className="rounded-md p-2 inline-flex items-center justify-center text-gray-400 hover:bg-gray-100 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-500"
                                aria-controls="mobile-menu" aria-expanded="false">
                            <span className="sr-only">Open menu</span>
                            {/*// <!--*/}
                            {/*//   Icon when menu is closed.*/}
                            {/*//*/}
                            {/*//   Heroicon name: outline/menu*/}
                            {/*//*/}
                            {/*//   Menu open: "hidden", Menu closed: "block"*/}
                            {/*// -->*/}
                            <svg className="block h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none"
                                 viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
                                      d="M4 6h16M4 12h16M4 18h16"/>
                            </svg>
                            {/*// <!--*/}
                            {/*//   Icon when menu is open.*/}
                            {/*//*/}
                            {/*//   Heroicon name: outline/x*/}
                            {/*//*/}
                            {/*//   Menu open: "block", Menu closed: "hidden"*/}
                            {/*// -->*/}
                            <svg className="hidden h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none"
                                 viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
                                      d="M6 18L18 6M6 6l12 12"/>
                            </svg>
                        </button>
                    </div>
                    <div className="hidden lg:relative lg:z-10 lg:ml-4 lg:flex lg:items-center">
                        <button
                            className="flex-shrink-0 bg-white rounded-full p-1 text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
                            <span className="sr-only">View notifications</span>
                            {/*// <!-- Heroicon name: outline/bell -->*/}
                            <svg className="h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none"
                                 viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
                                      d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9"/>
                            </svg>
                        </button>

                        {/*// <!-- Profile dropdown -->*/}
                        <div className="flex-shrink-0 relative ml-4">
                            <div>
                                <button type="button"
                                        onClick={ () => setIsProfileMenuOpen(!isProfileMenuOpen)}
                                        className="bg-white rounded-full flex focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                                        id="user-menu" aria-expanded="false" aria-haspopup="true">
                                    <span className="sr-only">Open user menu</span>
                                    <img className="h-8 w-8 rounded-full"
                                         src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixqx=2irBzx0ccb&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
                                         alt=""/>
                                </button>
                            </div>

                            {/*<!--*/}
                            {/*  Dropdown menu, show/hide based on menu state.*/}
                            {/*  Entering: "transition ease-out duration-100"*/}
                            {/*    From: "transform opacity-0 scale-95"*/}
                            {/*    To: "transform opacity-100 scale-100"*/}
                            {/*  Leaving: "transition ease-in duration-75"*/}
                            {/*    From: "transform opacity-100 scale-100"*/}
                            {/*    To: "transform opacity-0 scale-95"*/}
                            {/*-->*/}
                            <Transition
                                show={isProfileMenuOpen}
                                enter="transition ease-out duration-100"
                                enterFrom="transform opacity-0 scale-95"
                                enterTo="transform opacity-100 scale-100"
                                leave="transition ease-in duration-75"
                                leaveFrom="transform opacity-100 scale-100"
                                leaveTo="transform opacity-0 scale-95">
                            <div
                                className="origin-top-right absolute right-0 mt-2 w-48 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 py-1 focus:outline-none"
                                role="menu" aria-orientation="vertical" aria-labelledby="user-menu">
                                <Link to="#" className="block py-2 px-4 text-sm text-gray-700 hover:bg-gray-100"
                                      role="menuitem">{user.username ?? "Unauthenticated User"}</Link>

                                <Link to="#" className="block py-2 px-4 text-sm text-gray-700 hover:bg-gray-100"
                                      role="menuitem">Settings</Link>

                                <Link to={logoutPath} className="block py-2 px-4 text-sm text-gray-700 hover:bg-gray-100"
                                      role="menuitem">Sign out</Link>
                            </div>
                            </Transition>
                        </div>
                    </div>
                </div>
                <nav className="hidden lg:py-2 lg:flex lg:space-x-8" aria-label="Global">
                    {/*// <!-- Current: "bg-gray-100 text-gray-900", Default: "text-gray-900 hover:bg-gray-50 hover:text-gray-900" -->*/}
                    <Link to="#"
                          className="bg-gray-100 text-gray-900 rounded-md py-2 px-3 inline-flex items-center text-sm font-medium">
                        Dashboard
                    </Link>

                    <Link to="#"
                          className="text-gray-900 hover:bg-gray-50 hover:text-gray-900 rounded-md py-2 px-3 inline-flex items-center text-sm font-medium">
                        Team
                    </Link>

                    <Link to="#"
                          className="text-gray-900 hover:bg-gray-50 hover:text-gray-900 rounded-md py-2 px-3 inline-flex items-center text-sm font-medium">
                        Projects
                    </Link>

                    <Link to="#"
                          className="text-gray-900 hover:bg-gray-50 hover:text-gray-900 rounded-md py-2 px-3 inline-flex items-center text-sm font-medium">
                        Calendar
                    </Link>
                </nav>
            </div>

            {/*// <!-- Mobile menu, show/hide based on menu state. -->*/}
            <nav className="lg:hidden" aria-label="Global" id="mobile-menu">
                <div className="pt-2 pb-3 px-2 space-y-1">
                    {/*// <!-- Current: "bg-gray-100 text-gray-900", Default: "text-gray-900 hover:bg-gray-50 hover:text-gray-900" -->*/}
                    <Link to="#"
                          className="bg-gray-100 text-gray-900 block rounded-md py-2 px-3 text-base font-medium">Dashboard</Link>

                    <Link to="#"
                          className="text-gray-900 hover:bg-gray-50 hover:text-gray-900 block rounded-md py-2 px-3 text-base font-medium">Team</Link>

                    <Link to="#"
                          className="text-gray-900 hover:bg-gray-50 hover:text-gray-900 block rounded-md py-2 px-3 text-base font-medium">Projects</Link>

                    <Link to="#"
                          className="text-gray-900 hover:bg-gray-50 hover:text-gray-900 block rounded-md py-2 px-3 text-base font-medium">Calendar</Link>
                </div>
                <div className="border-t border-gray-200 pt-4 pb-3">
                    <div className="px-4 flex items-center">
                        <div className="flex-shrink-0">
                            <img className="h-10 w-10 rounded-full"
                                 src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixqx=2irBzx0ccb&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
                                 alt=""/>
                        </div>
                        <div className="ml-3">
                            <div className="text-base font-medium text-gray-800">Tom Cook</div>
                            <div className="text-sm font-medium text-gray-500">tom@example.com</div>
                        </div>
                        <button
                            className="ml-auto flex-shrink-0 bg-white rounded-full p-1 text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
                            <span className="sr-only">View notifications</span>
                            {/*// <!-- Heroicon name: outline/bell -->*/}
                            <svg className="h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none"
                                 viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
                                      d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9"/>
                            </svg>
                        </button>
                    </div>
                    <div className="mt-3 px-2 space-y-1">
                        <Link to="#"
                              className="block rounded-md py-2 px-3 text-base font-medium text-gray-500 hover:bg-gray-50 hover:text-gray-900">Your
                            Profile</Link>

                        <Link to="#"
                              className="block rounded-md py-2 px-3 text-base font-medium text-gray-500 hover:bg-gray-50 hover:text-gray-900">Settings</Link>

                        <Link to={logoutPath}
                              className="block rounded-md py-2 px-3 text-base font-medium text-gray-500 hover:bg-gray-50 hover:text-gray-900">
                            Sign out
                        </Link>
                    </div>
                </div>
            </nav>
        </header>
    );
}
