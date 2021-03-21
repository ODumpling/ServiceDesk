import React, {Fragment, useEffect, useState} from "react";
import {useParams} from "react-router-dom";
import DeskHeader from "../components/DeskHeader";
import TicketTableRecord from "../components/TicketTableRecord";
import {DeskDto, DesksClient, PaginatedListOfUserTicketDto, TicketsClient, UserTicketDto} from "../api/web-client";
import {API} from "../api/api-helper";
import {Pagination} from "../components/Pagination";

export default function DeskDetail() {

    const {slug} = useParams()
    // const query = new URLSearchParams(useLocation().search);

    const [desk, setDesk] = useState<DeskDto | undefined>({})
    const [tickets, setTickets] = useState<PaginatedListOfUserTicketDto>({items: []})
    const [page, setPage] = useState({number: 1, size: 10});

    useEffect(() => {
        getDeskDetail(slug);
        getTickets(slug, page.number, page.size)
    }, [slug, page.number, page.size]);

    function getDeskDetail(slug: string) {
        const client = new DesksClient(undefined, API.transformedResponseInstance());
        client.getDesk(slug).then((data) => setDesk(data.desk))
    }

    function getTickets(slug: string, page: number, size: number) {
        const client = new TicketsClient(undefined, API.transformedResponseInstance());
        client.listDeskTickets(slug, page, size).then((data) => setTickets(data))
    }

    function displayTickets(items: UserTicketDto[], slug: string) {
        if (items.length > 0) {
            return items.map((item) => (
                <TicketTableRecord key={item.id} ticket={item} slug={slug}/>
            ));
        }
        return (
            <tr>
                <td colSpan={5} className="px-6 py-3 text-center">No Tickets Available</td>
            </tr>
        );
    }

    function displayPagination(tickets: PaginatedListOfUserTicketDto) {
        if (tickets.items?.length! > 0) {
            return <Pagination currentPage={tickets.pageIndex!}
                               navigate={(pageNo: number) => setPage({...page, number: pageNo})}
                               hasNextPage={tickets.hasNextPage!}
                               hasPreviousPage={tickets.hasPreviousPage!}
                               pageCount={tickets.totalPages!}/>
        }
    }

    return (
        <Fragment>
            <DeskHeader desk={desk}/>
            <div className="flex flex-col mt-6">
                <div className="align-middle min-w-full overflow-x-auto shadow overflow-hidden sm:rounded-lg">
                    <table className="min-w-full divide-y divide-gray-200">
                        <thead>
                        <tr>
                            <th className="px-6 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                Ticket No#
                            </th>
                            <th className="px-6 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                Issue
                            </th>
                            <th className="hidden px-6 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider md:block">
                                Status
                            </th>
                            <th className="px-6 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                Date
                            </th>
                            <th className="px-6 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                Description
                            </th>
                        </tr>
                        </thead>
                        <tbody className="bg-white divide-y divide-gray-200">
                        {displayTickets(tickets?.items as UserTicketDto[], desk?.slug!)}
                        </tbody>
                    </table>
                </div>
            </div>
            {displayPagination(tickets)}

        </Fragment>
    );
}
