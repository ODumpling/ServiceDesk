import {TicketDto} from "../api/web-client";
import React from "react";

export function TicketInformation(props: { ticket: TicketDto }) {
    return <section aria-labelledby="ticket-information-title">
        <div className="bg-white shadow sm:rounded-lg">
            <div className="px-4 py-5 sm:px-6">
                <h2 id="applicant-information-title" className="text-lg leading-6 font-medium text-gray-900">
                    Ticket #{props.ticket?.id} Information
                </h2>
                <p className="mt-1 max-w-2xl text-sm text-gray-500">
                    Ticket details.
                </p>
            </div>
            <div className="border-t border-gray-200 px-4 py-5 sm:px-6">
                <dl className="grid grid-cols-1 gap-x-4 gap-y-8 sm:grid-cols-2">
                    <div className="sm:col-span-1">
                        <dt className="text-sm font-medium text-gray-500">
                            Issue Type
                        </dt>
                        <dd className="mt-1 text-sm text-gray-900">
                            {props.ticket?.issue}
                        </dd>
                    </div>
                    <div className="sm:col-span-1">
                        <dt className="text-sm font-medium text-gray-500">
                            Ticket Created
                        </dt>
                        <dd className="mt-1 text-sm text-gray-900">
                            {/* TODO : Ticket Created DateTime */}
                        </dd>
                    </div>
                    <div className="sm:col-span-2">
                        <dt className="text-sm font-medium text-gray-500">
                            Description
                        </dt>
                        <dd className="mt-1 text-sm text-gray-900">
                            {props.ticket?.description}
                        </dd>
                    </div>
                </dl>
            </div>
        </div>
    </section>;
}
