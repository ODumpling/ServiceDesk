import {DeskDto} from "../api/web-client";
import {Link} from "react-router-dom";
import React from "react";

export default function DeskHeader(props: { desk: DeskDto | undefined }) {
    return (
        <section aria-labelledby="profile-overview-title">
            <div className="rounded-lg bg-white overflow-hidden shadow">
                <h2 className="sr-only" id="profile-overview-title">Desk Overview</h2>
                <div className="bg-white p-6">
                    <div className="sm:flex sm:items-center sm:justify-between">
                        <div className="sm:flex sm:space-x-5">
                            <div className="flex-shrink-0">
                                <img className="mx-auto h-20 w-20 rounded-full"
                                     src="https://images.unsplash.com/photo-1550525811-e5869dd03032?ixlib=rb-1.2.1&amp;ixid=eyJhcHBfaWQiOjEyMDd9&amp;auto=format&amp;fit=facearea&amp;facepad=2&amp;w=256&amp;h=256&amp;q=80"
                                     alt=""/>
                            </div>
                            <div className="mt-4 text-center sm:mt-0 sm:pt-1 sm:text-left">
                                <p className="text-sm font-medium text-gray-600">Welcome to,</p>
                                <p className="text-xl font-bold text-gray-900 sm:text-2xl">{props.desk?.name}</p>
                            </div>
                        </div>
                        <div className="mt-5 flex justify-center sm:mt-0">
                            <Link to={`/desk/${props.desk?.slug}/ticket` }
                                  className="flex justify-center items-center px-4 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50">
                                Create Ticket
                            </Link>
                        </div>
                    </div>
                </div>
                <div
                    className="border-t border-gray-200 bg-gray-50 grid grid-cols-1 divide-y divide-gray-200 sm:grid-cols-4 sm:divide-y-0 sm:divide-x">
                    <div className="px-6 py-5 text-sm font-medium text-center">
                        <span className="text-gray-900">12</span>
                        <span className="text-gray-600 font-bold"> :Open Tickets</span>
                    </div>

                    <div className="px-6 py-5 text-sm font-medium text-center">
                        <span className="text-gray-900">4</span>
                        <span className="text-gray-600 font-bold"> :Tickets in Await</span>
                    </div>

                    <div className="px-6 py-5 text-sm font-medium text-center">
                        <span className="text-gray-900">2</span>
                        <span className="text-gray-600 font-bold"> :Closed Tickets</span>
                    </div>
                </div>
            </div>
        </section>
    );
}
