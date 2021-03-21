import {UserTicketDto} from "../api/web-client";
import {Link} from "react-router-dom";
import React from "react";

export default function TicketTableRecord(props: { ticket: UserTicketDto | undefined, slug: string }) {
    const {ticket, slug} = props;
    return (
        <tr className="bg-white">
            <td className="w-1/6 px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                <div className="flex">
                    <Link to={slug + "/ticket/" + ticket?.id} className="group inline-flex space-x-2 truncate text-sm">
                        <svg className="flex-shrink-0 h-5 w-5 text-gray-400 group-hover:text-gray-500"
                             xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor"
                             aria-hidden="true">
                            <path fillRule="evenodd"
                                  d="M4 4a2 2 0 00-2 2v4a2 2 0 002 2V6h10a2 2 0 00-2-2H4zm2 6a2 2 0 012-2h8a2 2 0 012 2v4a2 2 0 01-2 2H8a2 2 0 01-2-2v-4zm6 4a2 2 0 100-4 2 2 0 000 4z"
                                  clipRule="evenodd"/>
                        </svg>
                        <p className="text-gray-500 truncate group-hover:text-gray-900">
                            {ticket?.id}
                        </p>
                    </Link>
                </div>
            </td>
            <td className="w-1/6 px-6 py-4 text-left whitespace-nowrap text-sm text-gray-500">
                <span className="text-gray-900 font-medium">{ticket?.issue} </span>

            </td>
            <td className="w-1/6 px-6 py-4 text-left whitespace-nowrap text-sm text-gray-500">
                <span
                    className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800 capitalize">
                          success
                </span>
            </td>
            <td className="w-1/6 px-6 py-4 text-left whitespace-nowrap text-sm text-gray-500">
                {ticket?.created}
            </td>

            <td className="hidden max-w-sm px-6 py-4 text-left whitespace-nowrap text-sm text-gray-500 md:block truncate">
                {ticket?.description}
            </td>
        </tr>);
}
